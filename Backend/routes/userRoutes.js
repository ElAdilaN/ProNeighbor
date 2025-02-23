const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const {
  updateUserProfile,
  getUserProfile,
  GetAllUsers,
  userById,
  uploadProfileImage,
  getUserProfileImage,
  GetAllUsersThatDoesntExistOnChat,
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

router.get("/profile", protect, getUserProfile);
//router.get("/GetAllUsers", protect, GetAllUsers);
router.put("/profile", protect, updateUserProfile);
router.get("/GetAllUsers/:id", protect, GetAllUsersThatDoesntExistOnChat);
router.get("/profile-image/:id", getUserProfileImage);

router.get("/userById/:id", protect, userById);

module.exports = router;
