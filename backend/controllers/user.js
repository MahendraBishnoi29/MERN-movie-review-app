const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const mailVerifyTokenSchema = require("../models/mailVerifyTokenSchema");
const nodemailer = require("nodemailer");
const { isValidObjectId } = require("mongoose");

// Register User Function
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(401)
      .json({ error: "A User With That Email Already Exist!!" });
  }

  // Hash Password
  const hashedPassword = bcrypt.hashSync(password);
  const newUser = new User({ name, email, password: hashedPassword });

  try {
    await newUser.save();
  } catch (err) {
    console.log("error creating user", err.message);
  }

  // Generate 6 digit OTP
  let OTP = "";
  for (let i = 0; i <= 5; i++) {
    const randomVal = Math.round(Math.random() * 9);
    OTP += randomVal;
  }

  //Store OTP & Token inside our DB
  const newEmailVerifyToken = new mailVerifyTokenSchema({
    owner: newUser._id,
    token: OTP,
  });

  await newEmailVerifyToken.save();

  // Send OTP to Email Account
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7db3d4874b68dd",
      pass: "ce5e5966e5f191",
    },
  });

  transport.sendMail({
    from: "verify@movieapp.com",
    to: newUser.email,
    subject: "Email Verification",
    html: `<p>Your OTP for Email verification</P>
       <h1>${OTP}</h1>
    `,
  });

  res.status(201).json({ user: "User is Created & OTP has sent to mail" });
};

// Function For Verifying Email & UserID Token
const verifyEmail = async (req, res) => {
  const { userId, OTP } = req.body;
  if (!isValidObjectId(userId)) return res.json({ error: "Invalid User ID" });

  const user = await User.findById(userId);
  if (!user) return res.json({ error: "User Not Found!" });
  if (user.isVerified) return res.json({ error: "User is Already Verified!" });

  const token = await mailVerifyTokenSchema.findOne({ owner: userId });
  if (!token) return res.json({ error: "Token Not Found!" });

  const isMatched = await token.compareToken(OTP);
  if (!isMatched) return res.json({ error: "Please Enter a Valid OTP!" });

  user.isVerified = true;
  await user.save();

  await mailVerifyTokenSchema.findByIdAndDelete(token._id);

  const newEmailVerifyToken = new mailVerifyTokenSchema({
    owner: user._id,
    token: OTP,
  });

  await newEmailVerifyToken.save();

  // Send OTP to Email Account
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7db3d4874b68dd",
      pass: "ce5e5966e5f191",
    },
  });

  transport.sendMail({
    from: "verify@movieapp.com",
    to: user.email,
    subject: "Welcome",
    html: `<h2>Welcome To MERN Movie Review App 🤗</h2>`,
  });

  res.json({ message: "Your Email is Verified " });
};

// Login User Function

module.exports = { createUser, verifyEmail };
