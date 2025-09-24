import { verifyAccessToken } from "../util/jwt.js";

export const authMiddleware = (req, res, next) => {
    // Request ke header me Authorization hota hai jo usually aise aata hai:
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer token"


//   Agar client ne token bheja hi nahi, to response me 401 Unauthorized bhej diya jata hai.
  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded; // user id & role yahan set ho gaya
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};



// verifyAccessToken(token) token ko decode karke andar ka data (jaise id, email, role) nikal lega.

// req.user = decoded → Ab har route handler me req.user ke andar user ka data available hoga.

// next() → Request ko aage bhej do
