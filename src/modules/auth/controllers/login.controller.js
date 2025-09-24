import { loginUser } from "../services/login.service.js";
import { generateAccessToken } from "../../../util/jwt.js";

export const loginController = async (req, res , next) => {
  try {
    const { email, password } = req.body;
        
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await loginUser(email, password);

     // JWT generate
     const token = generateAccessToken(user);

    return res.status(200).json({
      message: "Login successful",
      token,   // abhi body me bhej rahe hain (baad me cookie me kar sakte hain
      user
    });
  } catch (error) {
    next(error);
  }
};
