export const errorHandler = (err, req, res, next) => {
    console.error("Error Handler:", err.message);
    
    const errorMap = {
      "User not found": 401,
      "Invalid password": 401,
      "Email already exists": 400,
      "All fields are required": 400,
      "Token expired": 401,
      "Unauthorized access": 403,
    };

    const statusCode = errorMap[err.message] || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({ message });
  };
  