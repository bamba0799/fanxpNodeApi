import express from 'express';
import * as teamsHandlers from '@/controllers/teams';

const router = express.Router();

router.post('/', teamsHandlers.createTeam);
router.post('/add-to-group', teamsHandlers.addToAGroup);
router.post('/remove-to-group', teamsHandlers.removeToAGroup);
router.get('/', teamsHandlers.getTeams);
router.get('/:teamId', teamsHandlers.getOneTeam);
router.put('/:teamId', teamsHandlers.updateTeam);
router.delete('/:teamId', teamsHandlers.deleteTeam);

export default router;
