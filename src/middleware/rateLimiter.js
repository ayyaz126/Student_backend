import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, 
  message: "Too many requests from this IP, please try again later."
});

export const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  max: 5, 
  message: "Too many login/register attempts, please try again later."
});

