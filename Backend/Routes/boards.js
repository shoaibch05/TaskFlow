import express from "express";
import Boards from "../Models/Boards.js";
import { authMiddleware } from "../Middleware/authmiddleware.js";

const router = express.Router();

// Create new board
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const board = new Boards({ ...req.body, user: req.user.id });
    await board.save();
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get all boards for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const boards = await Boards.find({ user: req.user.id });
    res.json(boards);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
// Add a column to a board
router.put("/:boardId/columns", authMiddleware, async (req, res) => {
  try {
    const { column } = req.body;
    if (!column)
      return res.status(400).json({ msg: "Column name is required" });

    const board = await Boards.findById(req.params.boardId);
    if (!board) return res.status(404).json({ msg: "Board not found" });

    board.columns.push(column);
    await board.save();

    res.json({ msg: "Column added", board });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
router.delete("/:boardId", authMiddleware, async (req, res) => {
  try {
    const { boardId } = req.params;
    // ensure user owns this board
    const deleted = await Boards.findOneAndDelete({
      _id: boardId,
      user: req.user.id,
    });
    if (!deleted) {
      return res.status(404).json({ msg: "Board not found or not yours" });
    }
    res.json({ msg: "Board deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;
