const { addReview } = require("../controllers/review");
const { IsAuth, isAdmin } = require("../middlewares/authMiddlware");
const { validateRatings, validate } = require("../middlewares/validator");

const router = require("express").Router();

router.post("/add/:movieId", IsAuth, validateRatings, validate, addReview);

module.exports = router;
