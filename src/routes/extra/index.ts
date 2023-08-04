import express from 'express';

// sub-routers
import spotsRouter from './spots';
import spotCategoryRouter from './spot-category';

const router = express.Router();

router.use('/spot-category', spotCategoryRouter);
router.use('/spots', spotsRouter);
// router.use('/good-deals', goodDealRouter);

export default router;
