const Room = require("../models/Room");
const Question = require("../models/Question");

const getRooms = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const rooms = await Room.find({ teacher: teacherId }).populate("questions");

    res.json({ rooms }); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const assignQuizToRoom = async (req, res) => {
  try {
    const { roomCode, quizTitle } = req.body;

    if (!roomCode || !quizTitle) {
      return res.status(400).json({ message: "Room code and quiz title are required" });
    }

    const room = await Room.findOne({ roomCode });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    room.quizTitle = quizTitle; 
    await room.save();

    res.status(200).json({ message: "Quiz assigned successfully", room });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = { getRooms,assignQuizToRoom };
