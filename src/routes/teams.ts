import express from 'express';
import * as teamsHandlers from '@/controllers/team';
import * as favTeamsHandlers from '@/controllers/team/fav';

const router = express.Router();

// user fav teams
router
  .route('/fav')
  .post(favTeamsHandlers.post)
  .delete(favTeamsHandlers.remove);
router.route('/fav/:userId').get(favTeamsHandlers.getFavTeams);

// teams
router.post('/', teamsHandlers.createTeam);
router.post('/add-to-group', teamsHandlers.addToAGroup);
router.post('/remove-to-group', teamsHandlers.removeToAGroup);
router.get('/', teamsHandlers.getTeams);
router.get('/:teamId', teamsHandlers.getOneTeam);
router.put('/:teamId', teamsHandlers.updateTeam);
router.delete('/:teamId', teamsHandlers.deleteTeam);

// team players
router.post('/:teamId/players', teamsHandlers.createPlayer);
router.get('/:teamId/players', teamsHandlers.getPlayers);
router.get('/:teamId/players/:playerId', teamsHandlers.getOnePlayer);
router.put('/:teamId/players/:playerId', teamsHandlers.updatePlayer);
router.delete('/:teamId/players/:playerId', teamsHandlers.deletePlayer);

export default router;
