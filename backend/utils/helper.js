const crypto = require("crypto");

// For Password Resetting
exports.generateRandomByte = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(30, (err, bufferData) => {
      if (err) reject(err);
      const bufferString = bufferData.toString("hex");

      console.log(bufferString);
      resolve(bufferString);
    });
  });
};

exports.handleNotFound = (req, res) => {
  res.status(404).json({ error: "No Routes Found" });
};
