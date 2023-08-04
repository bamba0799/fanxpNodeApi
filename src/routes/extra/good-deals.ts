import express from 'express';
import * as gooDealsHandlers from '@/controllers/extra/good-deals';

const router = express.Router();

router.post('/', gooDealsHandlers.createDeal);
router.get('/', gooDealsHandlers.getDeals);
router.get('/:dealId', gooDealsHandlers.getOneDeal);
router.put('/:dealId', gooDealsHandlers.updateDeal);
router.delete('/:dealId', gooDealsHandlers.deleteDeal);

export default router;
