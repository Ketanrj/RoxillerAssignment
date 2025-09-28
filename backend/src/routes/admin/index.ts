import { Router } from "express";
import { storeRoutes } from "./storeRoutes";
import { userRoutes } from "./userRoutes";
import { ratingRoutes } from "./ratingRoutes";

// /admin/
export const adminRoutes = Router();

adminRoutes.use('/store', storeRoutes)
adminRoutes.use('/user', userRoutes)
adminRoutes.use('/rating', ratingRoutes)