const { getPool } = require("../config/db");

// Check if user already exists
const checkUserExists = async (email) => {
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input("Email", email)
      .query("SELECT * FROM Users WHERE Email = @Email");
    return result.recordset.length > 0;
  } catch (error) {
    console.error("Error checking if user exists:", error);
    throw new Error("Database error while checking if user exists");
  }
};

// Insert a new user
const insertUser = async (name, email, password, userType) => {
  try {
    const pool = await getPool();
    await pool
      .request()
      .input("Name", name)
      .input("Email", email)
      .input("Password", password)
      .input("UserType", userType)
      .query(
        "INSERT INTO Users (Name, Email, hashed_password, roles) VALUES (@Name, @Email, @Password, @UserType)"
      );
  } catch (error) {
    console.error("Error inserting user:", error);
    throw new Error("Database error while inserting user: " + error.message);
  }
};

// Get user by email
const getUserByEmail = async (email) => {
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input("Email", email)
      .query(
        "SELECT Id, Name, Email, hashed_password , roles FROM Users WHERE Email = @Email"
      );
    return result.recordset[0]; // Returns the user or undefined if not found
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Database error while fetching user by email");
  }
};

module.exports = {
  checkUserExists,
  insertUser,
  getUserByEmail,
};
