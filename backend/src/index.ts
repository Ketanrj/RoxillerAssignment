import {type Express} from 'express' 
import express from 'express'
import { PORT } from './secrets';
import cors from 'cors'
import corsOptions from './config/corsOptions';
import { Rootrouter } from './routes';
import { PrismaClient } from '@prisma/client';
import credentials from './middlewares/credentials';

const app :Express  = express();

export const prismaClient = new PrismaClient({
    log:['query']
})

app.use(credentials);

app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/api', Rootrouter);


app.listen(PORT, () => {
    console.log("Server Started on port 3000")
})