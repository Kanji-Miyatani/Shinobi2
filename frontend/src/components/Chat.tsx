import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import {  useSocket} from '../services/socketService';
type Parameter={
  roomId:string
}
function Chat() {
  const {roomId} = useParams<Parameter>() as Parameter;
  const {joinRoom} = useSocket();
  useEffect(()=>{
    joinRoom(roomId);
  },[]);
  return (
    <div>Chat</div>
  )
}

export default Chat