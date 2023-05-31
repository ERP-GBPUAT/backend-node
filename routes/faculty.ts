import express from "express";
import { addFacultyDetails, getFaculty, getAllFaculty, getFacultyByDept } from "../controllers/Faculty/faculty";
import authentication from "../middleware/authentication";
// import authentication from "../middleware/authentication";

const router = express.Router();

router.post("/register",addFacultyDetails)
router.get("/getFaculty/:facultyId", getFaculty);
router.get("/getAllFaculty", getAllFaculty)
router.get("/getDeptFaculty",authentication, getFacultyByDept)

export default router
