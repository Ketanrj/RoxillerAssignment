import { Router } from "express";
import { createStore, storeCount, storeList } from "../../controllers/storeController";


export const storeRoutes = Router();

storeRoutes.post('/create', createStore)
storeRoutes.get('/stores', storeList)
storeRoutes.get('/count', storeCount)
