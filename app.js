import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./src/modules/auth/routes/auth.routes.js";
import categoryRoutes from "./src/modules/categories/routes/category.routes.js";
import { errorHandler } from "./src/middleware/error.middleware.js";
import { apiLimiter } from "./src/middleware/rateLimiter.js";

const app = express();

// Middlewares
app.use(cors({
  origin: "http://localhost:3000", // frontend ka URL
  credentials: true               // cookie allow karega
}));

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Routes with limiter
app.use("/v1/api/auth", apiLimiter, authRoutes);


// Category routes
app.use("/v1/api/categories", categoryRoutes);
// Global error handler
app.use(errorHandler);

export default app;

