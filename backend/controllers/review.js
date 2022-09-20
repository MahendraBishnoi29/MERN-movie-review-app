const { isValidObjectId } = require("mongoose");
const Movie = require("../models/movie");
const Review = require("../models/review");

// SUBMIT REVIEW
const addReview = async (req, res) => {
  const { movieId } = req.params;
  const { content, rating } = req.body;
  const userId = req.user._id;

  if (!isValidObjectId(movieId)) return res.json({ error: "Invalid MovieID!" });

  const movie = await Movie.findOne({ _id: movieId, status: "public" });

  if (!movie) return res.json({ error: "Movie Not Found!" });

  const isAlreadyReviewed = await Review.findOne({
    owner: userId,
    parentMovie: movie._id,
  });
  if (isAlreadyReviewed)
    return res.json({ error: "You Have Already Reviewed This Movie!" });

  // Create Review
  const newReview = new Review({
    owner: userId,
    parentMovie: movie._id,
    content,
    rating,
  });

  movie.reviews.push(newReview._id);
  await movie.save();
  await newReview.save();

  res.json({ message: "Thank You For Submitting Your Review 🙂." });
};

// UPDATE REVIEW
const updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const { content, rating } = req.body;
  const userId = req.user._id;

  if (!isValidObjectId(reviewId))
    return res.json({ error: "Invalid Review Id!" });

  const review = await Review.findOne({ owner: userId, _id: reviewId });
  if (!review) return res.json({ error: "No Review Found" });

  review.content = content;
  review.rating = rating;

  await review.save();
  res.json({ message: "Review Updated 👍🏻" });
};

module.exports = { addReview, updateReview };
