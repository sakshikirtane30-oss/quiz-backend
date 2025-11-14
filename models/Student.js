const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  score: { type: Number, default: 0 },
  answers: [
    {
      question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
      selectedOption: String,
      isCorrect: Boolean,
    },
  ],
});

module.exports = mongoose.model("Student", studentSchema);
