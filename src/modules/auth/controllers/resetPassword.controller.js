import { resetPasswordService } from "../services/resetPassword.service.js";

export const resetPasswordController = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password are required" });
    }

    const response = await resetPasswordService(token, newPassword);
    res.json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};