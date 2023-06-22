import io,{Server} from 'socket.io';
import { jwtHelper} from '../services/jwtService';
import { serialize, parse } from "cookie";
import * as roomRepo from '../repository/roomsRepository';
import * as usersRepo from '../repository/usersRepository';
import { ExtendedError } from 'socket.io/dist/namespace';
const socketListen = (io:Server)=>{
    //認証ミドルウェア(常にjwtを監視する)
    io.use((socket,next)=>{
        if (!socket.handshake.headers.cookie){
            next(new Error('AUTH_FAILED'));
            return
        } 
        const token = parse(socket.handshake.headers.cookie);
        console.log(token);
        const resultObj =jwtHelper.verifyToken(token["jwtToken"]);
        if(!resultObj.result){
            next(new Error('AUTH_FAILED'));
        }
        next();
    })
    //接続イベント
    io.on('connection',async(socket)=>{
        //================================
        //入室時
        //================================
        socket.on('join room',async (payload)=>{
            console.log("===========入室処理=============");
            try{

                console.log(payload);
                const selectedRoomId = payload.selectedRoomId;
                //入室可能かを取得
                if(!await roomRepo.getCanEnter(selectedRoomId)){
                    throw new Error("CANNOT_ENTRY");
                }
                await usersRepo.updateRoom(payload.id,selectedRoomId,socket.id);
                socket.join(selectedRoomId);
                //入室時初回データを送信
                io.to(selectedRoomId).emit("users",await roomRepo.selectOne(selectedRoomId));
            }catch(e){
               console.log(e);
            }
        });
        //================================
        //チャット送信時
        //================================
        socket.on('message',async (payload)=>{
            //socketのroomsから現在入室している部屋を取得
            const roomId = Object.keys(socket.rooms).filter(item => item!=socket.id);
            socket.to(roomId).emit(payload.message);
        });
        //================================
        //退室時
        //================================
        socket.on('disconnect',async (_,next)=>{
            console.log("===========退室処理=============");
            try{
                const userId =await usersRepo.selectIdFromSocketId(socket.id);
                //socketのroomsから現在入室している部屋を取得
                const roomId = Object.keys(socket.rooms).filter(item => item!=socket.id);
                await usersRepo.updateRoom(userId,null,"");
                io.to(roomId).emit("users",await roomRepo.selectOne(roomId[0]));
                socket.disconnect();
            }catch(e){
                console.log(e);
            }
        });
    });
}

export default socketListen;