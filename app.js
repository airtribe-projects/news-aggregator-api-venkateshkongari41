const express = require("express");
const mongoose = require("mongoose");
const server = express();
require("dotenv").config();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const authRoute = require("./Routes/AuthRoute");
server.use("/auth", authRoute);

const port = process.env.PORT;
const DB_NAME = process.env.DB_NAME;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

mongoose
  .connect(DB_CONNECTION_STRING + DB_NAME)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

server.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = server;
