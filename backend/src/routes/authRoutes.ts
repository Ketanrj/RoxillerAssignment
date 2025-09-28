import { Router } from "express";
import { signup, login, me, forgetpassword, resetpassword } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const authRoutes = Router();

authRoutes.post('/signup', signup)
authRoutes.post('/login', login)
authRoutes.post('/forgetPassword', forgetpassword)
authRoutes.patch('/resetpassword/:token', resetpassword)
authRoutes.get('/me', authMiddleware, me)