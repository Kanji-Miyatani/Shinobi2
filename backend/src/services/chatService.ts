import io,{Server} from 'socket.io'
import {MyJwtPayload, jwtHelper} from '../services/jwtService'
import * as roomRepo from '../repository/roomsRepository';
import * as usersRepo from '../repository/usersRepository';
const socketListen = (io:Server)=>{
    
    //認証ミドルウェア(常にjwtを監視する)
    io.use((socket,next)=>{
        const token = socket.handshake.auth.token;
        const resultObj =jwtHelper.verifyToken(token);
        if(!resultObj.result){
            next(new Error('AUTH_FAILED'));
        }
        next();
    })
    //接続イベント
    io.on('connection',async(socket)=>{
        console.log("connected!")
        //入室処理
        const token = socket.handshake.auth.token;
        //IDをjwtトークンから取得
        const userClaim =jwtHelper.verifyToken(token).decorded as MyJwtPayload;
        //================================
        //入室時
        //================================
        socket.on('join room',async ()=>{
            const selectedRoomId = "0";
            //入室可能かを取得
            if(!await roomRepo.getCanEnter(selectedRoomId)){
                throw new Error("CANNOT_ENTRY");
            }
            await usersRepo.updateRoom(userClaim.id,selectedRoomId);
            socket.join(selectedRoomId);
            //入室時初回データを送信
            io.to(selectedRoomId).emit("users",await roomRepo.selectOne(selectedRoomId));
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
        socket.on('disconnect',async ()=>{
            //socketのroomsから現在入室している部屋を取得
            const roomId = Object.keys(socket.rooms).filter(item => item!=socket.id);
            await usersRepo.updateRoom(userClaim.id,null);
            io.to(roomId).emit("users",await roomRepo.selectOne(roomId[0]));
            socket.disconnect();
        });
    })
}

export default socketListen;