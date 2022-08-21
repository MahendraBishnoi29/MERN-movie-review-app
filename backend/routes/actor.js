const express = require("express");
const router = express.Router();
const {
  createActor,
  updateActor,
  deleteActor,
  searchActor,
  getLatestActor,
  getSingleActor,
} = require("../controllers/actor");
const { uploadImage } = require("../middlewares/multer");
const { actorInfoValidator, validate } = require("../middlewares/validator");

router.post(
  "/create",
  uploadImage.single("avatar"),
  actorInfoValidator,
  validate,
  createActor
);

router.post(
  "/update/:actorId",
  uploadImage.single("avatar"),
  actorInfoValidator,
  validate,
  updateActor
);

router.delete("/:actorId", deleteActor);
router.get("/search", searchActor);
router.get("/latest-uploads", getLatestActor);
router.get("/single/:id", getSingleActor);

module.exports = router;
