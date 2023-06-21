import express from "express";
import { registerSemester, getSemester, getPrevSemester,subjectReg } from "../controllers/FacultyCourseAllotment/courseAllotment"
import authentication from "../middleware/authentication";

const router = express.Router();

router.post("/register",authentication, registerSemester);
router.post("/subjectReg",subjectReg)
router.get("/getCurrentSem",authentication, getSemester);
router.get("/getPrevSem", getPrevSemester);

export default router
