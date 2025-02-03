const { poolPromise } = require("../config/db");
const sql = require("mssql"); // Ensure that mssql is imported correctly

const getUserById = async (id) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", id)
      .query("SELECT * FROM Users WHERE id = @id");
    return result.recordset[0]; // Returns the user or undefined if not found
  } catch (error) {
    console.error("Error fetching user by Id:", error);
    throw new Error("Database error while fetching user by Id");
  }
};

const updateUserProfileImage = async (id, imageBinary) => {
  try {
    const pool = await poolPromise;
    // Use sql.UniqueIdentifier for GUID and sql.VarBinary for binary data
    await pool
      .request()
      .input("id", sql.UniqueIdentifier, id) // Correctly reference GUID
      .input("profile_pic", sql.VarBinary, imageBinary) // Correctly reference VarBinary
      .query("UPDATE Users SET profile_pic = @profile_pic WHERE id = @id");
  } catch (error) {
    console.error("Error updating user profile image:", error);
    throw new Error("Database error while updating profile image");
  }
};

const getUserProfileImage = async (id) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", sql.UniqueIdentifier, id) // Ensure UniqueIdentifier is used for GUIDs
      .query("SELECT profile_pic FROM Users WHERE id = @id");

    if (result.recordset.length > 0) {
      return result.recordset[0].profile_pic; // Return the binary image data
    } else {
      throw new Error("No profile image found for this user");
    }
  } catch (error) {
    console.error("Error retrieving user profile image:", error);
    throw new Error("Database error while retrieving profile image");
  }
};

module.exports = { getUserById, getUserProfileImage, updateUserProfileImage };
