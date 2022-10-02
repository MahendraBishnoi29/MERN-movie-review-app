const Movie = require("../models/movie");
const Review = require("../models/review");
const User = require("../models/userModel");

const getAppInfo = async (req, res) => {
  const movieCount = await Movie.countDocuments();
  const reviewCount = await Review.countDocuments();
  const userCount = await User.countDocuments();

  res.json({ movieCount, reviewCount, userCount });
};

module.exports = { getAppInfo };
