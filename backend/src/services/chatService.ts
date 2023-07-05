import io,{Server} from 'socket.io';
import { jwtHelper} from '../services/jwtService';
import { serialize, parse } from "cookie";
import * as roomRepo from '../repository/roomsRepository';
import * as usersRepo from '../repository/usersRepository';
import * as chatRepo from '../repository/chatRepository';
import { ExtendedError } from 'socket.io/dist/namespace';
import { Chat } from '@prisma/client';
import { MessageToSend } from '../models/socketPayloadModels';
import { send } from 'process';
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
        const claim =jwtHelper.verifyToken(token["jwtToken"]).decorded;
        //入室可能かを取得
        if(claim===null){
            console.log("Claim Not Set");
           return;
        }
        //================================
        //入室時
        //================================
        socket.on('join room',async (payload,callback)=>{
            console.log("===========入室処理=============");
            try{
                const selectedRoomId = payload.roomId;
                //入室可能かを取得
                if(!await roomRepo.getCanEnter(selectedRoomId) ){
                    throw new Error("CANNOT_ENTRY");
                }
                console.log(`roomId:${selectedRoomId},userId:${claim.id}`)
                await usersRepo.updateRoom(claim.id,selectedRoomId,socket.id);
                socket.join(selectedRoomId);
                //入室時初回データを送信
                io.to(selectedRoomId).emit("join room",await usersRepo.selectInRoom(selectedRoomId));
                //処理完了を通知
                callback({
                    status: "ok"
                });
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
            try{
                //送信者データ取得
                const sender =await usersRepo.selectOneByID(claim.id);
                if(sender===null || sender.roomId===null)throw new Error("Sender Not Found");
                //データ保存
                const chatEmittiing :MessageToSend={
                    createdAt :new Date(),
                    message:message,
                    user:{
                        id:claim.id,
                        name:claim.name
                    }
                }
                await chatRepo.create(sender.roomId,chatEmittiing);
                
                console.log({
                    sender:sender,
                    message:message,
                    date:new Date()
                });
                io.to(sender.roomId).emit("message",chatEmittiing);
            }catch(e){
                console.log(e);
            }
        });
        //================================
        //退室時
        //================================
        socket.on('disconnect',async (_,next)=>{
            console.log("===========退室処理=============");
            await usersRepo.updateRoom(claim.id,null,null);
            socket.disconnect();
        });
    });
}

export default socketListen;