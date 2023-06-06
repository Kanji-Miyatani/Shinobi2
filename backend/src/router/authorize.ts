import {Router,Response,Request} from 'express'
import {jwtHelper} from '../services/jwtService'

const router = Router();
//認証
router.get('/auth',(req:Request,res:Response)=>{
    const token=req.cookies.jwtToken;
    const resultObj =jwtHelper.verifyToken(token);
    if(resultObj.result){
        res.json({
            
        });
    }
    else{
        res.json({
            
        });
    }
})

export default router;