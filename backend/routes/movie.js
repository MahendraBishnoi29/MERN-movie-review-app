const express = require("express");
const {
  uploadTrailer,
  createMovie,
  deleteMovie,
  getMovies,
  getMovieForUpdate,
  updateMovie,
  searchMovie,
  getSingleMovie,
  getLatestUploads,
  getRelatedMovies,
  getTopRatedMovies,
  searchPublicMovies,
} = require("../controllers/movie");
const router = express.Router();
const { IsAuth, isAdmin } = require("../middlewares/authMiddlware");
const { parseData } = require("../middlewares/helper");
const { uploadVideo, uploadImage } = require("../middlewares/multer");
const {
  validateMovie,
  validate,
  validateTrailer,
} = require("../middlewares/validator");

router.post(
  "/upload-trailer",
  IsAuth,
  isAdmin,
  uploadVideo.single("video"),
  uploadTrailer
);

router.post(
  "/upload",
  IsAuth,
  isAdmin,
  uploadImage.single("poster"),
  parseData,
  validateMovie,
  validateTrailer,
  validate,
  createMovie
);

// router.patch(
//   "/update-movie-without-poster/:movieId",
//   IsAuth,
//   isAdmin,
//   // parseData,
//   validateMovie,
//   validate,
//   updateMovieWithoutPoster
// );

router.patch(
  "/update-movie/:movieId",
  IsAuth,
  isAdmin,
  uploadImage.single("poster"),
  parseData,
  validateMovie,
  validate,
  updateMovie
);

router.delete("/delete-movie/:movieId", IsAuth, isAdmin, deleteMovie);
router.get("/movies", IsAuth, isAdmin, getMovies);
router.get("/update/:movieId", IsAuth, isAdmin, getMovieForUpdate);
router.get("/search", IsAuth, isAdmin, searchMovie);

// For Normal Users
router.get("/latest-uploads", getLatestUploads);
router.get("/single/:movieId", getSingleMovie);
router.get("/related/:movieId", getRelatedMovies);
router.get("/top-rated", getTopRatedMovies);
router.get("/public-search", searchPublicMovies);

module.exports = router;
