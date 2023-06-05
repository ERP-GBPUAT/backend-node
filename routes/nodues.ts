import express from "express";
import { applyNoDues, approveNoDues, getAdviseeNoDues, getAllNoDues, getNoDues } from "../controllers/NoDues/nodues";
import authentication from "../middleware/authentication";
import { applyEmpNoDues, approveEmpNoDues, getAllEmpNoDues } from "../controllers/NoDues/empNoDues";

const router = express.Router();

router.post("/applyEmpNodue",authentication,applyEmpNoDues)
router.post("/applyNodue",authentication,applyNoDues)
router.get("/getNodueAdvisor",authentication,getAdviseeNoDues)
router.get("/getAllNddue",authentication,getAllNoDues)
router.get("/getNodue",authentication,getNoDues)
router.post("/approveNodue",authentication,approveNoDues)
router.get("/getAllEmpNddue",authentication,getAllEmpNoDues)
router.post("/approveEmpNodue",authentication,approveEmpNoDues)

export default router