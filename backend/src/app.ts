import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import credentials from "./middlewares/credentials";
import corsOptions from "./config/corsOptions";
import { Rootrouter } from "./routes";
import { PrismaClient } from "@prisma/client";

// Prisma singleton for serverless
const globalForPrisma = global as unknown as { prisma: PrismaClient };
export const prismaClient =
  globalForPrisma.prisma ||
  new PrismaClient({ log: ["query"] });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismaClient;

const app: Express = express();

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Minimal test route
app.get("/hello", (req, res) => {
  res.json({ message: "Hello world, it works!" });
});

// Mount your main router
app.use("/", Rootrouter);

export default app;
