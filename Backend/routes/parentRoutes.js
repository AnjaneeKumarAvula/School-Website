import express from "express";
import {
  loginParent,
  getStudentDetails,
  getStudentMarks,
  getStudentAttendance,
  getCalendar,
  sendComplaint,
  sendMessageToTeacher,
  getTeacherReasons,
} from "../controllers/parentController.js";

const router = express.Router();

// Authentication
router.post("/auth/login", loginParent);

// Authentication
router.post("/auth/login", loginParent);

router.get("/student/details", getStudentDetails);
router.get("/student/marks", getStudentMarks);
router.get("/student/attendance", getStudentAttendance);

router.get("/calendar", getCalendar);

router.post("/complaint", sendComplaint);
router.post("/message/send", sendMessageToTeacher);

router.get("/reasons", getTeacherReasons);

export default router;
