const express = require("express");

const authmiddleware = require("../Middleware/AuthMiddleware");
const { getNews } = require("../Controllers/NewsController");
const router = express.Router();

router.get("/get-news", authmiddleware, getNews);

module.exports = router;
