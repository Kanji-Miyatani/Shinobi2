import express, { Router,Application, Request, Response ,NextFunction}  from "express";
import authRouter from './authorize'
import loginRouter from './login'
import roomRouter from './room'
import signUpRouter from './signUp'

import path from 'path';
const router = express.Router();
router.get('/',(req:Request,res:Response)=>{
    console.log('requested html!');
    res.sendFile(path.join(__dirname, './www/index.html'));
});
router.use('/api/auth',authRouter);
router.use('/api/login',loginRouter);
router.use('/api/rooms',roomRouter);
router.use('/api/signUp',signUpRouter);

export default router;