const { isValidObjectId } = require("mongoose");
const { getAverageRatings } = require("../utils/helper");
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

  const reviews = await getAverageRatings(movie._id);

  res.json({ reviews, message: "Thank You For Submitting Your Review 🙂" });
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

// REMOVE REVIEW
const removeReview = async (req, res) => {
  const { reviewId } = req.params;

  const userId = req.user._id;

  if (!isValidObjectId(reviewId))
    return res.json({ error: "Invalid Review Id!" });

  const review = await Review.findOne({ owner: userId, _id: reviewId });
  if (!review) return res.json({ error: "Review Not Found!" });

  const movie = await Movie.findById(review.parentMovie).select("reviews");
  movie.reviews = movie.reviews.filter((rId) => rId.toString() !== reviewId);

  await Review.findByIdAndDelete(reviewId);

  await movie.save();
  res.json({ message: "Review Removed Successfully 👍🏻" });
};

// GET REVIEWS BY MOVIE
const getReviewByMovie = async (req, res) => {
  const { movieId } = req.params;

  if (!isValidObjectId(movieId))
    return res.json({ error: "Invalid Movie Id!" });

  const movie = await Movie.findById(movieId)
    .populate({
      path: "reviews",
      populate: { path: "owner", select: "name" },
    })
    .select("reviews title");

  const reviews = movie.reviews.map((r) => {
    const { owner, content, rating, _id: reviewId } = r;
    const { name, _id: ownerId } = owner;
    return {
      id: reviewId,
      owner: {
        id: ownerId,
        name,
      },
      content,
      rating,
    };
  });

  res.json({ movie: { title: movie.title, reviews } });
};

module.exports = {
  addReview,
  updateReview,
  removeReview,
  getReviewByMovie,
};
