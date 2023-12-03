const db = require("../models");
const { v4: uuidv4 } = require("uuid");
const errorCatch = require("../errors/errorCatch");

const createReview = async (req, res) => {
  try {
    const { userId, bookId, reviewText, dateAdded } = req.body;

    if (!userId || !bookId || !reviewText || !dateAdded) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newReview = await Review.create({
      reviewId: uuidv4(),
      userId,
      bookId,
      reviewText,
      dateAdded,
    });

    return res.status(200).json({
      payload: { review: newReview },
      message: "Review created successfully",
    });
  } catch (err) {
    return errorCatch(res, err, 500, "Create new Review");
  }
};

module.exports = {
  createReview,
};
