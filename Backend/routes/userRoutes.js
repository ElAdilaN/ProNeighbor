const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const {
  userById,
  uploadProfileImage,
  getUserProfileImage,
} = require("../controllers/userController");
const multer = require("multer");
// Configure multer to handle file uploads (store file in memory as Buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Example of a protected route
router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    message: "Access granted",
    token: req.token, // Include the token in the response
    user: req.user, // Include the decoded user info
  });
});

router.post(
  "/uploadProfileImage/:id",
  upload.single("image"),
  uploadProfileImage
);

router.get("/profile-image/:id", getUserProfileImage);

router.get("/userById", protect, userById);

module.exports = router;
