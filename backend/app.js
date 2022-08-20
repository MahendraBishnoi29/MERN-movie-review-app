const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db");
const userRouter = require("./routes/user");
const actorRouter = require("./routes/actor");
const { handleNotFound } = require("./utils/helper");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/user", userRouter);
app.use("/api/actor", actorRouter);

app.use("/*", handleNotFound);

app.listen(8000, () => {
  console.log("Server is Running");
});
