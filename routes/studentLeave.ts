import express from 'express';
import multer from "multer";
import {
    applyLeave,
    getStudentLeaves,
    getAdviseesLeaves,
    getHostelLeaves,
    advisorApproval,
    wardenApproval,
    advisorRejection,
    wardenRejection
} from '../controllers/StudentLeave/studentLeave';

const router = express.Router();
const upload = multer({ dest: "./uploads/" });

router.post('/applyLeave', upload.single('file'), applyLeave);
router.get('/getStudentLeaves/:studentId', getStudentLeaves)
router.get('/getAdviseesLeaves/:advisorCode', getAdviseesLeaves)
router.get('/getHostelLeaves/:hostel', getHostelLeaves)
router.patch('/advisorApproval/:id', advisorApproval)
router.patch('/wardenApproval/:id', wardenApproval)
router.patch('/advisorRejection/:id', advisorRejection)
router.patch('/wardenRejection/:id', wardenRejection)

export default router
