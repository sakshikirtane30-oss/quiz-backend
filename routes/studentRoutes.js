const express = require("express");
const router = express.Router();
const {
  joinRoom,
  getQuestions,
  submitAnswers,
  getStudentById
} = require("../controllers/studentController");

router.post("/join-room", joinRoom);
router.get("/questions/:roomId", getQuestions);
router.post("/submit", submitAnswers);
router.get("/:id", getStudentById); 

module.exports = router;
