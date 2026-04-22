import mongoose from "mongoose";

const calendarDaySchema = new mongoose.Schema(
  {
    date: { type: String, unique: true }, // YYYY-MM-DD
    status: { type: String, enum: ["Working", "Holiday"], default: "Working" },
  },
  { timestamps: true }
);

export default mongoose.model("CalendarDay", calendarDaySchema);
