const express = require("express");
const { register, login } = require("../controllers/authController");
const { checkForAuth } = require("../middleware/authMiddleware");
const router = express.Router();

// Register Route
router.post("/auth/register", register);

// Login Route
//en Xavier vol un middleware que
// Redirect '/login' to '/token/login'
router.post("/login", (req, res) => {
  res.status(400).json({
    message: "You must include 'auth' in the URL. Please use /api/auth/login",
  });
});

// Login Route with token check middleware
router.post("/auth/login", login);

module.exports = router;
