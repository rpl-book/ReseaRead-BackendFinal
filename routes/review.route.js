const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/review.controller");

router.post("/createReview/:id", reviewController.createReview);
router.get("/bookReviews", reviewController.getBookReviews);

module.exports = router;
