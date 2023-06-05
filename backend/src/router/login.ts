import {Router,Request,Response}from 'express'
import * as usersRepo from '../repository/usersRepository'
import {jwtHelper} from '../services/jwtService'
import * as bcrypt from 'bcrypt';
import * as dateService from '../services/dateService'

const router = Router();

router.post("/",async (req:Request,res:Response)=>{
   const user =await usersRepo.selectOne(req.body.email);
   if(user===null){
     throw new Error("NO_USER");
   }
   const inputedPass = req.body.password;
   const match = await bcrypt.compare(inputedPass,user.password);
   if(match){
    const jwtToken = jwtHelper.createToken();
        res.cookie("jwtToken", jwtToken, {
            //webサーバーのみがアクセス可能
            httpOnly: true,
            //cookieの有効期限は2日間に設定
            expires: dateService.getDaysLater(7),
        }).json({
            
        })
   }
})