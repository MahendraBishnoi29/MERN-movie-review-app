const { check, validationResult } = require("express-validator");

exports.Validator = [
  check("name").trim().not().isEmpty().withMessage("Name is missing!"),
  check("email").normalizeEmail().isEmail().withMessage("Email is Invalid!!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please Enter Your Password!")
    .isLength({ min: 6, max: 15 })
    .withMessage("Password must be 6 to 15 characters long!"),
];

exports.validateUser = (req, res, next) => {
  const error = validationResult(req).array();
  if (error.length) {
    return res.json({ error: error[0].msg });
  }
  next();
};
