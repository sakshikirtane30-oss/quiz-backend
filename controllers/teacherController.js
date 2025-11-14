const Teacher = require("../models/Teacher");
const Room = require("../models/Room");

const createTeacher = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await Teacher.findOne({ email });
    if (existing) return res.status(400).json({ message: "Teacher already exists" });

    const teacher = new Teacher({ name, email, password });
    await teacher.save();

    res.status(201).json({ message: "Teacher created successfully", teacher });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createRoom = async (req, res) => {
  try {
    const { title, teacherId } = req.body;
    console.log(req.body);
    

  
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const room = new Room({ title, teacher: teacherId, roomCode });
    await room.save();

    res.status(201).json({ message: "Room created successfully", room });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
    
  }
};


const selectTeacherRooms = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const rooms = await Room.find({ teacher: teacherId }).populate("questions");
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const loginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const teacher = await Teacher.findOne({ email });
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    if (teacher.password !== password)
      return res.status(400).json({ message: "Invalid password" });

  
    res.json({ message: "Login successful", teacher });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  createTeacher,
  createRoom,
  selectTeacherRooms,
  loginTeacher,
};
