import mongoose from "mongoose";

const parentSchema = new mongoose.Schema(
  {
    parentName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: String,
    // Link to student by roll number (Option A)
    studentRollNo: { type: String, required: true },
    mentorName: String,
  },
  { timestamps: true }
);

export default mongoose.model("Parent", parentSchema);
