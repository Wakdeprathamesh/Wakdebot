const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const prakritiRoutes = require("./routes/prakritiRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const herbRoutes = require("./routes/herbRoutes");
const chatRoutes = require("./routes/chatRoutes");

dotenv.config(); 
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/prakriti/", prakritiRoutes);
app.use("/api/dashboard/", dashboardRoutes);
app.use("/api/herbs", herbRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));