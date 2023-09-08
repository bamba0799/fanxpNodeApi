import express from 'express';
import * as usersHandlers from '@/controllers/user';
import { checkAuth } from '@/middlewares/auth';

const router = express.Router();

router.route('/').get(checkAuth, usersHandlers.getUser);
router.route('/admin').get(checkAuth, usersHandlers.getAdmin);

// fav teams
router.get('/userPerId/:userId', usersHandlers.getUserPerId)
router.post('/fav-teams/follow', usersHandlers.addFavTeam);
router.post('/fav-teams/unfollow', usersHandlers.removeFavTeam);
router.post('/fav-teams', usersHandlers.getFavTeams);
router.post('/fav-teams/:teamId', usersHandlers.getOneFavTeam);

export default router;
