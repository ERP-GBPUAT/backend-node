import express from "express";
import { addNotice, getAllNotices } from "../controllers/Notices/notices";
import authentication from "../middleware/authentication";

const router = express.Router();

router.get("/getAllNotices",getAllNotices)
router.post("/addNotice", authentication, addNotice);

export default router;