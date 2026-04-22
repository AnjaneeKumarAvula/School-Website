import express from "express";
import {
  addStudent,
  addParent,
  addTeacher,
  markAttendance,
  addMarks,
  getAllTeachers,
  getAllStudents,
  uploadStudents,
  uploadParents,
  uploadTeachers,
} from "../controllers/adminController.js";

const router = express.Router();

// Add single entities
router.post("/add-student", addStudent);
router.post("/add-parent", addParent);
router.post("/add-teacher", addTeacher);

// Attendance and Marks
router.post("/mark-attendance", markAttendance);
router.post("/add-marks", addMarks);

// Get data
router.get("/teachers", getAllTeachers);
router.get("/students", getAllStudents);

// Bulk upload (coming soon)
router.post("/upload/students", uploadStudents);
router.post("/upload/parents", uploadParents);
router.post("/upload/teachers", uploadTeachers);

export default router;
