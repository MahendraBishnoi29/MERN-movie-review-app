const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(401)
      .json({ error: "A User With That Email Already Exist!!" });
  }

  const hashedPassword = bcrypt.hashSync(password);
  const newUser = new User({ name, email, password: hashedPassword });
  try {
    await newUser.save();
  } catch (err) {
    console.log("error creating user", err.message);
  }
  res.status(201).json({ user: newUser });
};
