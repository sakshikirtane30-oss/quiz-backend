const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/teachers", require("./routes/teacherRoutes"));
app.use("/api/rooms", require("./routes/roomRoutes"));
app.use("/api/questions", require("./routes/questionRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));


const connectDB = require("./config/db");
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
