const { poolPromise } = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register User
exports.register = async (req, res) => {
  const { name, email, password, user_type } = req.body;

  try {
    const pool = await poolPromise;

    // Check if user already exists
    const result = await pool
      .request()
      .input("Email", email)
      .query("SELECT * FROM Users WHERE Email = @Email");

    if (result.recordset.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    await pool
      .request()
      .input("Name", name)
      .input("Email", email)
      .input("Password", hashedPassword)
      .input("UserType", user_type)
      .query(
        "INSERT INTO Users ( Name, Email, Password, User_type ) VALUES (@Name, @Email, @Password , @UserType)"
      );
    console.log(
      `INSERT INTO Users (   Name, Email, Password, User_type ) VALUES (${name},${email} ,${password} ,${user_type})`
    );
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login User
const generateToken = (userId, userType) => {
  return jwt.sign({ id: userId, role: userType }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const pool = await poolPromise;

    // Check if user exists
    const result = await pool
      .request()
      .input("Email", email)
      .query(
        "SELECT Id, Name, Email, Password , User_type FROM Users WHERE Email = @Email"
      );

    if (result.recordset.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = result.recordset[0];
    if (!user.Password) {
      return res.status(500).json({ message: "No password stored for user" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = generateToken(user.Id, user.User_type);

    // Return token and success message
    res.status(200).json({
      message: "Successfully logged in updated ",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
