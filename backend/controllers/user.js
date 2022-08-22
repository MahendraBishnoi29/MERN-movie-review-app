const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
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

  const newUser = new User({ name, email, password });

  try {
    await newUser.save();
  } catch (err) {
    res.json({ error: "Error Creating User!!" });
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
      user: process.env.MAIL_TRAP_USER,
      pass: process.env.MAIL_TRAP_PASS,
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

  res.status(201).json({
    message: "Signed Up Successfully 🎉",
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
  });
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
      user: process.env.MAIL_TRAP_USER,
      pass: process.env.MAIL_TRAP_PASS,
    },
  });

  transport.sendMail({
    from: "verify@movieapp.com",
    to: user.email,
    subject: "Welcome",
    html: `<h2>Welcome To MERN Movie Review App 🤗</h2>`,
  });

  const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      token: jwtToken,
      isVerified: user.isVerified,
      role: user.role,
    },
    message: "Your Email is Verified ✔",
  });
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
      message:
        "It's not an hour since you signed up, please request a new Token after 1 hour.",
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
      user: process.env.MAIL_TRAP_USER,
      pass: process.env.MAIL_TRAP_PASS,
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
      user: process.env.MAIL_TRAP_USER,
      pass: process.env.MAIL_TRAP_PASS,
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

// Reset Token Status
const sendResetPasswordTokenStatus = (req, res) => {
  res.json({ valid: true });
};

// Reset Password
const resetPassword = async (req, res) => {
  const { newPassword, userId } = req.body;

  const user = await User.findById(userId);

  const matched = await user.comparePassword(newPassword);
  if (matched)
    return res.json({
      error: "New password must be different from the old one",
    });
  user.password = newPassword;
  await user.save();

  await passwordResetModel.findByIdAndDelete(req.resetToken._id);

  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAIL_TRAP_USER,
      pass: process.env.MAIL_TRAP_PASS,
    },
  });

  transport.sendMail({
    from: "security@movieapp.com",
    to: user.email,
    subject: "Password Reset Successfull",
    html: `<h2> Password Reset Successful, You can Use Your New Password. </h2>
    `,
  });

  res.json({
    message: "Password Reset Successfully, You Can Use Your New Password",
  });
};

// Login Function
const LogIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ error: "No User Found With This Email!" });

  const matched = await user.comparePassword(password);
  if (!matched) return res.json({ error: "Email/Password is Wrong!" });

  const { _id, name, role, isVerified } = user;

  const jwtToken = jwt.sign({ userId: _id }, process.env.JWT_SECRET);

  res.json({
    user: { id: _id, name, email, role, token: jwtToken, isVerified },
  });
};

module.exports = {
  createUser,
  LogIn,
  verifyEmail,
  resendEmailVerificationToken,
  forgetPassword,
  sendResetPasswordTokenStatus,
  resetPassword,
};
