import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import {  useRoomChat} from '../hooks/roomChatService';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
type Parameter={
  roomId:string
}
function Chat() {
  const {roomId} = useParams<Parameter>() as Parameter;
  const [inputed,setInputed] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const {isJoining,messages,roomInfo,sendMessage,getUser} = useRoomChat(roomId);
  const handleOnSendButtonClick=()=>{
    if(inputed==="" || !inputRef.current)return;
    setInputed("");
    console.log(inputRef.current.value);
    inputRef.current.value="";
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
                    </React.Fragment>//UIの参考(MUI使って作ってるけど、好きなCSS入れていいよ)＝＞https://mui.com/material-ui/react-list/　みマウス
                  }
                />
              </ListItem>
          );
        })}
      </List>
      {/* <TextField onChange={(event) => setInputed(event.target.value)} id="outlined-basic" label="メッセージ" variant="outlined" /> */}
      <Box sx={{ display: 'inline', alignItems: 'flex-center' }}>
        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField ref={inputRef} onChange={(event) => setInputed(event.target.value)} id="outlined-basic" label="メッセージ" variant="standard" />
      </Box>
      <Button variant="contained" onClick={handleOnSendButtonClick} endIcon={<SendIcon />}>送信</Button>
    </>
  )
}

export default Chat