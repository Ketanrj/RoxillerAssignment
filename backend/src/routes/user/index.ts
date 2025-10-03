import { Router } from "express";
import { newRating, storerating } from "../../controllers/ratingController";
import { storeList } from "../../controllers/storeController";

export const userRoutes = Router();

userRoutes.get('/storeList', storeList)
userRoutes.get('/storerating', storerating)
userRoutes.post('/newrating', newRating)