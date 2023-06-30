import {Router,Response,Request, NextFunction} from 'express'
import {jwtHelper} from '../services/jwtService'
import * as roomRepo from '../repository/roomsRepository';
import asyncWrapper from '../services/asyncWrapper';
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
//入室部屋情報取得
//=======================================
router.get('/fetch',asyncWrapper(async (req:Request,res:Response,next:NextFunction)=>{
  if(!req.query.id )throw new Error('Parameter is not set');
  const token=req.cookies.jwtToken;
  const resultObj =jwtHelper.verifyToken(token);
  console.log(req.query.id);
  const selectedRoomId = req.query.id.toString();
  //入室可能かを取得
  if(!await roomRepo.getCanEnter(selectedRoomId) || resultObj.decorded===null){
      throw new Error("CANNOT_ENTRY");
  }
  if(!resultObj.result){
    throw new Error("AUTH_FAILED");
  }
  //チャット部屋取得
  res.json(await roomRepo.selectOne(req.query.id.toString()));
}));
export default router;