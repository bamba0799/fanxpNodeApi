import express from 'express';
import { getAuth, verifyOtp, authAdmin } from '@/controllers/auth';

const router = express.Router();

router.post('/', getAuth);
router.post('/verify-otp', verifyOtp);
router.post('/admin', authAdmin);
router.post('/admin/logout', authAdmin);

export default router;
