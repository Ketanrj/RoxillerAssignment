import { Request, Response } from "express";
import { hashSync, compareSync } from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { SECRET_KEY, SALT_VALUE } from "../secrets";
import { prismaClient } from "../api";
import { generateResetToken } from "../utils/generateToken";
import { sendEmail } from "../utils/sendEmail";
import { Passwordreset } from "@prisma/client";
import { z } from 'zod'
import { passwordSchema, ResetpasswordSchema, userUpdateSchema } from "../schema/userSchema";


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

    let user = await prismaClient.user.findFirst({ where: { email: email } })
    if (!user) {
        throw new Error("User Does not Exist! Please SignUp")
    }

    let pass = compareSync(password, user.password);
    if (!pass) {
        return res.status(401).send("Password is incorrect");
    }

    const accessToken = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '5m' })
    const refreshToken = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '2h' })

    await prismaClient.user.update({
        where: {
            id: user.id,
        },
        data: {
            refreshToken: refreshToken
        }
    })

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 2 * 60 * 60 * 1000
    });

    res.json({ name: user.name, email: user.email, role: user.role, token: accessToken })
}

export const logout = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const user = await prismaClient.user.findFirst({ where: { refreshToken: refreshToken } })
    if (!user) {
        return res.clearCookie('refreshToken', { httpOnly: true, secure: false, sameSite: 'lax' });
    }

    //delete the token
    const deleteRefreshToken = await prismaClient.user.update(({
        where: { id: user.id },
        data: { refreshToken: null },
    }));

    res.clearCookie('refreshToken', { httpOnly: true, secure: false, sameSite: 'lax' });

    if (deleteRefreshToken) {
        return res.json({ message: `${user.name} logged out Successfully!` })
    }
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
        const resetUrl = `http://localhost:5173/resetpassword/${token}`;
        const message = `<p>We have received a password reset request.</p>
                        <p>Please click the button below to reset your password:</p>
                        <a href="${resetUrl}" style="
                            display:inline-block;
                            padding:10px 20px;
                            background:#007bff;
                            color:#fff;
                            text-decoration:none;
                            border-radius:5px;
                        ">Reset Password</a>`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Password change request received',
                message: message
            })

            return res.status(200).json({ status: 'Success', message: 'Password Reset Mail Sent to the user email' })
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
        console.log("///////////", req.body);
        const response = z.safeParse(ResetpasswordSchema, req.body);
        if (!token) {
            return res.status(403).json({ message: 'Token is Expired or Not present' })
        }

        if (!response.success) {
            // If validation fails, return a 400 response with the error details
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: response.error.issues,
            });
        }

        const {password, confirmpassword} = response.data;

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
        await prismaClient.passwordreset.delete({ where: { id: passwordreset.id } });

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

        return res.json(response)
    } catch (error) {
        console.error("Error in Fetching User:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const updateuser = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const { name, email } = z.parse(userUpdateSchema, req.body);
        if (!user?.id) {
            return res.status(401).json({ message: "User is anauthorized" });
        }

        console.log('/////////////////////////////////////////', name, email)

        await prismaClient.user.update({
            where: { id: user.id },
            data: {
                name: name,
                email: email,
            }
        })

        return res.status(200).json({ message: "User Data Updated Successfully" })
    } catch (error) {
        console.error("Error Owner List:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
}


export const updatepassword = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const { password } = z.parse(passwordSchema, req.body);
        if (!user?.id) {
            return res.status(401).json({ message: "User is anauthorized" });
        }


        await prismaClient.user.update({
            where: { id: user.id },
            data: {
                password: hashSync(password, Number(SALT_VALUE)),
            }
        })

        return res.status(200).json({ message: "Password Updated Successfully" })
    } catch (error) {
        console.error("Error Owner List:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
}