require("dotenv").config();
require("./config/db");
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "https://daring-love-production-d190.up.railway.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.options("*", cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const managerRoutes = require("./routes/managerRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/manager", managerRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
    res.send("Employee Leave Management API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});