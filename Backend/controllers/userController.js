const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.GetAllUsersThatDoesntExistOnChat = async (req, res) => {
  const chatId = req.params.id;

  try {
    const users = await userModel.GetAllUsersThatDoesntExistOnChat(chatId);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Get ID from token
    console.log("User ID from token:", userId);

    const userProfile = await userModel.getUserById(userId);

    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(userProfile);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.userById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await userModel.getUserById(id); // Fetch the user by ID
    if (!user) {
      return res.status(404).json({ message: "User not found" }); // If no user found
    }

    // Return user data
    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.uploadProfileImage = async (req, res) => {
  const userId = req.params.id;
  const imageFile = req.file;

  if (!imageFile) {
    return res.status(400).send("No image file uploaded");
  }

  // Convert the image buffer to binary data
  const imageBinary = imageFile.buffer; // This is a Buffer containing binary data

  try {
    // Call the model function to update the user profile image
    await userModel.updateUserProfileImage(userId, imageBinary);
    res.status(200).send("Profile image updated successfully.");
  } catch (error) {
    console.error("Error uploading profile image:", error);
    res.status(500).send("Database error while uploading image.");
  }
};

exports.getUserProfileImage = async (req, res) => {
  try {
    const userId = req.params.id; // Get user ID from URL
    const imageBinary = await userModel.getUserProfileImage(userId);

    // Set the appropriate headers for image response
    res.setHeader("Content-Type", "image/jpeg"); // Set the image content type, adjust based on your image format
    res.send(imageBinary); // Send the binary image data as the response
  } catch (error) {
    console.error("Error uploading profile image:", error);
    res.status(500).json({ message: "Error retrieving profile image" });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Take ID from token
    const { _name, _email, _phone, _address } = req.body;
    console.log("name", _name);
    console.log("email", _email);
    console.log("phone", _phone);
    console.log("addres", _address);
    // Call the model function to update user info
    console.log("id", userId);
    const updatedUser = await userModel.updateUserProfile(
      userId,
      _name,
      _email,
      _phone,
      _address
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
