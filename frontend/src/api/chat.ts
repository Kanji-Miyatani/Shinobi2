import { io } from "socket.io-client";
export type Chat = {
    id: number
    message: string
    createdAt: Date
    userId: number
    roomId: string
  }
export const entryRoom = (roomId:String)=>{
    const socket = io('/');
    socket.emit('join room',()=>{
        
    })
} 