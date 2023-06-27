import io,{Server} from 'socket.io';
import { jwtHelper} from '../services/jwtService';
import { serialize, parse } from "cookie";
import * as roomRepo from '../repository/roomsRepository';
import * as usersRepo from '../repository/usersRepository';
import { ExtendedError } from 'socket.io/dist/namespace';
import { Chat } from '@prisma/client';
import { MessageToSend } from '../models/socketPayloadModels';
const socketListen = (io:Server)=>{
    //認証ミドルウェア(常にjwtを監視する)
    io.use((socket,next)=>{
        if (!socket.handshake.headers.cookie){
            next(new Error('AUTH_FAILED'));
            return
        } 
        const token = parse(socket.handshake.headers.cookie);
        const resultObj =jwtHelper.verifyToken(token["jwtToken"]);
        if(!resultObj.result){
            next(new Error('AUTH_FAILED'));
        }
        next();
    })
    //接続イベント
    io.on('connection',async(socket)=>{
        console.log("===========Connected！=============");
        if (!socket.handshake.headers.cookie){
            return;
        } 
        const token = parse(socket.handshake.headers.cookie);
        const resultObj =jwtHelper.verifyToken(token["jwtToken"]);
        if(resultObj.decorded===null)return;
        //================================
        //入室時
        //================================
        socket.on('join room',async (payload)=>{
          
            console.log("===========入室処理=============");
            try{
                const selectedRoomId = payload.roomId;
                //入室可能かを取得
                if(!await roomRepo.getCanEnter(selectedRoomId) || resultObj.decorded===null){
                    throw new Error("CANNOT_ENTRY");
                }
                console.log(`roomId:${selectedRoomId},userId:${resultObj.decorded.id}`)
                await usersRepo.updateRoom(resultObj.decorded.id,selectedRoomId,socket.id);
                socket.join(selectedRoomId);
                //入室時初回データを送信
                io.to(selectedRoomId).emit("join room",await usersRepo.selectInRoom(selectedRoomId));
            }catch(e){
               console.log(e);
            }
        });
        //================================
        //チャット送信時
        //================================
        socket.on('message',async (message)=>{
            //socketのroomsから現在入室している部屋を取得
            console.log("===========送信時処理=============");
            console.log(message);
            //データ保存
            const chatEmittiing :MessageToSend={
                createdAt :new Date(),
                message:message,
                userId:resultObj.decorded?.id ?? 0
            }
            io.emit("message",chatEmittiing);
        });
        //================================
        //退室時
        //================================
        socket.on('discoonnect',async (_,next)=>{
            console.log("===========退室処理=============");
            socket.disconnect();
        });
    });
}

export default socketListen;