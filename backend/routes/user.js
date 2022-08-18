const express = require("express");
const router = express.Router();

const {
  createUser,
  verifyEmail,
  resendEmailVerificationToken,
  forgetPassword,
  sendResetPasswordTokenStatus,
  resetPassword,
  LogIn,
} = require("../controllers/user");
const isValidPassResetToken = require("../middlewares/user");
const {
  validatePassword,
  validate,
  SignUpValidator,
  SignInValidator,
} = require("../middlewares/validator");
const { IsAuth } = require("../middlewares/authMiddlware");

router.post("/sign-up", SignUpValidator, validate, createUser);
router.post("/sign-in", SignInValidator, validate, LogIn);
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

router.get("/is-auth", IsAuth, (req, res) => {
  const { user } = req;
  res.json({ user: { id: user._id, name: user.name, email: user.email } });
});

module.exports = router;
