import express from 'express';
import { getAuth, verifyOtp } from '@/controllers/auth';

const router = express.Router();

router.post('/', getAuth);
router.post('/verify-otp', verifyOtp);

export default router;
