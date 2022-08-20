const multer = require("multer");
const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image")) {
    cb("Only Image Files Are Supported", false);
  }
  cb(null, true);
};

exports.uploadImage = multer({ storage, fileFilter });
