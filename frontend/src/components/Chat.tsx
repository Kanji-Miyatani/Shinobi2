import React, {  useContext, useRef, useState } from 'react'
import { useParams } from 'react-router'
import {  useRoomChat} from '../hooks/useRoomChat';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { CustomBgImage } from '../App';
import { Link } from 'react-router-dom';
type Parameter={
  roomId:string
}
function Chat() {
  const {roomId} = useParams<Parameter>() as Parameter;
  const [inputed,setInputed] = useState("");
  const {bgImage,setBgImage} = useContext(CustomBgImage);
  const inputRef = useRef<HTMLInputElement>(null);
  const {isJoining,messages,roomInfo,sendMessage,getUser} = useRoomChat(roomId);
  //送信ボタン
  const handleOnSendButtonClick=()=>{
    if(inputed==="" || !inputRef.current)return;
    setInputed("");
    console.log(inputRef.current.value);
    inputRef.current.value="";
    sendMessage(inputed);
  };
  //背景ファイル変更時
  const handleOnChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = function() {
        const result =reader.result?.toString();
        console.log(result);
        if(result)setBgImage(result);
      };
    }
  }
  const style={
    backgroundImage:`url(${bgImage})`,
    backgroundSize:'cover',
    height:'100vh'
  } 
  
  return !isJoining?(
    <>
      <p>入室中...</p>
    </>
  ):(
    <>
     <div style={style}>

        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'transparent'}}>
          {messages.slice(-6).map((msg,index)=>{
            return (
                <ListItem alignItems="flex-start" key={index} sx={{backgroundColor:'transparent'}}>
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary= {getUser(msg.userId).name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline',backgroundColor:'transparent' }}
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
          <TextField ref={inputRef} value={inputed} onChange={(event) => setInputed(event.target.value)} id="outlined-basic" label="メッセージ" variant="standard" />
        </Box>
        <Button variant="contained" onClick={handleOnSendButtonClick} endIcon={<SendIcon />}>送信</Button>
        <input type="file" onChange={handleOnChangeFile} />
       <Link to="/rooms">部屋選択に戻る</Link>
     </div>
    </>
  )
}

export default Chat