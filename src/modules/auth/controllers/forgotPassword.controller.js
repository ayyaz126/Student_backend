import { forgotPasswordService } from "../services/forgotPassword.service.js";

export const forgotPasswordController = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const result = await forgotPasswordService(email);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
