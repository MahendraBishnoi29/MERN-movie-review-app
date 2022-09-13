const express = require("express");
const router = express.Router();
const {
  createActor,
  updateActor,
  deleteActor,
  searchActor,
  getLatestActor,
  getSingleActor,
  getActors,
} = require("../controllers/actor");
const { isAdmin, IsAuth } = require("../middlewares/authMiddlware");
const { uploadImage } = require("../middlewares/multer");
const { actorInfoValidator, validate } = require("../middlewares/validator");

router.post(
  "/create",
  IsAuth,
  isAdmin,
  uploadImage.single("avatar"),
  actorInfoValidator,
  validate,
  createActor
);

router.post(
  "/update/:actorId",
  IsAuth,
  isAdmin,
  uploadImage.single("avatar"),
  actorInfoValidator,
  validate,
  updateActor
);

router.delete("/delete/:actorId", IsAuth, isAdmin, deleteActor);
router.get("/search", IsAuth, isAdmin, searchActor);
router.get("/latest-uploads", IsAuth, isAdmin, getLatestActor);
router.get("/actors", IsAuth, isAdmin, getActors);
router.get("/single/:id", getSingleActor);

module.exports = router;
