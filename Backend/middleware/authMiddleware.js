const jwt = require("jsonwebtoken");

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
