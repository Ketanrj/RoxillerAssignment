import { Router } from "express";
import { newuser, userList, usersCount, ownerList } from "../../controllers/userController";


export const userRoutes = Router();

userRoutes.post('/new', newuser)
userRoutes.get('/count', usersCount)
userRoutes.get('/search', userList)
userRoutes.get('/ownerlist', ownerList)