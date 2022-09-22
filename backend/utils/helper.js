const crypto = require("crypto");
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

// Aggregation
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
        id: { $ne: movieId },
      },
    },
    {
      $project: {
        title: 1,
        poster: "$poster.url",
      },
    },
    {
      $limit: 5,
    },
  ];
};
