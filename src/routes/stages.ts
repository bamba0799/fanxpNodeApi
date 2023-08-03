import express from 'express';
import * as stagesHandlers from '@/controllers/stages';

const router = express.Router();

router.post('/', stagesHandlers.createStage);
router.get('/', stagesHandlers.getStages);
router.get('/:stageId', stagesHandlers.getOneStage);
router.put('/:stageId', stagesHandlers.updateStage);
router.delete('/:stageId', stagesHandlers.deleteStage);

export default router;
