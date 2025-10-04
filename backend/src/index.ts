import { type Express } from "express";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Rootrouter } from "./routes"; // adjust path
import { PrismaClient } from "@prisma/client";
import credentials from "./middlewares/credentials";
import corsOptions from "./config/corsOptions";
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

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express on Vercel" });
});

app.use("/api", Rootrouter);

export default serverless(app);
