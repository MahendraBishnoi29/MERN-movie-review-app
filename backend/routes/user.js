const express = require("express");
const router = express.Router();
const {
  createUser,
  verifyEmail,
  resendEmailVerificationToken,
  forgetPassword,
} = require("../controllers/user");
const isValidPassResetToken = require("../middlewares/user");
const { Validator, validateUser } = require("../middlewares/validator");

router.post("/create", Validator, validateUser, createUser);
router.post("/verify-email", verifyEmail);
router.post("/resend-email-verifyToken", resendEmailVerificationToken);
router.post("/reset-password", forgetPassword);
router.post("/password-reset-token", isValidPassResetToken, (req, res) => {
  res.json({ valid: true });
});

module.exports = router;
