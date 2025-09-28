import { Request, Response } from "express";
import { hashSync, compareSync } from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { SECRET_KEY, SALT_VALUE } from "../secrets";
import { prismaClient } from "..";
import { generateResetToken } from "../utils/generateToken";
import { sendEmail } from "../utils/sendEmail";
import { Passwordreset } from "@prisma/client";


export const signup = async (req: Request, res: Response) => {
    const { name, email, address, password } = req.body;

    let user = await prismaClient.user.findFirst(({ where: { email: email } }))
    if (user) {
        throw new Error("User Already Exist");
    }

    user = await prismaClient.user.create({
        data: {
            name,
            email,
            address,
            password: hashSync(password, Number(SALT_VALUE))
        },
    })

    res.json({ user });
}


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    let foundUser = await prismaClient.user.findFirst({ where: { email: email } })
    if (!foundUser) {
        throw new Error("User Does not Exist! Please SignUp")
    }

    let pass = compareSync(password, foundUser.password);
    if (!pass) {
        return res.status(401).send("Password is incorrect");
    }

    const accessToken = jwt.sign({
        userId: foundUser.id
    }, SECRET_KEY)


    res.json({accessToken})
}


export const forgetpassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email cannot be Empty" });
        }
        const user = await prismaClient.user.findFirst({ where: { email: email } })
        if (!user) {
            return res.status(404).json({ message: "User with the email deos not exist" })
        }
        const { token, expiresAt } = generateResetToken();
        console.log(user.id);

        await prismaClient.passwordreset.create({
            data: {
                userId: user.id,
                token: token,
                expiresAt: expiresAt
            }
        })

        //Send Token using MAIL TRAP
        const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/resetPassword/${token}`;
        const message = `<a>We have received a password 
        reset request. Please use the below link to reset your password\n\n${resetUrl}<a/>`

        try {
            await sendEmail({
                email: user.email,
                subject: 'Password change request received',
                message: message
            })

            res.status(200).json({ status: 'Success', message: 'Password Reset Mail Sent to the user email' })
        } catch (error) {
            await prismaClient.passwordreset.update({
                where: {
                    userId: user.id,
                },
                data: {
                    userId: 'default_value',
                    token: 'default_value',
                    expiresAt: 'default_value',
                }
            })
            console.error("There is an error while send password reset email :", error);
            return res.status(500).json({ message: "Internal server error" });
        }

    } catch (error) {
        console.error("Error in forgot password:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const resetpassword = async (req: Request, res: Response) => {
    try {
        const token = req.params.token;
        const { password, confirmpassword } = req.body;
        if (!token) {
            return res.status(403).json({ message: 'Token is Expired or Not present' })
        }

        if (!password || !confirmpassword || password !== confirmpassword) {
            return res.status(400).json({ message: 'Password and Confirm Password should be Equal' })
        }
        // 1. Validate the token from the params
        const passwordreset = await prismaClient.passwordreset.findFirst({ where: { token: token } });

        if (!passwordreset) {
            return res.status(403).json({ message: 'Token is expired' })
        }
        // 2. Get the new password from the body 
        const userId = passwordreset?.userId;
        // 3. Update the password in DB
        await prismaClient.user.update({
            where: { id: userId },
            data: {
                password: hashSync(confirmpassword, Number(SALT_VALUE)),
            }
        })
        // 4. Password Reset Successfull Delete Record
        await prismaClient.passwordreset.delete({where: {id: passwordreset.id}});

        return res.status(200).json({ message: "Paasord Reset Successfulluy" });
    } catch (error) {
        console.error("Error in Reset password:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const me = async (req: Request, res: Response) => {
    try {
        const User = req.user;

    const response = {
        name: User?.name,
        email: User?.email,
        role: User?.role
    }

    res.json(response)
    } catch (error) {
        console.error("Error in Fetching User:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
