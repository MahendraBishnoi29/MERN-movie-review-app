const { check, validationResult } = require("express-validator");
const { isValidObjectId } = require("mongoose");
const genres = require("../utils/genres");

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

// Sign In Validator
exports.SignInValidator = [
  check("email").normalizeEmail().isEmail().withMessage("Wrong/Invalid Email!"),
  check("password").trim().not().isEmpty().withMessage("Password is missing!"),
];

// Actor Info Validator
exports.actorInfoValidator = [
  check("name").trim().not().isEmpty().withMessage("Actor Name Is Required!"),
  check("about").trim().not().isEmpty().withMessage("About Field is Required!"),
  check("gender").trim().not().isEmpty().withMessage("Gender is Required!"),
];

exports.validateMovie = [
  check("title").trim().not().isEmpty().withMessage("Movie title is missing!"),
  check("storyLine")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please Provide Movie storyLine!"),
  check("language")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please Provide Movie Language!"),
  check("releaseDate").isDate().withMessage("releaseDate is missing!"),
  check("status")
    .isIn(["public", "private"])
    .withMessage("Movie status must be Public or Private"),
  check("type").trim().not().isEmpty().withMessage("Movie type is missing!"),
  check("genres")
    .isArray()
    .withMessage("Genres must be an Array of Strings")
    .custom((value) => {
      for (let g of value) {
        if (!genres.includes(g)) throw Error("Invalid Genre!");
      }
      return true;
    }),
  check("tags")
    .isArray({ min: 1 })
    .withMessage("Tags must be an Array of String!")
    .custom((tags) => {
      for (let tag of tags) {
        if (typeof tag !== "string")
          throw Error("Tags must be an array of strings!");
      }
      return true;
    }),
  check("cast")
    .isArray()
    .withMessage("Cast must be an Array of Objects")
    .custom((cast) => {
      for (let c of cast) {
        if (!isValidObjectId(c.actor))
          throw Error("Invalid Cast id inside Cast!");
        if (!c.roleAs?.trim()) throw Error("Role As Field is Missing in Cast!");
        if (typeof c.leadActor !== "boolean")
          throw Error(
            "Only Boolean values are accepted for Lead actor inside cast!"
          );
        return true;
      }
    }),

  // check("poster").custom((_, { req }) => {
  //   if (!req.file) throw Error("Poster File is Missing!");
  //   return true;
  // }),
];

// Validate Trailer
exports.validateTrailer = check("trailer")
  .isObject()
  .withMessage("Trailer must be anb object with url and public_id")
  .custom(({ url, public_id }) => {
    try {
      const result = new URL(url);
      if (!result.protocol.includes("http"))
        throw Error("missing http in Trailer Url");

      const arr = url.split("/");
      const publicId = arr[arr.length - 1].split(".")[0];

      if (public_id !== publicId) throw Error("Trailer public id is invalid");
      return true;
    } catch (error) {
      throw Error("Trailer url is invalid");
    }
  });

// VALIDATE RATINGS
exports.validateRatings = check(
  "rating",
  "Rating Must be a Number between 0 to 10!"
).isFloat({ min: 0, max: 10 });

// For formatting Error Message for all Above 🛠🛠
exports.validate = (req, res, next) => {
  const error = validationResult(req).array();
  if (error.length) {
    return res.json({ error: error[0].msg });
  }
  next();
};
