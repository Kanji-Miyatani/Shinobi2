import {Router,Response,Request} from 'express'
import {jwtHelper} from '../services/jwtService'

const router = Router();
//認証
router.get('/',(req:Request,res:Response)=>{
    const token=req.cookies.jwtToken;
    const resultObj =jwtHelper.verifyToken(token);
    console.log(token);
    if(resultObj.result){
        res.json({
            result:true
        });
    }
    else{
        res.json({
            result:false
        });
    }
})

export default router;