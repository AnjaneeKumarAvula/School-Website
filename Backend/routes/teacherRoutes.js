import express from "express";
import {
  loginTeacher,
  getTeacherStudents,
  getMentees,
  sendMessageToParent,
} from "../controllers/teacherController.js";

const router = express.Router();

// Authentication
router.post("/auth/login", loginTeacher);

router.get("/students", getTeacherStudents);
router.get("/mentees", getMentees);
router.post("/send-to-parent", sendMessageToParent);

export default router;
