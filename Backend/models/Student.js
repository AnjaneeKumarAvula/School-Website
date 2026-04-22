import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  rollNo: { type: String, unique: true },
  className: String,
  parentName: String,
  mentorName: String,
  presentDays: { type: Number, default: 0 },
  absentDays: { type: Number, default: 0 },
  marks: [
    {
      subject: String,
      obtained: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
    },
  ],
  attendance: [
    {
      date: String,
      status: String, // "Present" or "Absent"
    },
  ],
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);
