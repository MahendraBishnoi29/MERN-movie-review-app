const crypto = require("crypto");
const Review = require("../models/review");
const cloudinary = require("./cloud");

// For Password Resetting
exports.generateRandomByte = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(30, (err, bufferData) => {
      if (err) reject(err);
      const bufferString = bufferData.toString("hex");

      console.log(bufferString);
      resolve(bufferString);
    });
  });
};

exports.handleNotFound = (req, res) => {
  res.status(404).json({ error: "No Routes Found" });
};

// IMAGE UPLOAD FUNCTION
exports.uploadImageToCloud = async (file) => {
  const { secure_url: url, public_id } = await cloudinary.v2.uploader.upload(
    file,
    {
      gravity: "face",
      height: 500,
      width: 500,
      crop: "thumb",
    }
  );

  return { url, public_id };
};

// FORMAT ACTOR
exports.formatActor = (actor) => {
  const { name, gender, about, _id, avatar } = actor;

  return {
    id: _id,
    name,
    about,
    gender,
    avatar: avatar?.url,
  };
};

// Aggregation FOR AVERAGE RATINGS
exports.averageRatingPipeline = (movieId) => {
  return [
    {
      $lookup: {
        from: "Review",
        localField: "rating",
        foreignField: "_id",
        as: "avgRat",
      },
    },
    {
      $match: {
        parentMovie: movieId,
      },
    },
    {
      $group: {
        _id: null,
        ratingAvg: {
          $avg: "$rating",
        },
        reviewCount: {
          $sum: 1,
        },
      },
    },
  ];
};

// AGGREGATION FOR RELATED MOVIES
exports.relatedMovieAggregation = (tags, movieId) => {
  return [
    {
      $lookup: {
        from: "Movie",
        localField: "tags",
        foreignField: "_id",
        as: "relatedMovie",
      },
    },
    {
      $match: {
        tags: { $in: [...tags] },
        _id: { $ne: movieId },
      },
    },
    {
      $project: {
        title: 1,
        poster: "$poster.url",
        responsivePosters: "$poster.responsive",
      },
    },
    {
      $limit: 5,
    },
  ];
};

// AGGREGATION FOR AVERAGE RATINGS
exports.getAverageRatings = async (movieId) => {
  const [aggregatedRes] = await Review.aggregate(
    this.averageRatingPipeline(movieId)
  );
  const reviews = {};

  if (aggregatedRes) {
    const { ratingAvg, reviewCount } = aggregatedRes;
    reviews.ratingAvg = parseFloat(ratingAvg).toFixed(1);
    reviews.reviewsCount = reviewCount;
  }
  return reviews;
};

// AGGREGATION FOR TOP-RATED MOVIES
exports.topRatedMoviesPipeline = (type) => {
  const matchOptions = {
    reviews: { $exists: true },
    status: { $eq: "public" },
  };

  if (type) matchOptions.type = { $eq: type };

  return [
    {
      $lookup: {
        from: "Movie",
        localField: "reviews",
        foreignField: "_id",
        as: "topRated",
      },
    },
    {
      $match: matchOptions,
    },
    {
      $project: {
        title: 1,
        poster: "$poster.url",
        responsivePosters: "$poster.responsive",
        reviewsCount: { $size: "$reviews" },
      },
    },
    {
      $sort: {
        reviewsCount: -1,
      },
    },
    {
      $limit: 5,
    },
  ];
};
