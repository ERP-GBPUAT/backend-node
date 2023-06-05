import express from "express";
import {
  addStudent,
  getStudent,
  // updateStudent,
  getAdvisees,
  getStudentsByFilter,
} from "../controllers/Student/student";
import authentication from "../middleware/authentication";

const router = express.Router();
router.get("/get/:studentId", authentication, getStudent);
// router.patch("/update", authentication, updateStudent);
router.post("/getAdvisees", authentication, getAdvisees);
router.post("/getStudentsByFilter", authentication, getStudentsByFilter);
router.post("/register", addStudent);

export default router;
