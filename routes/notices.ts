import express from "express";
import { addNotice, getAllNoticeByDept, getAllNotices, getNoticeFile } from "../controllers/Notices/notices";
import authentication from "../middleware/authentication";
import multer from "multer";
import { body } from "express-validator";

const router = express.Router();
const upload = multer({dest:"./NoticesFiles/"})

router.get("/getAllNotices",getAllNotices)
router.get("/getNoticePdf/:noticeId",getNoticeFile)
router.post("/getNoticeByType",getAllNoticeByDept)
// router.post("/addNotice",[
//     body("title").isLength({min:5}).withMessage("Title is too short").isLength({max:30}).withMessage("Title is too long").matches(/^[a-zA-z]+[a-zA-Z0-9$%@#&(){},."'?/:;]*/).withMessage("Title cannot contain only numbers"),
//     body("description").isLength({min:15}).withMessage("description is too short").isLength({max:100}).withMessage("Title is too long").matches(/^[a-zA-z]+[a-zA-Z0-9$%@#&(){},."'?/:;]*/).withMessage("Title cannot contain only numbers")
// ],upload.single("file"), authentication, addNotice);
router.post("/addNotice",upload.single("file"), authentication, addNotice);

export default router;