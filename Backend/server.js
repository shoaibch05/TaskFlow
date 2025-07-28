import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./Routes/auth.js";
import boardRoutes from "./Routes/boards.js";
import taskRoutes from "./Routes/task.js";
import teamRoutes from "./Routes/team.js";

dotenv.config();

const app = express();
app.use(express.json());

// Allowed frontend origins (add more if needed)
const allowedOrigins = [
  "https://task-flow-civc.vercel.app", // Production frontend (Vercel)
  "http://localhost:5173", // Local frontend (Vite)
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/team", teamRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
