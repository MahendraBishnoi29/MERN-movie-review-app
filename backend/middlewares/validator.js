const { check, validationResult } = require("express-validator");

// Validate Complete User With All Fields
exports.SignUpValidator = [
  check("name").trim().not().isEmpty().withMessage("Name is missing!"),
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing!")
    .isLength({ min: 6, max: 10 })
    .withMessage("Password must be 6 to 10 characters long!"),
];

// Validate Password Only
exports.validatePassword = [
  check("newPassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please Enter Your New Password!")
    .isLength({ min: 6, max: 15 })
    .withMessage("Password must be 6 to 15 characters long!"),
];

exports.SignInValidator = [
  check("email").normalizeEmail().isEmail().withMessage("Wrong/Invalid Email!"),
  check("password").trim().not().isEmpty().withMessage("Password is missing!"),
];

// For formating Error Message
exports.validate = (req, res, next) => {
  const error = validationResult(req).array();
  if (error.length) {
    return res.json({ error: error[0].msg });
  }
  next();
};
