import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "your_secret_key";
const ACCESS_TOKEN_EXPIRES = "15m";

const RESET_TOKEN_SECRET = process.env.RESET_TOKEN_SECRET || "reset_secret_key";
const RESET_TOKEN_EXPIRES = "15m";

export const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES,
  });
};

export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch {
    return null;
  }
};

export const generateResetToken = (userId) => {
  return jwt.sign({ id: userId }, RESET_TOKEN_SECRET, {
    expiresIn: RESET_TOKEN_EXPIRES,
  });
};

export const verifyResetToken = (token) => {
  try {
    return jwt.verify(token, RESET_TOKEN_SECRET);
  } catch {
    return null;
  }
};
