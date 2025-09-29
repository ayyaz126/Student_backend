import express from "express";
import { registerController } from "../controllers/register.controller.js";
import { loginController } from "../controllers/login.controller.js";
import { logoutController } from "../controllers/logout.controller.js";
import { forgotPasswordController } from "../controllers/forgotPassword.controller.js";
import { resetPasswordController } from "../controllers/resetPassword.controller.js";
import { authLimiter } from "../../../middleware/rateLimiter.js";
import { authMiddleware } from "../../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerController, authLimiter);
router.post("/login", loginController, authLimiter);
router.post("/logout", authMiddleware, logoutController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password",   resetPasswordController);

router.get("/me", authMiddleware, (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user });
});

export default router;
