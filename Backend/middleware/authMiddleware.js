const jwt = require("jsonwebtoken");

const userModel = require("../models/authModel");
// Middleware to protect routes
exports.protect = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info to the request
    req.token = token; // Attach the token to the request
    req.userId = decoded.id; // Attach

    const currentTime = Math.floor(Date.now() / 1000);
    const timeLeft = decoded.exp - currentTime;

    console.log("Token verification...");
    if (timeLeft < 900) {
      console.log("Token is about to expire. Renewing...");

      // Use correct values from decoded token
      const newToken = jwt.sign(
        { id: decoded.id, role: decoded.role }, // Ensure correct user data
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION || "5m" } // Default to 5 minutes if env is missing
      );
      console.log("new token: ", newToken);

      // Set the new token in the response header
      res.setHeader("Authorization", `Bearer ${newToken}`);
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

exports.checkForAuth = (req, res, next) => {
  try {
    if (req.url.includes("auth")) {
      return next();
    } else {
      return res.status(400).json({
        message: "URL must contain 'auth'.",
      });
    }
  } catch (error) {
    // Catch any errors that occur and return a server error response
    console.error("Error in checkForToken middleware:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.errorHandler = (err, req, res, next) => {
  // Log the error details (for debugging purposes)
  console.error(err);

  // Set default status code to 500 (Internal Server Error)
  const statusCode = err.statusCode || 500;

  // Prepare error response
  const errorResponse = {
    message: err.message || "Something went wrong. Please try again later.",
  };

  // Send error response
  res.status(statusCode).json(errorResponse);
};
