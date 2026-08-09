const express = require("express");
const connectDB = require("./databse/db");
const app = express();
const cors = require('cors')
app.use(cors())
app.use(express.json())
const chatRoute = require("./routes/Chat")
const pledgeRoute = require("./routes/Pledge")
const quizRoute = require("./routes/Score")
const authRoute = require("./routes/auth.route")
const ecochatRoute = require("./routes/ecochatbot")
app.use("/api/chat",chatRoute)
app.use("/api/pledge",pledgeRoute)
app.use("/api/quizscore",quizRoute)
app.use("/api/auth",authRoute)
app.use("/api/ecoChatBot",ecochatRoute)
module.exports = app;