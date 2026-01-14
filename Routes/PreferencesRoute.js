const express = require("express");
const {
  getPreferences,
  updatePreferences,
} = require("../Controllers/PreferencesController");
const authmiddleware = require("../Middleware/AuthMiddleware");
const router = express.Router();

router.get("/preferences", authmiddleware, getPreferences);
router.put("/preferences", authmiddleware, updatePreferences);

module.exports = router;
