const {
  addReview,
  updateReview,
  removeReview,
  getReviewByMovie,
  getLatestUploads,
} = require("../controllers/review");
const { IsAuth } = require("../middlewares/authMiddlware");
const { validateRatings, validate } = require("../middlewares/validator");

const router = require("express").Router();

router.post("/add/:movieId", IsAuth, validateRatings, validate, addReview);
router.patch("/:reviewId", IsAuth, validateRatings, validate, updateReview);
router.delete("/:reviewId", IsAuth, removeReview);
router.get("/get-reviews-by-movie/:movieId", getReviewByMovie);

// For Normal Users
router.get("/latest-uploads", getLatestUploads);

module.exports = router;
