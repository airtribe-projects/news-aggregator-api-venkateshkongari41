const { get } = require("mongoose");

async function getNews(req, resp) {
  const userId = req.user?.userId;

  if (!userId) {
    resp.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const UserModel = require("../Models/UserModel");
    const user = await UserModel.findById(userId);
    if (!user) {
      resp.status(404).json({ message: "User not found" });
      return;
    }
    const preferences = user.preferences || {};

    const NEWS_API_KEY = process.env.NEWS_API_KEY;
    const NEWS_BASE_URL = process.env.NEWS_BASE_URL;

    let category = preferences.categories;
    const axios = require("axios");
    const response = await axios.get(`${NEWS_BASE_URL}/top-headlines`, {
      params: {
        category: category || "",
        apiKey: NEWS_API_KEY,
      },
    });
    resp.status(200).json({ articles: response.data.articles });
  } catch (error) {
    resp.status(500).json({ message: "Error fetching news", error });
  }
}
module.exports = { getNews };
