const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

async function register(req, resp) {
  const { username, password, preferences } = req.body;
  if (username === "" || password === "") {
    resp.status(400).json({ message: "Username and password are required" });
    return;
  }
  const userObject = new UserModel({
    username: username,
    password: bcrypt.hashSync(password, 10),
    preferences: preferences || {},
    dateTimeCreated: new Date(),
  });

  try {
    const response = await userObject.save();
    resp.status(201).json({
      message: "User registered successfully",
      userId: response._id,
    });
  } catch (error) {
    resp.status(500).json({
      message: "Error registering user",
      error,
    });
  }
}

async function login(req, resp) {
  const { username, password } = req.body;
  if (username === "" || password === "") {
    resp.status(400).json({ message: "Username and password are required" });
    return;
  }

  try {
    const user = await UserModel.findOne({ username: username });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      resp.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    resp.status(200).json({ message: "Login successful", token });
  } catch (error) {
    resp.status(500).json({ message: "Error during login", error });
  }
}

module.exports = { register, login };
