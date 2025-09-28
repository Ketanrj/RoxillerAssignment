import { NextFunction, Request, Response } from "express";


export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if(user?.role == 'NORMAL_USER'){
        next();
    }else{
        return res.status(403).send("User is not Allowed to acces this resource")
    }
}