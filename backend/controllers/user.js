const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const mailVerifyTokenSchema = require("../models/mailVerifyTokenSchema");
const nodemailer = require("nodemailer");

// Register User
const createUser = async (req, res) => {
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

  // Generate 6 digit OTP
  let OTP = "";
  for (let i = 0; i <= 5; i++) {
    const randomVal = Math.round(Math.random() * 9);
    OTP += randomVal;
  }

  //Store OTP inside our DB
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
    from: "verification@movieapp.com",
    to: newUser.email,
    subject: "Email Verification",
    html: `<p>Your OTP for Email verification</P>
       <h1>${OTP}</h1>
    `,
  });

  res.status(201).json({ user: "OTP has sent to your mail" });
};

// Login User

module.exports = { createUser };
