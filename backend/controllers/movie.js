const cloudinary = require("../utils/cloud");

const uploadTrailer = async (req, res) => {
  const { file } = req;

  if (!file) return res.json({ error: "Video file is missing!" });

  const trailer = await cloudinary.v2.uploader.upload(file?.path, {
    resource_type: "video",
  });

  res.json(trailer);
};

module.exports = { uploadTrailer };
