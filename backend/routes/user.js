const express = require("express");
const router = express.Router();
const {
  createUser,
  verifyEmail,
  resendEmailVerificationToken,
} = require("../controllers/user");
const { Validator, validateUser } = require("../middlewares/validator");

router.post("/create", Validator, validateUser, createUser);
router.post("/verify-email", verifyEmail);
router.post("/resend-email-verifyToken", resendEmailVerificationToken);

module.exports = router;
