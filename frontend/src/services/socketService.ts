import { useEffect, useState } from 'react';
import {io} from 'socket.io-client';
import {useCookies} from 'react-cookie'

const URL = process.env.NODE_ENV === 'production' ? undefined : '/';

export const useSocket = ()=>{
    const [joining,setJoining] = useState(false);
    const [messages,setMessages] =useState();
    //クッキーからjwtトークンの取得
    const [cookies, setCookie, removeCookie]  =useCookies();
    const token = cookies["jwt"];
    const socket = io(URL ?? "", {
        query: {
          auth: token
        }
      });
    //入室処理
    const joinRoom =(roomId:string)=>{
        socket.emit('join room',{roomId:roomId},()=>{
            setJoining(true);
        });
    };

    useEffect(()=>{
        const onConnection = ()=>{
            
        }
    },[]);

    return {
        joiningRoom:joining,
        joinRoom:joinRoom,

    }
}