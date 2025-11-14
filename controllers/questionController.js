const Question = require("../models/Question");
const Room = require("../models/Room");

const createQuestion = async (req, res) => {
  try {
    const { questionText, options, correctAnswer, roomId } = req.body;
    console.log(req.body);
    

    if (!roomId) {
      return res.status(400).json({ message: "Room ID is required" });
    }

    const question = new Question({
      questionText,
      options,
      correctAnswer,
      room: roomId,
    });

    await question.save();

    // console.log(question);
    
    await Room.findByIdAndUpdate(roomId, { $push: { questions: question._id } });

    res.status(201).json({ message: "Question added successfully", question });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getRoomQuestions = async (req, res) => {
  try {
    const { roomId } = req.params;
    const questions = await Question.find({ room: roomId });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createQuestion, getRoomQuestions };
