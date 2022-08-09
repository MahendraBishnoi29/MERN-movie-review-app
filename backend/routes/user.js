const express = require("express");
const router = express.Router();
const {
  createUser,
  verifyEmail,
  resendEmailVerificationToken,
  forgetPassword,
  sendResetPasswordTokenStatus,
  resetPassword,
} = require("../controllers/user");
const isValidPassResetToken = require("../middlewares/user");
const {
  Validator,
  validatePassword,
  validate,
} = require("../middlewares/validator");

router.post("/create", Validator, validate, createUser);
router.post("/verify-email", verifyEmail);
router.post("/resend-email-verifyToken", resendEmailVerificationToken);
router.post("/forget-password", forgetPassword);
router.post(
  "/verify-password-reset-token",
  isValidPassResetToken,
  sendResetPasswordTokenStatus
);
router.post(
  "/reset-password",
  validatePassword,
  validate,
  isValidPassResetToken,
  resetPassword
);

module.exports = router;
