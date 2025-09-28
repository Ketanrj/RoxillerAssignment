
import { Router } from "express";
import {ratingCount } from "../../controllers/ratingController";

export const ratingRoutes = Router();

ratingRoutes.get('/count', ratingCount)