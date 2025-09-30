import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { SECRET_KEY } from "../secrets";
import { prismaClient } from "..";
import { User } from "@prisma/client";

interface JWTPayload {
    userId: string;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
       return res.status(401).send('User Not Authorized')
    }
        try {
            const payload = jwt.verify(accessToken!.toString(), SECRET_KEY) as JWTPayload
            const foundUser = await prismaClient.user.findFirst({ where: { id: payload.userId } })
            if (!foundUser) {
                res.status(401).send('User Not Authorized')
                return;
            }
            //Passing the user object
            const user :User = foundUser;
            req.user = user
            return next();
        }
        catch (error) {
            return res.status(403).send(error);
        }
}