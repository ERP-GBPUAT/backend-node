import express from 'express';
import multer from "multer";
import {
    applyLeave,
    getStudentLeaves,
    getAdviseesLeaves,
    getHostelLeaves,
    advisorApproval,
    wardenApproval,
} from '../controllers/StudentLeave/studentLeave';
import authentication from "../middleware/authentication"

const router = express.Router();
const upload = multer({ dest: "./uploads/" });

router.post('/applyLeave', authentication, upload.single('file'), applyLeave);
router.get('/getStudentLeaves', authentication, getStudentLeaves)
router.get('/getAdviseesLeaves', authentication, getAdviseesLeaves)
router.get('/getHostelLeaves', authentication, getHostelLeaves)
router.patch('/advisorApproval', authentication, advisorApproval)
router.patch('/wardenApproval', authentication, wardenApproval)

export default router
