require("dotenv").config();
const jwt = require("jsonwebtoken");

function authmiddleware(req, resp, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return resp.status(401).json({ message: "Access token missing" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return resp.status(403).json({ message: "Invalid access token" });
    }
    req.user = user;
    next();
  });
}

module.exports = authmiddleware;
