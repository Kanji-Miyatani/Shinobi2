import {Router,Request,Response}from 'express'
import * as usersRepo from '../repository/usersRepository'
import {jwtHelper} from '../services/jwtService'
import * as bcrypt from 'bcrypt';
import * as dateService from '../services/dateService'
import asyncWrapper from '../services/asyncWrapper';
interface Responce{
    result:boolean,
    message:string
}
const router = Router();
//=======================================
//ログイン処理
//=======================================
router.post("/",asyncWrapper(async (req:Request,res:Response)=>{
    //ユーザー取得
   const user =await usersRepo.selectOne(req.body.email);
   if(user===null){
     res.json({
        message:'ユーザーが見つかりません。'
     });
     return;
   }

   const inputedPass = req.body.password;
   //
   const match = await bcrypt.compare(inputedPass,user.password);
   if(match){
        const jwtToken = jwtHelper.createToken({
            id:user.id,
            name:user.name
        });
        res.cookie("jwtToken", jwtToken, {
            //webサーバーのみがアクセス可能
            httpOnly: true,
            //cookieの有効期限は2日間に設定
            expires: dateService.getDaysLater(7),
        }).json({
            id : user.id 
        })
   }
   else{
        res.json({
            message:"パスワードが違います。"
        })
   }
}))

export default router;