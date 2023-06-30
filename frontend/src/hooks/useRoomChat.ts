import { useEffect, useState } from 'react';
import {io} from 'socket.io-client';
import {useCookies} from 'react-cookie';
import * as roomApi from '../api/rooms';
import { Chat } from '../api/chat';
import { Socket } from 'dgram';
import { getURL } from '../api/URL';

const URL =getURL( process.env.NODE_ENV === 'production' ? "/" : '/');
let socket =io(URL, {
      withCredentials:true,
      transports: [ 'websocket' ] 
  })
export const useRoomChat = (roomId:string)=>{
    const [isJoining,setIsJoining] = useState(false);
    const [messages,setMessages] =useState<Chat[]>(new Array<Chat>());
    const [roomInfo,setRoomInfo] = useState<roomApi.Room>();
    //クッキーからjwtトークンの取得
    const [cookies, setCookie, removeCookie]  =useCookies(["jwtToken"]);
    const token = cookies["jwtToken"];
    const getUser = (id : number):roomApi.User=>{
        const user = roomInfo?.users.find(x=>x.id===id);
        if(!user)
        {
            return {id:-1,name:"unknown",level:"",characterId:""};
        }
        return user;
    }
    //入室処理
    const joinRoom =(roomId:string):Promise<roomApi.Room>=>{
        return new Promise<roomApi.Room>((resolve,reject)=>{
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
            transports: [ 'websocket' ] 
        })
        //入室処理
        joinRoom(roomId).then((data)=>{
            setMessages(data.chats);
            setRoomInfo(roomInfo=>data);
            console.log('入室メンバー');
            console.log(data.users);
            //他ユーザの入室時K処理
            socket.on("join room",(users:roomApi.User[])=>{
                
            });
            //メッセージ受信処理
            socket.on("message",(message:Chat)=>{
                console.log(messages);
                console.log(message);
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