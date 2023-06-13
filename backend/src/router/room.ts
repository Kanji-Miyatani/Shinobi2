import {Router,Response,Request} from 'express'
import {jwtHelper,MyJwtPayload} from '../services/jwtService'
import * as roomRepo from '../repository/roomsRepository';
import * as usersRepo from '../repository/usersRepository';
import asyncWrapper from '../services/asyncWrapper';
import { Room } from '@prisma/client';
const router = Router();
//=======================================
//全部屋取得
//=======================================
router.get('/all',asyncWrapper(async (req:Request,res:Response)=>{
  //認証
  const token=req.cookies.jwtToken;
  const resultObj =jwtHelper.verifyToken(token);
  if(!resultObj.result){
    throw new Error("AUTH_FAILED");
  }
  //チャット部屋取得
  res.json(await roomRepo.selectAll());
}));
//=======================================
//入室
//=======================================
router.post('/entry',asyncWrapper(async (req:Request,res:Response)=>{
  //認証
  const token=req.cookies.jwtToken;
  const resultObj =jwtHelper.verifyToken(token);
  if(!resultObj.result){
    throw new Error("AUTH_FAILED");
  }
  const selectedRoomId = req.body.roomId;
  //入室可能かを取得
  if(!await roomRepo.getCanEnter(selectedRoomId)){
    throw new Error("CANNOT_ENTRY");
  }
  //入室処理
  const userClaim = resultObj.decorded as MyJwtPayload;
  await usersRepo.updateRoom(userClaim.id,selectedRoomId);
  //入室時初回データを送信
  res.json(roomRepo.selectOne(selectedRoomId));
}))
export default router;