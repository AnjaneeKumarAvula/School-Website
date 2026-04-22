import mongoose from "mongoose";

const teacherParentMessageSchema = new mongoose.Schema(
  {
    rollNo: String,
    parentName: String,
    message: String,
  },
  { timestamps: true }
);

export default mongoose.model("TeacherParentMessage", teacherParentMessageSchema);
