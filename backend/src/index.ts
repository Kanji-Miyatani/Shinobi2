import express, { Application, Request, Response }  from "express";

const app:Application = express();
const PORT = 3001;


app.get('/',(req:Request,res : Response)=>{
    res.send( "おはようございます。");
});

app.listen(PORT,()=>{
    console.log(`ポート：${PORT}でサーバー起動！`)
})