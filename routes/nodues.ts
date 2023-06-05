import express from "express";
import { applyNoDues, approveNoDues, getAdviseeNoDues } from "../controllers/NoDues/nodues";
import authentication from "../middleware/authentication";

const router = express.Router();

router.post("/applyNodue",authentication,applyNoDues)
router.get("/getNodueAdvisor",authentication,getAdviseeNoDues)
router.post("/approveNodue",authentication,approveNoDues)

export default router