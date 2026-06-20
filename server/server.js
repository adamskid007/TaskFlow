const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const connectDB = require("./config/db");

dotenv.config();

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes)
app.get("/", (req,res) => {
    res.send("Taskflow API running...");
});
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API is working",
  });
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
});