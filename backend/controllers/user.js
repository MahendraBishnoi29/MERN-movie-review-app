const User = require("../models/userModel");

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res
      .status(401)
      .json({ error: "A User With That Email Already Exist!!" });
  }
  const newUser = new User({ name, email, password });
  await newUser.save();
  res.status(201).json({ user: newUser });
};
