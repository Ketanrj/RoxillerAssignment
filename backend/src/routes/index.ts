import { Router } from "express";
import { authRoutes } from "./authRoutes";
import { adminRoutes } from "./admin";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";
import { userMiddleware } from "../middlewares/userMiddleware";
import { userRoutes } from "./user";
import { storeownerMiddleware } from "../middlewares/storeownerMiddleware";
import { storeownerRoutes } from "./storeowner";


export const Rootrouter = Router();

Rootrouter.use('/auth', authRoutes)
Rootrouter.use('/admin', [authMiddleware, adminMiddleware], adminRoutes)

Rootrouter.use('/user', [authMiddleware, userMiddleware], userRoutes)
Rootrouter.use('/storeowner', [authMiddleware, storeownerMiddleware], storeownerRoutes)