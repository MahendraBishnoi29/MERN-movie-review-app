const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/user");
const { Validator, validateUser } = require("../middlewares/validator");

router.post("/create", Validator, validateUser, createUser);

module.exports = router;
