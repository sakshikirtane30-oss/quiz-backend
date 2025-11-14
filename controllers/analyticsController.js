const Student = require("../models/Student");
const Room = require("../models/Room");
const Question = require("../models/Question");

const getRoomAnalytics = async (req, res) => {
  try {
    const { roomId } = req.params;

    const students = await Student.find({ room: roomId }).populate("answers.question");

    if (students.length === 0) {
      return res.status(404).json({ message: "No students found for this room" });
    }

    const scores = students.map((s) => s.score);
    const highest = Math.max(...scores);
    const lowest = Math.min(...scores);
    const average = scores.reduce((a, b) => a + b, 0) / scores.length;

    const allQuestions = await Question.find({ room: roomId });
    const questionStats = allQuestions.map((q) => {
      const totalAttempts = students.length;
      const correctCount = students.filter((s) =>
        s.answers.some((a) => a.question._id.equals(q._id) && a.isCorrect)
      ).length;

      return {
        questionText: q.questionText,
        totalAttempts,
        correctCount,
        accuracy:
          totalAttempts === 0 ? 0 : ((correctCount / totalAttempts) * 100).toFixed(1),
      };
    });

    res.json({
      totalStudents: students.length,
      highest,
      lowest,
      average: average.toFixed(2),
      questionStats,
      students: students.map((s) => ({
        name: s.name,
        email: s.email,
        score: s.score,
      })),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getRoomAnalytics };
