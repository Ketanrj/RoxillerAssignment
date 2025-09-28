import { NextFunction, Request, Response } from "express";


export const storeownerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if(user?.role == 'STORE_OWNER'){
        next();
    }else{
        return res.status(403).send("User is not Allowed to acces this resource")
    }
}