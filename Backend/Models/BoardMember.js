import mongoose from "mongoose";

const BoardMemberSchema = new mongoose.Schema({
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  role: { type: String, default: "member" }, // member / admin
  joinedAt: { type: Date, default: Date.now },
});

export default mongoose.model("BoardMember", BoardMemberSchema);
