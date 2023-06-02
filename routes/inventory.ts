import express from 'express';
import { addItem, deleteItem, getAllItems, getItem } from '../controllers/Inventory/inventory';
import multer from "multer";

const upload = multer({ dest: "./inventoryImages/" })
const router = express.Router();

router.post('/add', upload.single('file'), addItem)
router.get('/getAll', getAllItems)
router.get('/get/:itemId', getItem)
router.delete('/delete', deleteItem)

export default router
