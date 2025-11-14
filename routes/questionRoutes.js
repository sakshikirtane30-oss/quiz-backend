const express = require("express");
const router = express.Router();
const { createQuestion, getRoomQuestions } = require("../controllers/questionController");

router.post("/", createQuestion);
router.get("/:roomId", getRoomQuestions);

module.exports = router;
