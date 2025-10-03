export const isAdmin = (req, res, next) => {
  try {
    // 1. Check user exist karta hai ya nahi
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // 2. Check role admin hai ya nahi
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied, admin only" });
    }

    next(); // agla controller chalega
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error in isAdmin middleware" });
  }
};
