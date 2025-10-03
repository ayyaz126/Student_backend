import { resetPasswordService } from "../services/resetPassword.service.js";
import { resetPasswordSchema } from "../dto/ resetPassword.dto.js";

export const resetPasswordController = async (req, res, next) => {
  try {
    const { token, newPassword } = resetPasswordSchema.parse(req.body);

    const response = await resetPasswordService(token, newPassword);

    res.json(response);
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(400).json({ message: error.message });
  }
};
