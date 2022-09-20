const { addReview, updateReview } = require("../controllers/review");
const { IsAuth } = require("../middlewares/authMiddlware");
const { validateRatings, validate } = require("../middlewares/validator");

const router = require("express").Router();

router.post("/add/:movieId", IsAuth, validateRatings, validate, addReview);
router.patch("/:reviewId", IsAuth, validateRatings, validate, updateReview);

module.exports = router;
