const express = require("express");
const { uploadTrailer, createMovie } = require("../controllers/movie");
const router = express.Router();
const { IsAuth, isAdmin } = require("../middlewares/authMiddlware");
const { uploadVideo, uploadImage } = require("../middlewares/multer");

router.post(
  "/upload-trailer",
  IsAuth,
  isAdmin,
  uploadVideo.single("video"),
  uploadTrailer
);

router.post(
  "/create",
  IsAuth,
  isAdmin,
  uploadImage.single("poster"),
  createMovie
);

module.exports = router;
