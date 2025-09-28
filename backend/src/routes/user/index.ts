import { Router } from "express";
import { newRating } from "../../controllers/ratingController";
import { storeList } from "../../controllers/storeController";

export const userRoutes = Router();


userRoutes.get('/store', storeList)
userRoutes.post('/newrating', newRating)