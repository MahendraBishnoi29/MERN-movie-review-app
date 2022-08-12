const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db");
const userRouter = require("./routes/user");
const { handleNotFound } = require("./utils/helper");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/user", userRouter);

app.use("/*", handleNotFound);

// app.post("/login", (req, res, next) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res
//       .status(400)
//       .json({ message: "No User Found Please SignUp first" });
//   }
//   next();
// });

app.listen(8000, () => {
  console.log("Server is Running");
});
