const cloudinary = require("../utils/cloud");

// UPLOAD TRAILER FUNCTION
const uploadTrailer = async (req, res) => {
  const { file } = req;

  if (!file) return res.json({ error: "Video file is missing!" });

  const { secure_url: url, public_id } = await cloudinary.v2.uploader.upload(
    file?.path,
    {
      resource_type: "video",
    }
  );

  res.status(201).json({ url, public_id });
};

module.exports = { uploadTrailer };
