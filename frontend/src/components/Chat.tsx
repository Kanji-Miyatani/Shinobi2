import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {  useRoomChat} from '../services/roomChatService';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
type Parameter={
  roomId:string
}
function Chat() {
  const {roomId} = useParams<Parameter>() as Parameter;
  const [inputed,setInputed] = useState("");
  const {isJoining,messages,roomInfo,sendMessage,getUser} = useRoomChat(roomId);
  const handleOnSendButtonClick=()=>{
    if(inputed==="")return;
    setInputed("");
    sendMessage(inputed);
  };
  return (
    <>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {messages.map((msg,index)=>{

          return (
              <ListItem alignItems="flex-start" key={index}>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary= {getUser(msg.userId).name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                       
                      </Typography>
                      {msg.message}
                    </React.Fragment>
                  }
                />
              </ListItem>
          );
        })}
      </List>
      <TextField onChange={(event) => setInputed(event.target.value)} id="outlined-basic" label="メッセージ" variant="outlined" />
      <Button variant="contained" onClick={handleOnSendButtonClick}>送信</Button>
    </>
  )
}

export default Chat