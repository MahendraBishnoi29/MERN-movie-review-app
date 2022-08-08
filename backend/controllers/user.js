const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const mailVerifyTokenSchema = require("../models/mailVerifyTokenSchema");
const nodemailer = require("nodemailer");
const { isValidObjectId } = require("mongoose");
const passwordResetModel = require("../models/passwordResetModel");
const { generateRandomByte } = require("../utils/helper");

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

// Resend Verification Token for Email
const resendEmailVerificationToken = async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.json({ error: "User Not Found" });

  if (user.isVerified) return res.json({ info: "Email is Already Verified" });

  const alreadyHasToken = await mailVerifyTokenSchema.findOne({
    owner: userId,
  });
  if (alreadyHasToken)
    return res.json({
      info: "It's not an hour since you signed up, please request a new Token after 1 hour.",
    });

  let OTP = "";
  for (let i = 0; i <= 5; i++) {
    const randomVal = Math.round(Math.random() * 9);
    OTP += randomVal;
  }

  //Store OTP & Token inside our DB
  const newEmailVerifyToken = new mailVerifyTokenSchema({
    owner: user._id,
    token: OTP,
  });

  await newEmailVerifyToken.save();

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
    subject: "Email Verification",
    html: `<p>Your New OTP for Email verification</P>
       <h1>${OTP}</h1>
    `,
  });

  res.json({ message: "New OTP has been Sent to your Registered Email" });
};

// Password Reset Function
const forgetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.json({ error: "Email is Missing!" });

  const user = await User.findOne({ email });
  if (!user) return res.json({ error: "User Not Found" });

  const alreadyHasToken = await passwordResetModel.findOne({ owner: user._id });
  if (alreadyHasToken)
    return res.json({
      info: "It's not an hour since you signed up, please request a new Token after 1 hour.",
    });

  const token = await generateRandomByte();

  const passwordResetToken = await passwordResetModel({
    owner: user._id,
    token,
  });
  await passwordResetToken.save();

  const resetPasswordUrl = `http://localhost:3000/reset-password?token=${token}&id=${user._id}`;

  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7db3d4874b68dd",
      pass: "ce5e5966e5f191",
    },
  });

  transport.sendMail({
    from: "security@movieapp.com",
    to: user.email,
    subject: "Forgot Password",
    html: `<p>Reset You Password By Clicking on The Link Below</P>
       <a href='${resetPasswordUrl}' >Click Here</a>
    `,
  });

  res.json({
    message: "Link for Resetting Password has been sent to Your Email ;)",
  });
};

module.exports = {
  createUser,
  verifyEmail,
  resendEmailVerificationToken,
  forgetPassword,
};
