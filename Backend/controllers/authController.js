const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/authModel");

// Generate JWT token
const generateToken = (userId, userType) => {
  return jwt.sign({ id: userId, role: userType }, process.env.JWT_SECRET, {
    expiresIn: "1m",
  });
};

// Register User
exports.register = async (req, res) => {
  const { name, email, password, user_type } = req.body;

  // Check if required fields are provided
  if (!name || !email || !password || !user_type) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user already exists
    const userExists = await userModel.checkUserExists(email);
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    await userModel.insertUser(name, email, hashedPassword, user_type);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Get user by email
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.hashed_password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // Generate token
    const token = generateToken(user.Id, user.roles);

    res.status(200).json({
      message: "Successfully logged in",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
