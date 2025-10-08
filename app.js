import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./src/modules/auth/routes/auth.routes.js";
import categoryRoutes from "./src/modules/categories/routes/category.routes.js";
import expenRoutes from "./src/modules/expenses/routes/expense.routes.js";
import { errorHandler } from "./src/middleware/error.middleware.js";
import { apiLimiter } from "./src/middleware/rateLimiter.js";

const app = express();


app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true               
}));

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());


app.use("/v1/api/auth", apiLimiter, authRoutes);
app.use("/v1/api/categories", categoryRoutes);
app.use("/v1/api/expenses", expenRoutes);


app.use(errorHandler);

export default app;

