import { NextFunction, Request, Response } from "express";


export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if(user?.role == 'ADMIN'){
        next();
    }else{
        return res.status(403).send("User is not Allowed to acces this resource")
    }
}