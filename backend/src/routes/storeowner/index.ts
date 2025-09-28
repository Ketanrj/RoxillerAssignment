import { Router } from "express";
import { ownerDashboard } from "../../controllers/ownerDashboard";

export const storeownerRoutes = Router();

storeownerRoutes.get('/dashboard', ownerDashboard)