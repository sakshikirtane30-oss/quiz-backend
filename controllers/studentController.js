const Student = require("../models/Student");
const Room = require("../models/Room");
const Question = require("../models/Question");

const joinRoom = async (req, res) => {
  try {
    const { name, email, roomCode } = req.body;

    
    const room = await Room.findOne({ roomCode });
    if (!room) return res.status(404).json({ message: "Invalid Room Code" });

    
    const existingStudent = await Student.findOne({ email, room: room._id });
    if (existingStudent) {
      return res.status(400).json({
        message: "You have already joined this room.",
        student: existingStudent,
        roomId: room._id,
      });
    }

   
    const student = new Student({ name, email, room: room._id });
    await student.save();

    
    res.status(201).json({
      message: "Student joined room successfully",
      student,
      roomId: room._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getQuestions = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findById(roomId).populate("questions");
    res.json(room.questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const submitAnswers = async (req, res) => {
  try {
    const { studentId, answers } = req.body;
    console.log(req.body);

    let totalScore = 0;

    const evaluated = await Promise.all(
      answers.map(async (ans) => {
        const question = await Question.findById(ans.questionId);

        const correctAnswerText =
          isNaN(question.correctAnswer)
            ? question.correctAnswer 
            : question.options[Number(question.correctAnswer)];

        const isCorrect = correctAnswerText === ans.selectedOption;
        if (isCorrect) totalScore += 1;

        return {
          question: question._id,
          selectedOption: ans.selectedOption,
          isCorrect,
        };
      })
    );

    const student = await Student.findByIdAndUpdate(
      studentId,
      { answers: evaluated, score: totalScore },
      { new: true }
    );

    res.json({
      message: "Quiz submitted successfully",
      score: totalScore,
      student,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    
    const room = await Room.findById(student.room)
      .populate("questions");

    const totalQuestions = room?.questions?.length || 0;

    res.json({
      ...student.toObject(),
      totalQuestions,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { joinRoom, getQuestions, submitAnswers,getStudentById };
