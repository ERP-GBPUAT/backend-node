import express from "express";
import { addStaff } from "../controllers/Staff/staff"
import { body } from "express-validator";

const router = express.Router();

router.post("/register",[
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
    body("staff.id").trim().notEmpty().withMessage("Student id cannot be empty").isAlpha().withMessage("Staff id cannot contain numeric values").trim().isLength({ min: 5, max: 6 }).withMessage("Staff Id length should be between 5 and 6"),
    body("staff.role", "Invalid Staff role").trim().notEmpty().withMessage("Father name cannot be empty")
    ], addStaff)

export default router