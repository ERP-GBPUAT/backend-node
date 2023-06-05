import express from "express";
import { addStaff } from "../controllers/Staff/staff"

const router = express.Router();

router.post("/register", addStaff)

export default router