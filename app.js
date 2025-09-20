import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";


const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

export default app;