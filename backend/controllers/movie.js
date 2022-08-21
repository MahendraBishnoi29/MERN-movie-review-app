const cloudinary = require("../utils/cloud");
const Movie = require("../models/movie");
const { isValidObjectId } = require("mongoose");

// UPLOAD TRAILER FUNCTION
const uploadTrailer = async (req, res) => {
  const { file } = req;

  if (!file) return res.json({ error: "Video file is missing!" });

  const { secure_url: url, public_id } = await cloudinary.v2.uploader.upload(
    file?.path,
    {
      resource_type: "video",
    }
  );

  res.status(201).json({ url, public_id });
};

// CREATE MOVIE FUNCTION
const createMovie = async (req, res) => {
  const { file, body } = req;

  const {
    title,
    storyLine,
    director,
    releaseDate,
    status,
    type,
    genres,
    tags,
    cast,
    writers,
    poster,
    trailer,
    language,
  } = body;

  const newMovie = new Movie({
    title,
    storyLine,
    releaseDate,
    status,
    type,
    genres,
    tags,
    cast,
    trailer,
    language,
  });

  if (director) {
    if (!isValidObjectId(director))
      return res.json({ error: "Invalid Director Id" });
    newMovie.director = director;
  }

  if (writers) {
    for (let w of writers) {
      if (!isValidObjectId(w)) return res.json({ error: "Invalid Writer Id" });
    }
    newMovie.writers = writers;
  }
};

module.exports = { uploadTrailer, createMovie };
