const express = require("express");
const { uploadTrailer } = require("../controllers/movie");
const router = express.Router();
const { IsAuth, isAdmin } = require("../middlewares/authMiddlware");
const { uploadVideo } = require("../middlewares/multer");

router.post(
  "/upload-trailer",
  IsAuth,
  isAdmin,
  uploadVideo.single("video"),
  uploadTrailer
);

module.exports = router;
