import express from 'express';
import { register,login, logout,refresh } from '../controllers/Authentication/auth';

const router = express.Router();
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/refresh', refresh)

export default router