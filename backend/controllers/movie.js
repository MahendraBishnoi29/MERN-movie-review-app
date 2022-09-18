const cloudinary = require("../utils/cloud");
const Movie = require("../models/movie");
const { isValidObjectId } = require("mongoose");
const movie = require("../models/movie");

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

  // uploading Poster
  if (file) {
    const {
      public_id,
      secure_url: url,
      responsive_breakpoints,
    } = await cloudinary.v2.uploader.upload(file?.path, {
      transformation: { width: 1280, height: 720 },
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
  }

  await newMovie.save();
  res.status(201).json({ id: newMovie._id, title });
};

// UPDATE MOVIE WITHOUT POSTER FUNCTION
const updateMovieWithoutPoster = async (req, res) => {
  const { movieId } = req.params;
  if (!isValidObjectId(movieId)) return res.json({ error: "Invalid Movie Id" });

  const movie = await Movie.findById(movieId);
  if (!movie) return res.status(404).json({ error: "Movie Not Found" });

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
  } = req.body;

  movie.title = title;
  movie.storyLine = storyLine;
  movie.tags = tags;
  movie.releaseDate = releaseDate;
  movie.status = status;
  movie.type = type;
  movie.genres = genres;
  movie.cast = cast;
  movie.trailer = trailer;
  movie.language = language;

  if (director) {
    if (!isValidObjectId(director))
      return res.json({ error: "Invalid Director Id" });
    movie.director = director;
  }

  if (writers) {
    for (let w of writers) {
      if (!isValidObjectId(w)) return res.json({ error: "Invalid Writer Id" });
    }
    movie.writers = writers;
  }

  await movie.save();

  res.json({ message: "Movie is Updated", movie });
};

// UPDATE MOVIE WITH POSTER FUNCTION
const updateMovieWithPoster = async (req, res) => {
  const { movieId } = req.params;
  if (!isValidObjectId(movieId)) return res.json({ error: "Invalid Movie Id" });

  if (!req.file) return req.json({ error: "Movie poster is Missing" });

  const movie = await Movie.findById(movieId);
  if (!movie) return res.status(404).json({ error: "Movie Not Found" });

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
  } = req.body;

  movie.title = title;
  movie.storyLine = storyLine;
  movie.tags = tags;
  movie.releaseDate = releaseDate;
  movie.status = status;
  movie.type = type;
  movie.genres = genres;
  movie.cast = cast;
  movie.trailer = trailer;
  movie.language = language;

  if (director) {
    if (!isValidObjectId(director))
      return res.json({ error: "Invalid Director Id" });
    movie.director = director;
  }

  if (writers) {
    for (let w of writers) {
      if (!isValidObjectId(w)) return res.json({ error: "Invalid Writer Id" });
    }
    movie.writers = writers;
  }

  //Update poster
  const posterId = movie.poster?.public_id;
  if (posterId) {
    const { result } = await cloudinary.v2.uploader.destroy(posterId);
    if (result !== "ok") {
      res.json({ error: "Could not Update Poster" });
    }
  }

  // uploading poster
  const {
    secure_url: url,
    public_id,
    responsive_breakpoints,
  } = await cloudinary.v2.uploader.upload(req.file?.path, {
    transformation: { width: 1280, height: 720 },
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

  movie.poster = finalPoster;

  await movie.save();

  res.json({ message: "Movie is Updated", movie });
};

// DELETE MOVIE FUNCTION
const deleteMovie = async (req, res) => {
  const { movieId } = req.params;
  if (!isValidObjectId(movieId)) return res.json({ error: "Invalid Movie Id" });

  const movie = await Movie.findById(movieId);
  if (!movie) return res.status(404).json({ error: "Movie Not Found" });

  // Check if there is a poster & remove that
  const posterId = movie.poster?.public_id;

  if (posterId) {
    const { result } = await cloudinary.v2.uploader.destroy(posterId);
    if (result !== "ok") {
      return res.json({ error: "could not remove poster from Cloudinary" });
    }
  }

  // Removing Trailer
  const trailerId = movie.trailer?.public_id;
  if (!trailerId) return res.json({ error: "could not Find & Delete Trailer" });

  const { result } = await cloudinary.v2.uploader.destroy(trailerId, {
    resource_type: "video",
  });

  if (result !== "ok")
    return res.json({ error: "could not remove Trailer from Cloudinary" });

  await Movie.findByIdAndDelete(movieId);

  res.json({ message: "Movie Deleted Successfully" });
};

// GET MOVIES
const getMovies = async (req, res) => {
  const { pageNo = 0, limit = 10 } = req.query;

  const movies = await Movie.find({})
    .sort({ createdAt: -1 })
    .skip(parseInt(pageNo) * parseInt(limit))
    .limit(parseInt(limit));

  const results = movies.map((movie) => ({
    id: movie._id,
    title: movie.title,
    poster: movie.poster?.url,
    genres: movie.genres,
    status: movie.status,
  }));

  res.json({ movies: results });
};

// Update Movie
const getMovieForUpdate = async (req, res) => {
  const { movieId } = req.params;
  if (!isValidObjectId(movieId))
    return res.json({ error: "Movie Id is Invalid!" });

  const movie = await Movie.findById(movieId).populate(
    "director writers cast.actor"
  );

  res.json({ movie });
};

module.exports = {
  uploadTrailer,
  createMovie,
  updateMovieWithoutPoster,
  updateMovieWithPoster,
  deleteMovie,
  getMovies,
  getMovieForUpdate,
};
