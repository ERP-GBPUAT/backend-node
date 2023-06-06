import express from "express";
import { addNotice, getAllNoticeByDept, getAllNotices, getNoticeFile } from "../controllers/Notices/notices";
import authentication from "../middleware/authentication";
import multer from "multer";

const router = express.Router();
const upload = multer({dest:"./NoticesFiles/"})

router.get("/getAllNotices",getAllNotices)
router.get("/getNoticePdf/:noticeId",getNoticeFile)
router.post("/getNoticeByType",getAllNoticeByDept)
router.post("/addNotice",upload.single("file"), authentication, addNotice);

export default router;