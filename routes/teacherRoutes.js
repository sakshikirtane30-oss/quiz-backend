const express = require("express");
const router = express.Router();
const {
  createTeacher,
  createRoom,
  selectTeacherRooms,
  loginTeacher,
} = require("../controllers/teacherController");


router.post("/register", createTeacher);
router.post("/create-room", createRoom);
router.get("/rooms/:teacherId", selectTeacherRooms);
router.post("/login", loginTeacher);

module.exports = router;
