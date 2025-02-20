const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const {
  updateUserProfile,
  getUserProfile,
  userById,
  uploadProfileImage,
  getUserProfileImage,
} = require("../controllers/userController");
const multer = require("multer");
// Configure multer to handle file uploads (store file in memory as Buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Example of a protected route

router.post(
  "/uploadProfileImage/:id",
  upload.single("image"),
  uploadProfileImage
);

router.get("/profile-image/:id", getUserProfileImage);

router.get("/userById/:id", protect, userById);

router.get("/profile", protect, getUserProfile);

router.put("/profile", protect, updateUserProfile);

module.exports = router;
