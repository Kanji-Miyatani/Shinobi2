import express, { Application, Request, Response }  from "express";
import cookieParser from "cookie-parser";
import router from './router/index'
const app:Application = express();
const PORT = 3001;
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

app.listen(PORT,()=>{
    console.log(`ポート：${PORT}でサーバー起動！`)
})