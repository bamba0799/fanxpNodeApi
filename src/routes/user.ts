import express from 'express';
import * as usersHandlers from '@/controllers/user';

const router = express.Router();

// fav teams
router.post('/fav-teams/follow', usersHandlers.addFavTeam);
router.post('/fav-teams/unfollow', usersHandlers.removeFavTeam);
router.post('/fav-teams', usersHandlers.getFavTeams);
router.post('/fav-teams/:teamId', usersHandlers.getOneFavTeam);

export default router;
