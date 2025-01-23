const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Example of a protected route
router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    message: "Access granted",
    token: req.token, // Include the token in the response
    user: req.user, // Include the decoded user info
  });
}); 

module.exports = router;
