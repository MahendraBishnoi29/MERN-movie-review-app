const express = require("express");
require("./db");
const userRouter = require("./routes/user");

const app = express();
app.use(express.json());
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Welcome Page");
});

app.listen(8000, () => {
  console.log("Server is Running");
});
