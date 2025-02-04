const sql = require("mssql");

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
  const result = await sql.query`
    UPDATE reviews 
    SET rating = ${rating}, comment = ${comment}
    WHERE id = ${reviewId} AND user_id = ${userId};
  `;
  return result.rowsAffected;
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
