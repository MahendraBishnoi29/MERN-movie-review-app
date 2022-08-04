const express = require("express");
const router = express.Router();
const { createUser, verifyEmail } = require("../controllers/user");
const { Validator, validateUser } = require("../middlewares/validator");

router.post("/create", Validator, validateUser, createUser);
router.post("/verify-email", verifyEmail);

module.exports = router;
