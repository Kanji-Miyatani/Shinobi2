import { useEffect, useState } from 'react';
import {io} from 'socket.io-client';
import {useCookies} from 'react-cookie';
import * as roomApi from '../api/rooms';
import {Chat,Room,User} from '../interfaces/models'
import { getURL } from '../api/URL';
import { RoomFetchApiResponce } from '../interfaces/apiReqRes';

const URL =getURL( process.env.NODE_ENV === 'production' ? "/" : '/');
let socket =io(URL, {
      withCredentials:true,
      transports: [ 'websocket' ] 
  })
export const useRoomChat = (roomId:string)=>{
    const [isJoining,setIsJoining] = useState(false);
    const [messages,setMessages] =useState<Chat[]>(new Array<Chat>());
    const [roomInfo,setRoomInfo] = useState<Room>({} as Room);
    //クッキーからjwtトークンの取得
    const getUser = (id : number):User=>{
        const user = roomInfo?.users.find(x=>x.id===id);
        if(!user)
        {
            return {id:-1,name:"unknown",level:"",characterId:""};
        }
        return user;
    }
    //入室処理
    const joinRoom =(roomId:string):Promise<RoomFetchApiResponce>=>{
        return new Promise<RoomFetchApiResponce>((resolve,reject)=>{
            //部屋情報取得APIを叩いた後にsocketで入室情報をブロードキャスト
            socket.emit('join room',{roomId:roomId},()=>{
                roomApi.getOne(roomId).then((data)=>{
                    return resolve(data);
                }).catch((e)=>{
                    return reject(e);
                });
            });
        })
    };
    //チャット送信処理
    const sendMessage =(msg:string)=>{
        socket.emit('message',msg);
    }
    useEffect(()=>{
        socket=io(URL, {
            withCredentials:true,
            transports: [ 'websocket' ] //websocket非対応時のポーリングはしない
        })
        //入室処理
        joinRoom(roomId).then((data)=>{
            console.log("chats:");
            console.log(data.chats);
            setMessages(data.chats);
            setRoomInfo(data.room);
            //他ユーザの入室時K処理
            socket.on("join room",(users:User[])=>{
                setRoomInfo((roomInfo)=>{return{
                    ...roomInfo,
                    users:users
                }});
            });
            //メッセージ受信処理
            socket.on("message",(message:Chat)=>{
                message.createdAt=new Date(message.createdAt);
                setMessages((messages)=>[...messages,message]);
            });
            //入室完了
            setTimeout(()=>{
                setIsJoining(true);
            },200);
        }).catch(()=>{
            console.log('CANNNOT ENTRY ROOM')
            //入室時例外処理はどうすればいいかわからないので未定。
        });
        return () => {
            console.log("disconnected!")
            socket.disconnect();
        }
    },[]);

    return {
        isJoining:isJoining,
        messages:messages,
        roomInfo:roomInfo,
        sendMessage:sendMessage,
        getUser:getUser
    }
}