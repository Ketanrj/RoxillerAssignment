import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { SECRET_KEY } from "../secrets";
import { prismaClient } from "..";


export const refresh = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        console.log("Reading Refresh Token:", refreshToken)

        if (!refreshToken) {
            return res.status(403).json({ message: 'No refresh Token Found' })
        }

        const user = await prismaClient.user.findFirst({ where: { refreshToken: refreshToken } })

        if (!user?.refreshToken){
            return res.status(401).json({message: 'User does not exist'});
        }

        const accessToken = jwt.sign({userId: user.id}, SECRET_KEY, {expiresIn: '2m'})

        res.json({name: user.name, email: user.email, role: user.role, token: accessToken})
    
    } catch (err : any) {
        throw new Error('Internal Server error', err)
    }

}