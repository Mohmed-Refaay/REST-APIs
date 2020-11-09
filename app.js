const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// routes
const feedRoutes = require("./routes/feed");

app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use((error, req, res, next) => {
  const status = error.statusCode;
  const message = error.message;
  res.status(status).json({ message });
});

app.use("/feed", feedRoutes);

mongoose
  .connect("mongodb+srv://refaay:mado4ever@cluster0.imc7b.mongodb.net/messages")
  .then(() => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
