import express from "express";
import {
  addStudent,
  getStudent,
  // updateStudent,
  getAdvisees,
  getStudentsByFilter,
} from "../controllers/Student/student";
import authentication from "../middleware/authentication";
import { body } from "express-validator";

const router = express.Router();
router.get("/getStudent/:studentId", authentication, getStudent);
// router.patch("/update", authentication, updateStudent);
router.post("/getAdvisees", authentication, getAdvisees);
router.post("/getStudentsByFilter", authentication, getStudentsByFilter);
router.post("/register", [
  body("user.email", "Please enter a valid email").trim().notEmpty().withMessage("Email cannot be empty").isEmail(),
  body("user.password").trim().notEmpty().withMessage("Password cannot be empty").isLength({ min: 6 }).withMessage("Password must be 6 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/).withMessage("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
  body("user.name", "Enter a valid name").trim().notEmpty().withMessage("Name cannot be empty").matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/).isLength({ min: 3 }),
  body("user.phoneNo").trim().notEmpty().withMessage("Phone number cannot be empty").isNumeric().withMessage("Phone can only contain numeric values").isLength({ min: 10, max: 10 }).withMessage("Phone number must be 10 numbers long"),
  body("user.dob").isDate().notEmpty().withMessage("Date cannot be empty").custom((value) => {
    let cDate = new Date();
    let vDate = new Date(value);
    let minDate = new Date(
      cDate.getFullYear() - 16,
      cDate.getMonth(),
      cDate.getDate()
    )
    if (vDate > minDate) {
      throw new Error(`Date of birth must be before ${cDate.getFullYear() - 16}`)
    }
    return true
  }),
  body("user.gender").trim().notEmpty().withMessage("Gender cannot be empty"),
  body("user.address").trim().notEmpty().withMessage("Address cannot be empty"),
  body("student.id").trim().notEmpty().withMessage("Student id cannot be empty").isNumeric().withMessage("Faculty id cannot contain alpha values").trim().isLength({ min: 5, max: 6 }).withMessage("Max length of Id cannot exceed 6"),
  body("student.fatherName", "Enter a valid name").trim().notEmpty().withMessage("Father name cannot be empty").matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/).isLength({ min: 3 }),
  body("student.motherName", "Enter a valid name").trim().notEmpty().withMessage("Mother name cannot be empty").matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/).isLength({ min: 3 }),
  body("student.parentPhone").trim().notEmpty().withMessage("Parent phone number cannot be empty").isNumeric().withMessage("Phone can only contain numeric values").isLength({ min: 10, max: 10 }).withMessage("Phone number must be 10 numbers long"),
  body("student.parentEmail", "Please enter a valid email").trim().isEmail(),
  body('student.roomNo').trim().notEmpty().withMessage("Room no cannot be empty").isNumeric().withMessage("Room no is invalid").custom((value) => {
    if (value > 300) throw new Error("Room number cannot be greater than 300")
    return true
  }),
  body('student.batch').trim().notEmpty().withMessage("Batch cannot be empty").isNumeric().isLength({ min: 4, max: 4 }).withMessage("Batch is invalid").custom((value) => {
    let cDate = new Date();
    let year = cDate.getFullYear();
    if (value > year) throw new Error("Batch should be current year or in past")
    return true
  }),
  body("student.degree").trim().notEmpty().withMessage("Degree name cannot be empty"),
  body("student.discipline").trim().notEmpty().withMessage("Discipline name cannot be empty"),
  body("student.hostel").trim().notEmpty().withMessage("Hostel name cannot be empty"),
  body('student.FacultyId').trim().notEmpty().withMessage('Faculty id cannot be empty').isAlpha().withMessage("Faculty cannot contain numbers")
], addStudent);

export default router;


// {
//   "user": {
//     "email": "student1@example.com",
//     "password": "1234",
//     "isStudent": true,
//     "name": "Student1",
//     "phoneNo": "1234567890",
//     "dob": "01-01-01",
//     "address": "xyz",
//     "gender": "male"
//   },
//   "student": {
//     "id":55124,
//     "degree": "B.Tech",
//     "discipline": "Mechanical engineering",
//     "fatherName": "abc",
//     "motherName":"abc",
//     "parentPhone": "2345678901",
//     "parentEmail":"https://github.com/user12",
//     "hostel":"Vishveshwarrya",
//     "roomNo":"125",
//     "cgpa":0,
//     "batch":2019,
//     "FacultyId":"TITA"
//   }
// }