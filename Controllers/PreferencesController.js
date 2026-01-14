const UserModel = require("../Models/UserModel");

async function getPreferences(req, resp) {
  const userId = req.user?.userId;
  if (!userId) {
    resp.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      resp.status(404).json({ message: "User not found" });
      return;
    }
    resp.status(200).json({ preferences: user.preferences });
  } catch (error) {
    resp.status(500).json({ message: "Error fetching preferences", error });
  }
}

async function updatePreferences(req, resp) {
  const userId = req.user?.userId;
  const newPreferences = req.body.preferences;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      resp.status(404).json({ message: "User not found" });
      return;
    }
    user.preferences = newPreferences;
    await user.save();
    resp.status(200).json({ message: "Preferences updated successfully" });
  } catch (error) {
    resp.status(500).json({ message: "Error updating preferences", error });
  }
}

module.exports = { getPreferences, updatePreferences };
