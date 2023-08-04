import express from 'express';

// sub-routers
import spotsRouter from './spots';

const router = express.Router();

// router.use('/spot-category', spotCategoryRouter);
router.use('/spots', spotsRouter);
// router.use('/good-deals', goodDealRouter);

export default router;
