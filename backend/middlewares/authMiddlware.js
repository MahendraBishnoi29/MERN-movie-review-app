const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.IsAuth = async (req, res, next) => {
  const token = req.headers?.authorization;
  if (!token) return res.json({ error: "Invalid Token" });

  const jwtToken = token?.split("Bearer ")[1];

  if (!jwtToken) return res.json({ error: "invalid Token" });

  const jwtRes = jwt.verify(jwtToken, process.env.JWT_SECRET);
  const { userId } = jwtRes;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: "User Not Found" });

  req.user = user;
  next();
};

// Admin
exports.isAdmin = (req, res, next) => {
  const { user } = req;

  if (user.role !== "admin")
    return res.json("Unauthorized Access, only Admins can Access this Route!");

  next();
};
