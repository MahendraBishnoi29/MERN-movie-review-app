const { getAppInfo, getMostRatedMovie } = require("../controllers/admin");
const { IsAuth, isAdmin } = require("../middlewares/authMiddlware");
const router = require("express").Router();

router.get("/app-info", IsAuth, isAdmin, getAppInfo);
router.get("/most-rated", IsAuth, isAdmin, getMostRatedMovie);

module.exports = router;
