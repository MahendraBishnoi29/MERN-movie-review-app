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

  // uploading poster
  const {
    public_id,
    secure_url: url,
    responsive_breakpoints,
  } = await cloudinary.v2.uploader.upload(file?.path, {
    transformation: { width: 1280, height: 1280 },
    responsive_breakpoints: {
      create_derived: true,
      max_width: 640,
      max_images: 3,
    },
  });

  const finalPoster = { url, public_id, responsive: [] };
  const { breakpoints } = responsive_breakpoints[0];

  if (breakpoints.length) {
    for (let imgObject of breakpoints) {
      const { secure_url: url } = imgObject;
      finalPoster.responsive.push(url);
    }
  }

  newMovie.poster = finalPoster;
  await newMovie.save();
  res.status(201).json({ id: newMovie._id, title });
};

module.exports = { uploadTrailer, createMovie };
