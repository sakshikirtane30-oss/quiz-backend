const express = require("express");
const router = express.Router();
const { getRooms,assignQuizToRoom  } = require("../controllers/roomController");

router.get("/:teacherId", getRooms);
router.post("/assign", assignQuizToRoom);

module.exports = router;
