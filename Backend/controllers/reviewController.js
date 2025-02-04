const reviewModel = require("../models/reviewModel");

// Add Review
exports.addReview = async (req, res, next) => {
  try {
    const { service_id, rating, comment } = req.body;
    const user_id = req.user.id; // Get user ID from token

    if (!service_id || !rating) {
      return res
        .status(400)
        .json({ message: "Service ID and rating are required" });
    }

    await reviewModel.addReview(user_id, service_id, rating, comment);
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    next(error);
  }
};

// Get Reviews for a Service
exports.getReviewsByService = async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    const reviews = await reviewModel.getReviewsByServiceId(serviceId);

    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

// Get Reviews Made by a User
exports.getUserReviews = async (req, res, next) => {
  try {
    const user_id = req.user.id; // Get user ID from token
    const reviews = await reviewModel.getReviewsByUserId(user_id);

    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

// Update Review by the Owner
exports.updateReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    const user_id = req.user.id; // Get user ID from token

    const result = await reviewModel.updateReview(
      reviewId,
      user_id,
      rating,
      comment
    );

    if (result === 0) {
      return res
        .status(404)
        .json({ message: "Review not found or unauthorized" });
    }

    res.status(200).json({ message: "Review updated successfully" });
  } catch (error) {
    next(error);
  }
};

// Delete Review by the Owner
exports.deleteReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const user_id = req.user.id; // Get user ID from token

    const result = await reviewModel.deleteReview(reviewId, user_id);

    if (result === 0) {
      return res
        .status(404)
        .json({ message: "Review not found or unauthorized" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    next(error);
  }
};
