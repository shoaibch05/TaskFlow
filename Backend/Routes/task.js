import express from "express";
import Task from "../Models/task.js";
import { authMiddleware } from "../Middleware/authmiddleware.js";

const router = express.Router();

// Create task
router.post("/", authMiddleware, async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get tasks by board
router.get("/:boardId", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ board: req.params.boardId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
// Delete task
router.delete("/:taskId", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.taskId);
    if (!task) return res.status(404).json({ msg: "Task not found" });
    res.json({ msg: "Task deleted successfully", taskId: req.params.taskId });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
// routes/tasks.js
router.patch("/:id/status", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
// Update Task
router.put("/:taskId", authMiddleware, async (req, res) => {
  try {
    const { taskId } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
      new: true,
    });
    if (!updatedTask) return res.status(404).json({ msg: "Task not found" });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;
