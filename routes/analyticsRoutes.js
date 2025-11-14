const express = require("express");
const router = express.Router();
const {
  getRoomAnalytics,
} = require("../controllers/analyticsController");

router.get("/:roomId", getRoomAnalytics);

module.exports = router;
