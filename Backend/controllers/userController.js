const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/authModel");

exports.userById = async (req, res) => {
  const { name, email, password, user_type } = req.body;

  const user = await userModel.getUserByEmail(email);
  try {
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = generateToken(user.Id, user.User_type);

    res.status(200).json({
      message: "Successfully logged in",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
