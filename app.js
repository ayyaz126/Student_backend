import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./src/modules/auth/routes/auth.routes.js";
import { errorHandler } from "./src/middleware/error.middleware.js";
import { apiLimiter } from "./src/middleware/rateLimiter.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/v1/api/auth", authRoutes , apiLimiter);

app.use(errorHandler);

export default app;
