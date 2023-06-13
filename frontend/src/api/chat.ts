import { io } from "socket.io-client";

export const entryRoom = (roomId:String)=>{
    const socket = io('/');
    socket.emit('join room',()=>{
        
    })
} 