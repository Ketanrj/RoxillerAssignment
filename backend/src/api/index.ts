import { type Express } from "express";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Rootrouter } from "../routes"; // adjust path
import { PrismaClient } from "@prisma/client";
import credentials from "../middlewares/credentials";
import corsOptions from "../config/corsOptions";
import serverless from "serverless-http";

const app: Express = express();

export const prismaClient = new PrismaClient({
  log: ["query"],
});

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.get("/hello", (req, res) => {
  res.json({ message: "Hello world, it works!" });
});

app.use("/", Rootrouter);

// ❌ No app.listen here
export default serverless(app);


// import { type Express } from 'express'
// import express from 'express'
// import { PORT } from './secrets';
// import cors from 'cors'
// import corsOptions from './config/corsOptions';
// import  cookieParser from 'cookie-parser'
// import { Rootrouter } from './routes';
// import { PrismaClient } from '@prisma/client';
// import credentials from './middlewares/credentials';

// const app: Express = express();

// export const prismaClient = new PrismaClient({
//     log: ['query']
// })

// app.use(credentials);

// app.use(cors(corsOptions))

// app.use(express.urlencoded({ extended: false }));

// app.use(express.json());

// app.use(cookieParser());

// app.use('/api', Rootrouter);


// app.listen(PORT, () => {
//     console.log("Server Started on port 3000")
// })