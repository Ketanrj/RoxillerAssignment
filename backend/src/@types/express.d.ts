import express from 'express'
import { User } from '@prisma/client'

//Declaring the type over-ride
declare module 'express' {
    export interface Request{
        user?: User
    }
}