import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    rollNo: String,
    parentName: String,
    mentorName: String,
    message: String,
    status: { type: String, default: "Open" },
  },
  { timestamps: true }
);
export default mongoose.model("Complaint", complaintSchema);
