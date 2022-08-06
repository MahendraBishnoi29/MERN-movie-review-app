const crypto = require("crypto");
const { resolve } = require("path");

const generateRandomByte = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(30, (err, bufferData) => {
      if (err) reject(err);

      const bufferString = bufferData.toString("hex");

      console.log(bufferString);
      resolve(bufferString);
    });
  });
};

module.exports = generateRandomByte;
