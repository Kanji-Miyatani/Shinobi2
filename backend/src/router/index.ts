import express, { Router,Application, Request, Response ,NextFunction}  from "express";
import authRouter from './authorize'
import loginRouter from './login'
import roomRouter from './room'
import signUpRouter from './signUp'


const router = express.Router();

router.use('/api/auth',authRouter);
router.use('/api/login',loginRouter);
router.use('/api/room',roomRouter);
router.use('/api/signUp',signUpRouter);

export default router;