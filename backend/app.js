const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the Welcome Page");
});

app.listen(8000, () => {
  console.log("Server is Running");
});
