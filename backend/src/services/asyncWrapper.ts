import express, { Router,Application, Request, Response ,NextFunction}  from "express";
 
 const asyncWrapper = (fn : (req: Request, res: Response,next:NextFunction) =>Promise<void>) => {
    return (req:Request, res:Response, next:NextFunction) => {
      return fn(req, res, next).catch(next);
    }
  };

  export default asyncWrapper;