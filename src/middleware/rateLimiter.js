import rateLimit from "express-rate-limit";

// Global limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, 
  message: "Too many requests from this IP, please try again later."
});

// windowMs: 15 * 60 * 1000 → 15 minutes ka time window (milliseconds me).
// max: 100 → Ek IP 15 minute ke andar sirf 100 requests kar sakta hai.
// message: Agar limit exceed ho gayi to client ko yeh response milega:
// "Too many requests from this IP, please try again later."
//  Matlab: Agar koi user bahut zyada API calls kare (100 se upar within 15 min), to uska access temporarily block ho jayega.



// Auth specific limiter
export const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  max: 5, 
  message: "Too many login/register attempts, please try again later."
});


// windowMs: 1 * 60 * 1000 → Sirf 1 minute ka window.

// max: 5 → Ek IP sirf 5 requests per minute kar sakta hai.

// message: Agar exceed ho gayi to:
// "Too many login/register attempts, please try again later."

// 💡 Matlab: Login/Register routes pe brute force attack (bar bar password try karna) ko prevent karne ke liye.