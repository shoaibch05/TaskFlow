import express from "express";
import User from "../Models/User.js";
import BoardMember from "../Models/BoardMember.js";
import Board from "../Models/Boards.js"; // Make sure to import Board model

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const members = await BoardMember.find({})
      .populate("userId", "name email")
      .populate("boardId", "title");
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Invite user to a board (Fixed Version)
router.post("/invite", async (req, res) => {
  const { boardId, email } = req.body;

  try {
    // 1. Validate required fields
    if (!boardId || !email) {
      return res.status(400).json({
        msg: "Both boardId and email are required",
      });
    }

    // 2. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        msg: `${email} is not registered. Please sign up first.`,
        requiresSignup: true,
      });
    }

    // 3. Check for existing membership IN THIS SPECIFIC BOARD
    const existingMembership = await BoardMember.findOne({
      boardId,
      userId: user._id,
    });

    if (existingMembership) {
      const board = await Board.findById(boardId).select("title");
      return res.status(400).json({
        msg: `User is already a member of "${board?.title || "this board"}"`,
        existingBoard: board?.title,
        isDuplicate: true,
      });
    }

    // 4. Create new membership
    const newMember = new BoardMember({
      boardId,
      userId: user._id,
      joinedAt: new Date(),
    });

    await newMember.save();

    res.json({
      success: true,
      msg: `Successfully added to ${(await Board.findById(boardId)).title}`,
      member: {
        id: newMember._id,
        userId: user._id,
        boardId,
      },
    });
  } catch (err) {
    console.error("Invitation error:", err);
    res.status(500).json({
      msg: "Failed to process invitation",
      error: err.message,
    });
  }
});

// ... (keep other existing routes)

// Fetch board members
router.get("/:userId", async (req, res) => {
  try {
    const members = await BoardMember.find({
      userId: req.params.userId,
    }).populate("boardId", "title _id");
    res.json(
      members.map((m) => ({
        boardId: m.boardId._id,
        boardTitle: m.boardId.title,
        role: m.role,
      }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Get all unique users across all boards
// Get all unique users with their board memberships

export default router;
