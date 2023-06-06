import express from "express";
import { applyNoDues, approveNoDues, getAdviseeNoDues, getAllNoDues, getNoDues, getOneNoDue, getStatus } from "../controllers/NoDues/nodues";
import authentication from "../middleware/authentication";
import { applyEmpNoDues, approveEmpNoDues, getAllEmpNoDues } from "../controllers/NoDues/empNoDues";

const router = express.Router();

router.post("/applyEmpNodue",authentication,applyEmpNoDues)
router.post("/applyNodue",authentication,applyNoDues)
router.get("/getNodueAdvisor",authentication,getAdviseeNoDues)
router.get("/getAllNodue",authentication,getAllNoDues)
router.get("/getNodue",authentication,getNoDues)
router.get("/getOneNodue/:applicationId",authentication,getOneNoDue)
router.get("/getStatus/:applicationId",authentication,getStatus)
router.post("/approveNodue",authentication,approveNoDues)
router.get("/getAllEmpNddue",authentication,getAllEmpNoDues)
router.post("/approveEmpNodue",authentication,approveEmpNoDues)

export default router