const { getAppInfo } = require("../middlewares/admin");
const { IsAuth, isAdmin } = require("../middlewares/authMiddlware");
const router = require("express").Router();

router.get("/app-info", IsAuth, isAdmin, getAppInfo);

module.exports = router;
