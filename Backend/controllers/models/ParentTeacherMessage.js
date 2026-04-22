import mongoose from "mongoose";

const parentTeacherMessageSchema = new mongoose.Schema(
  {
    parentName: String,
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
    message: String,
  },
  { timestamps: true }
);

export default mongoose.model("ParentTeacherMessage", parentTeacherMessageSchema);
