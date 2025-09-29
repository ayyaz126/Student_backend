export const logoutController = (req, res) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,   // production (https) me true karna
      sameSite: "strict"
    });
  
    return res.status(200).json({ message: "Logged out successfully" });
  };
  