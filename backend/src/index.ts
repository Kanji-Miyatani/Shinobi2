import express, { Application, Request, Response }  from "express";
import cookieParser from "cookie-parser";
import http from 'http';
import https from 'https';
import {Server} from 'socket.io'
import router from './router/index'
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import socketListen from './services/chatService'
import { initializeDB } from "./services/dbInitializer";
const app:Application = express();
const PORT = process.env.PORT ?? 3001;
//自己SSL証明書を設定
const server =process.env.ENV ==="dev"?  https.createServer({
  key: fs.readFileSync('./cert/privatekey.pem'),
  cert: fs.readFileSync('./cert/cert.pem'),
},app):
http.createServer(app);
initializeDB().then(()=>console.log('DB初期化完了'));
//リクエストされたjsonを読み取れるようにする
app.use(express.json());
//cors設定(websocketに対してproxが設定出来ないため)
app.use(cors({
  origin:"http://localhost:3000",
  credentials:true,
  optionsSuccessStatus:200,
}))
//リクエストされたcookieを読み取れるようにする
app.use(cookieParser());
//APIルーティング
app.use(express.static(path.join(__dirname, './www/')));
console.log(__dirname);
app.use(router)

//チャット
const io = new Server(server,{
    cookie: true
  });
socketListen(io);

server.listen(PORT,()=>{
    console.log(`ポート：${PORT}でサーバー起動！`)
})