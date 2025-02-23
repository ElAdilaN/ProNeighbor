const { poolPromise } = require("../config/db");
const sql = require("mssql"); // Ensure that mssql is imported correctly

const db = require("../config/db"); // Import your DB connection

const getUserById = async (id) => {
  try {
    const pool = await poolPromise; // Make sure you're getting the SQL pool connection

    // Fetch user info with role
    /*   const userResult = await pool
      .request()
      .input("UserId", sql.UniqueIdentifier, id).query(`
          SELECT 
              u.id, u.name, u.email, u.phone, u.address, u.created_at, r.role AS role
          FROM users u
          JOIN roles r ON u.roles = r.id
          WHERE u.id = @UserId
      `);
 */
    const userResult = await pool
      .request()
      .input("UserId", sql.UniqueIdentifier, id).query(`
          SELECT 
              u.id, u.name, u.email, u.phone, u.address, u.created_at, u.roles AS role
          FROM users u
          
          WHERE u.id = @UserId
      `);
    if (userResult.recordset.length === 0) {
      return null;
    }
    const user = userResult.recordset[0];

    // If user is a provider, fetch their services
    if (user.role === "23EC3C35-1330-40B2-9024-A82E99F540F8") {
      const servicesResult = await pool
        .request()
        .input("ProviderId", sql.UniqueIdentifier, id).query(`
            SELECT 
                s.id, s.name, s.price, s.description, s.location, s.created_at,
                c.name AS category
            FROM services s
            JOIN categories c ON s.category_id = c.id
            WHERE s.provider_id = @ProviderId
        `);

      user.services = servicesResult.recordset;
    }

    return user;
  } catch (error) {
    console.error("Database Error:", error);
    throw error;
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

const getAllUsers = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("Select id , email  from users ");

    return result.recordset;
  } catch (error) {
    console.error("Error retrieving  users:", error);
    throw new Error("Database error while retrieving users ");
  }
};
const GetAllUsersThatDoesntExistOnChat = async (chatId) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request().input("chatId", chatId) // Proper parameter binding for MSSQL
      .query(`
        SELECT id , email 
        FROM users u
        WHERE u.id NOT IN (
            SELECT cp.user_id
            FROM chat_participants cp
            WHERE cp.chat_id = @chatId
        );
      `);

    return result.recordset; // Return the users to be handled by the controller
  } catch (error) {
    console.error("Error retrieving users:", error);
    throw new Error("Database error while retrieving users.");
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

const updateUserProfile = async (id, name, email, phone, address) => {
  try {
    const pool = await poolPromise;

    await pool
      .request()
      .input("UserId", sql.UniqueIdentifier, id)
      .input("Name", sql.NVarChar, name)
      .input("Email", sql.NVarChar, email)
      .input("Phone", sql.NVarChar, phone)
      .input("Address", sql.NVarChar, address).query(`
        UPDATE users 
        SET name = @Name, email = @Email, phone = @Phone, address = @Address 
        WHERE id = @UserId
      `);

    return { id, name, email, phone, address };
  } catch (error) {
    console.error("Database Error:", error);
    throw error;
  }
};
module.exports = {
  updateUserProfile,
  getUserById,
  getUserProfileImage,
  updateUserProfileImage,
  getAllUsers,
  GetAllUsersThatDoesntExistOnChat,
};
