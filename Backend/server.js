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

// ✅ CORS: explicitly allow your frontend
app.use(
  cors({
    origin: "https://task-flow-civc.vercel.app",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Handle preflight
app.options(
  "*",
  cors({
    origin: "https://task-flow-civc.vercel.app",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/boards", boardRoutes);
// app.use("/api/tasks", taskRoutes);
// app.use("/api/team", teamRoutes);
app.get("/test", (req, res) => res.send("OK"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
