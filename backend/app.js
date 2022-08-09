const express = require("express");
require("dotenv").config();
require("./db");
const userRouter = require("./routes/user");

const app = express();
app.use(express.json());

app.use("/api/user", userRouter);

app.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "No User Found Please SignUp first" });
  }
  next();
});

app.listen(8000, () => {
  console.log("Server is Running");
});
