import { registerUser } from "../services/register.service.js";
import { registerSchema } from "../dto/register.dto.js"; // zod schema import

export const registerController = async (req, res, next) => {
  try {
  
    const { name, email, password } = registerSchema.parse(req.body);

    const user = await registerUser(name, email, password);

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    if (error.errors) {    
      return res.status(400).json({ errors: error.errors });
    }
    next(error); 
  }
};
