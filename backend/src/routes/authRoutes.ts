import { Router } from "express";
import { signup, login, me, forgetpassword, resetpassword, logout, updateuser, updatepassword} from "../controllers/authController";
import { refresh } from "../controllers/refreshController";

import { authMiddleware } from "../middlewares/authMiddleware";

export const authRoutes = Router();

authRoutes.post('/signup', signup)
authRoutes.post('/login', login)
authRoutes.post('/logout', logout)
authRoutes.post('/forgetPassword', forgetpassword)
authRoutes.patch('/resetpassword/:token', resetpassword)
authRoutes.get('/refresh', refresh)
authRoutes.get('/me', authMiddleware, me)
authRoutes.patch('/update', authMiddleware, updateuser)
authRoutes.patch('/updatepassword', authMiddleware, updatepassword)
