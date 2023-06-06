import {Router,Request,Response,NextFunction}from 'express'
import * as usersRepo from '../repository/usersRepository'
import {jwtHelper} from '../services/jwtService'
import * as bcrypt from 'bcrypt';
import asyncWrapper from '../services/asyncWrapper';

const router = Router();
//===============================
//ユーザー新規登録
//===============================
router.post('/',asyncWrapper( async (req:Request,res:Response)=>{
    const body = req.body ;
    const passHashed =await bcrypt.hash(body.password as string,10);
    //ユーザー追加
    await usersRepo.create(
         body.name,body.mailaddress ,passHashed
    );
    res.json({
        result:true
    });
}))

export default router;