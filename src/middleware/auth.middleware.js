import { verifyAccessToken } from "../util/jwt.js";

export const authMiddleware = (req, res, next) => {
  // Pehle cookie me check karo
  const tokenFromCookie = req.cookies?.accessToken;

  // Agar cookie me na ho to Authorization header se check karo
  const authHeader = req.headers["authorization"];
  const tokenFromHeader = authHeader && authHeader.split(" ")[1];

  const token = tokenFromCookie || tokenFromHeader;

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  const decoded = verifyAccessToken(token);

  if (!decoded) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }

  req.user = decoded; // user data attach ho gaya
  next();
};
