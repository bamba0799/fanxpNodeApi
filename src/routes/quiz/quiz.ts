import express from 'express';
import * as quizHandlers from '@/controllers/quiz';

const router = express.Router();

router.post('/', quizHandlers.createQuiz);
router.post('/givePointToUser', quizHandlers.givePointToUser)
router.get('/sumPoint/:quizId', quizHandlers.getUserSumPointPerQuiz)
router.get('/', quizHandlers.getManyQuiz);
router.get('/:quizId', quizHandlers.getOneQuiz);
router.put('/:quizId', quizHandlers.updateQuiz);
router.delete('/:quizId', quizHandlers.deleteQuiz);

export default router;
