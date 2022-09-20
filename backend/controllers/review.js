const { isValidObjectId } = require("mongoose");
const Movie = require("../models/movie");
const Review = require("../models/review");

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
    res.json({ error: "You Have Already Reviewed This Movie!" });

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

module.exports = { addReview };
