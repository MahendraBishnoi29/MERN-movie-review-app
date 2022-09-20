const {
  addReview,
  updateReview,
  removeReview,
} = require("../controllers/review");
const { IsAuth } = require("../middlewares/authMiddlware");
const { validateRatings, validate } = require("../middlewares/validator");

const router = require("express").Router();

router.post("/add/:movieId", IsAuth, validateRatings, validate, addReview);
router.patch("/:reviewId", IsAuth, validateRatings, validate, updateReview);
router.delete("/:reviewId", IsAuth, removeReview);

module.exports = router;
