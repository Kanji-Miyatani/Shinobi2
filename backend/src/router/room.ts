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
export default router;