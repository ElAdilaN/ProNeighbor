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
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

exports.checkForToken = (req, res, next) => {
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
