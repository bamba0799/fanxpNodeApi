import express from 'express';
import * as stadiumsHandlers from '@/controllers/stadiums';

const router = express.Router();

router.post('/', stadiumsHandlers.createStadium);
router.get('/', stadiumsHandlers.getStadiums);
router.get('/:stadiumId', stadiumsHandlers.getOneStadiums);
router.put('/:stadiumId', stadiumsHandlers.updateStadium);
router.delete('/:stadiumId', stadiumsHandlers.deleteStadium);

export default router;
