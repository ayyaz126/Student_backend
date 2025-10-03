export const logoutController = (req, res) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,   
      sameSite: "strict"
    });
  
    return res.status(200).json({ message: "Logged out successfully" });
  };
  