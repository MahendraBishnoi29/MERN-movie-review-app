const Movie = require("../models/movie");
const Review = require("../models/review");
const User = require("../models/userModel");
const {
  topRatedMoviesPipeline,
  getAverageRatings,
} = require("../utils/helper");

const getAppInfo = async (req, res) => {
  const movieCount = await Movie.countDocuments();
  const reviewCount = await Review.countDocuments();
  const userCount = await User.countDocuments();

  res.json({ appInfo: { movieCount, reviewCount, userCount } });
};

// GET MOST RATED THING OF ALL TIME
const getMostRatedMovie = async (req, res) => {
  const movies = await Movie.aggregate(topRatedMoviesPipeline());

  const topRatedMovies = await Promise.all(
    movies.map(async (m) => {
      const reviews = await getAverageRatings(m._id);
      return {
        id: m._id,
        title: m.title,
        reviews: { ...reviews },
      };
    })
  );

  res.json({ movies: topRatedMovies });
};

module.exports = { getAppInfo, getMostRatedMovie };
