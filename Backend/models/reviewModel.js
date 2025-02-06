const sql = require("mssql");
const { poolPromise } = require("../config/db");

// Get reviews for a specific service
const getReviewsByServiceId = async (serviceId) => {
  const result =
    await sql.query`SELECT * FROM reviews WHERE service_id = ${serviceId}`;
  return result.recordset;
};

// Get reviews by a specific user
const getReviewsByUserId = async (userId) => {
  const result =
    await sql.query`SELECT * FROM reviews WHERE user_id = ${userId}`;
  return result.recordset;
};

// Add a new review
const addReview = async (userId, serviceId, rating, comment) => {
  const result = await sql.query`
    INSERT INTO reviews (user_id, service_id, rating, comment, created_at)
    VALUES (${userId}, ${serviceId}, ${rating}, ${comment}, GETDATE());
  `;
  return result.rowsAffected;
};

// Update a review
const updateReview = async (reviewId, userId, rating, comment) => {
  try {
    const pool = await poolPromise; // Make sure you're getting the SQL pool connection

    // Build the query with parameterized inputs
    await pool
      .request()
      .input("ReviewId", reviewId) // Assumes reviewId is a uniqueidentifier type
      .input("Rating", rating)
      .input("Comment", comment)
      .query(
        "UPDATE reviews SET rating = @Rating, comment = @Comment WHERE id = @ReviewId;"
      );

    console.log(`Review ${reviewId} updated successfully.`);
  } catch (error) {
    console.error("Error updating review:", error);
    throw new Error("Database error while updating review: " + error.message);
  }
};

// Delete a review
const deleteReview = async (reviewId, userId) => {
  const result = await sql.query`
    DELETE FROM reviews 
    WHERE id = ${reviewId} AND user_id = ${userId};
  `;
  return result.rowsAffected;
};

module.exports = {
  getReviewsByServiceId,
  getReviewsByUserId,
  addReview,
  updateReview,
  deleteReview,
};
