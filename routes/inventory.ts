import express from 'express';
import { addItems, deleteItem, getAllItems, getItem, getItemsByFilter } from '../controllers/Inventory/inventory';
import multer from "multer";

const upload = multer({ dest: "./inventoryImages/" })
const router = express.Router();

router.post('/add', upload.single('file'), addItems)
router.get('/getAll', getAllItems)
router.get('/get/:itemId', getItem)
router.delete('/delete', deleteItem)

export default router
