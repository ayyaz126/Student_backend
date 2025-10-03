import { forgotPasswordService } from "../services/forgotPassword.service.js";
import { forgotPasswordSchema } from "../dto/forgotPassword.dto.js";

export const forgotPasswordController = async (req, res, next) => {
  try {
 
    const { email } = forgotPasswordSchema.parse(req.body);

  
    const result = await forgotPasswordService(email);


    return res.status(200).json(result);
  } catch (error) {
    if (error.errors) {
      // Zod validation error
      return res.status(400).json({ errors: error.errors });
    }
    next(error);
  }
};
