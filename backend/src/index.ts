import express, { Application, Request, Response }  from "express";
import cookieParser from "cookie-parser";
import {Server} from 'socket.io'
import router from './router/index'
import chat from './services/chatService'
import { initializeDB } from "./services/dbInitializer";
const io = new Server();
const app:Application = express();
const PORT = 3001;
initializeDB().then(()=>console.log('DB初期化完了'));
//リクエストされたjsonを読み取れるようにする
app.use(express.json());
//リクエストされたcookieを読み取れるようにする
app.use(cookieParser());
//
app.post('/test',(res:Response,req:Request)=>{
console.log(res);
})
app.get('/',(req:Request,res : Response)=>{
    res.send( "おはようございます。");
});
//APIルーティング
app.use(router)
//チャット
chat;
app.listen(PORT,()=>{
    console.log(`ポート：${PORT}でサーバー起動！`)
})