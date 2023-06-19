import express from "express";
import { registerSemester, getSemester, getPrevSemester } from "../controllers/FacultyCourseAllotment/courseAllotment"

const router = express.Router();

router.post("/register", registerSemester);
router.get("/getCurrentSem", getSemester);
router.get("/getPrevSem", getPrevSemester);

export default router
