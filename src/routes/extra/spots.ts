import express from 'express';
import * as spotsHandlers from '@/controllers/extra/spots';

const router = express.Router();

router.post('/', spotsHandlers.createSpot);
router.get('/', spotsHandlers.getSpots);
router.get('/:spotId', spotsHandlers.getOneSpot);
router.put('/:spotId', spotsHandlers.updateSpot);
router.delete('/:spotId', spotsHandlers.deleteSpot);

export default router;
