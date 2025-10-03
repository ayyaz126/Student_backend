import { loginUser } from "../services/login.service.js";
import { generateAccessToken } from "../../../util/jwt.js";
import { loginSchema } from "../dto/login.dto.js"; 

export const loginController = async (req, res, next) => {
  try {
   
    const { email, password } = loginSchema.parse(req.body);
    
    const user = await loginUser(email, password);

    const token = generateAccessToken(user);
    res.cookie("accessToken", token, {
      httpOnly: true, 
      secure: false,  
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, 
    });
    return res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    if (error.errors) {
      // Zod validation error
      return res.status(400).json({ errors: error.errors });
    }
    next(error);
  }
};
