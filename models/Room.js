const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  title: { type: String, required: true },
  roomCode: { type: String, required: true, unique: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  quizTitle: { type: String },
});

module.exports = mongoose.model("Room", roomSchema);
