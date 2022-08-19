const { isValidObjectId } = require("mongoose");
const passwordResetModel = require("../models/passwordResetModel");

const isValidPassResetToken = async (req, res, next) => {
  const { token, userId } = req.body;

  if (!token?.trim() || !isValidObjectId(userId))
    return res.json({ error: "Invalid Request" });

  const resetToken = await passwordResetModel.findOne({ owner: userId });
  if (!resetToken)
    return res.json({ error: "Unauthorized access, invalid request!" });

  const matched = await resetToken.compareToken(token);
  if (!matched)
    return res.json({ error: "Token Not Matched, Invalid Request" });

  req.resetToken = resetToken;

  next();
};

module.exports = isValidPassResetToken;
