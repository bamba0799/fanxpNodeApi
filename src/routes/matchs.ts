import express from 'express';
import * as matchsHandlers from '@/controllers/matchs';

const router = express.Router();

router.post('/', matchsHandlers.createMatch);
router.get('/', matchsHandlers.getMatchs);
router.get('/:matchId', matchsHandlers.getOneMatch);
router.put('/:matchId', matchsHandlers.updateMatch);
router.delete('/:matchId', matchsHandlers.deleteMatch);

export default router;

