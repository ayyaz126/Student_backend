import { loginUser } from "../services/login.service.js";
import { generateAccessToken } from "../../../util/jwt.js";

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await loginUser(email, password);

    // JWT generate
    const token = generateAccessToken(user);

    // Cookie set
    // Ye cookie ka naam hai. Browser ke storage me ye naam se save hogi.
    // Isme hum JWT token store kar rahe hain.
    res.cookie("accessToken", token, {
      httpOnly: true,    // frontend JS se access nahi hoga
      secure: false,     // agar HTTPS ho to true karna
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user, // user ka data bhej rahe hain (token cookie me hai)
    });
  } catch (error) {
    next(error);
  }
};
