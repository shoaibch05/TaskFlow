import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  columns: {
    type: [String], // Example: ["To Do", "In Progress", "Done"]
    default: ["To Do", "In Progress", "Done"],
  },
  color: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Boards = mongoose.model("Board", BoardSchema);
export default Boards;
