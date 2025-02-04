const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  addReview,
  getReviewsByService,
  getUserReviews,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

const router = express.Router();

// Add a review (requires token)
router.post("/", protect, addReview);

// Get reviews for a specific service
router.get("/service/:serviceId", getReviewsByService);

// Get reviews made by the logged-in user
router.get("/my-reviews", protect, getUserReviews);

// Update a review by the owner (requires token)
router.put("/:reviewId", protect, updateReview);

// Delete a review by the owner (requires token)
router.delete("/:reviewId", protect, deleteReview);

module.exports = router;
