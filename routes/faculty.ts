import express from "express";
import { addFacultyDetails, getFaculty, getAllFaculty, getFacultyByDept } from "../controllers/Faculty/faculty";
import { body } from "express-validator";
import authentication from "../middleware/authentication";

const router = express.Router();

router.post("/register",[
    body("user.email","Please enter a valid email").trim().isEmail(),
    body("user.password").trim().notEmpty().isLength({min:6}).withMessage("Password must be 6 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/).withMessage("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
    body("user.name","Enter a valid name").trim().matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/).isLength({min:3}),
    body("user.phoneNo").trim().isNumeric().withMessage("Phone can only contain numeric values").isLength({min:10,max:10}).withMessage("Phone number must be 10 numbers long"),
    body("user.dob").isDate().custom((value)=>{
        let cDate = new Date();
        let vDate = new Date(value);
        let minDate = new Date(
            cDate.getFullYear()-16,
            cDate.getMonth(),
            cDate.getDate()
        )
        if(vDate>minDate) {
            throw new Error(`Date of birth must be before ${cDate.getFullYear()-16}`)
        }
        return true
    }),
    body("user.address").trim().notEmpty().withMessage("Address cannot be empty"),
    body("faculty.id").trim().isAlpha().withMessage("Faculty id cannot contain numbers").trim().isLength({max:6}).withMessage("Max length of Id cannot exceed 10"),
    body('faculty.qualification',"Qualification must contain only letters").trim().matches(/^[a-zA-Z,.&*()]/),
    body('faculty.researchInterests').trim().notEmpty().withMessage('Research Interests cannot be empty').matches(/[a-zA-Z\-{}_/&*,.() ]+[0-9]*[a-zA-Z\-{}_/&*,.() ]*/).withMessage("Interests cannot contain only numeric values")
],addFacultyDetails)
router.get("/getFaculty/:facultyId", getFaculty);
router.get("/getAllFaculty", getAllFaculty)
router.get("/getDeptFaculty",authentication, getFacultyByDept)

export default router

// {
//     "user": {
//       "email": "faculty1@example.com",
//       "password": "1234",
//       "isFaculty": true,
//       "name": "faculty1",
//       "phoneNo": "1234567890",
//       "dob": "01-01-01",
//       "address": "xyz",
//       "gender": "male"
//     },
//     "faculty": {
//       "id": "TITA",
//       "department": "Mechanical engineering",
//       "designation": "professor",
//       "qualification": "Ph.D",
//       "researchInterests":"Computer",
//       "bioWebLink":"http://google"
//     }
//   }