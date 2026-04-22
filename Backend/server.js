import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import Student from "./models/Student.js";

import parentRoutes from "./routes/parentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { getTeachersList } from "./controllers/teacherController.js";

dotenv.config();

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"], credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

// Clean up database on startup - COMMENTED OUT to preserve data
// const cleanupDatabase = async () => {
//   try {
//     // Drop the students collection to remove the unique index constraint issue
//     await Student.collection.drop().catch(() => {
//       // Collection might not exist, that's fine
//     });
//     console.log("🗑️ Students collection cleaned");
//   } catch (err) {
//     console.error("Error cleaning database:", err);
//   }
// };

// Run cleanup after a short delay to ensure DB connection
// setTimeout(cleanupDatabase, 1000);

// Root test
app.get("/", (req, res) => {
  res.send("Dropshield fresh backend running");
});

// Routes
app.use("/parent", parentRoutes);
app.use("/teacher", teacherRoutes);
app.use("/admin", adminRoutes);

// Special endpoint used by frontend: /teachers/list
app.get("/teachers/list", getTeachersList);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
