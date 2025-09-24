import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "your_secret_key";
const ACCESS_TOKEN_EXPIRES = "15m"; // 15 minutes

export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role }, // payload
    ACCESS_TOKEN_SECRET,              // secret key
    { expiresIn: ACCESS_TOKEN_EXPIRES }
  );
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
};
