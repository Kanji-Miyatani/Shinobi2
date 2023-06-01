import express, { Application, Request, Response }  from "express";

const app:Application = express();
const PORT = 3000;

app.use(express.json);

app.get('/',(req:Request,res : Response)=>{
    "おはよう、皆さん"
});

app.listen(PORT,()=>{
    console.log("サーバー起動！")
})