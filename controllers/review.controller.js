const db = require("../models");
const { v4: uuidv4 } = require("uuid");
const errorCatch = require("../errors/errorCatch");

const Review = db.Review;
const User = db.User;

const createReview = async (req, res) => {
  try {
    const userId = req.params.id;
    const { bookId, reviewText, dateAdded } = req.query;

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
      payload: { newReview },
      message: "Review created successfully",
    });
  } catch (err) {
    return errorCatch(res, err, 500, "Create new Review");
  }
};

const getBookReviews = async (req, res) => {
  try {
    const { bookId } = req.query;

    const bookReviewsData = await Review.findAll({
      where: { bookId: bookId },
      include: [{ model: User, attribute: ["userImage", "userName"] }],
    });

    if (!bookReviewsData) {
      return res.status(400).json({ message: "There's no review yet" });
    }

    return res.status(200).json({
      payload: { bookReviewsData },
      message: "Sucesssfully get book reviews",
    });
  } catch (err) {
    return errorCatch(res, err, 500, "Retrive Reviews");
  }
};

module.exports = {
  createReview,
  getBookReviews,
};
