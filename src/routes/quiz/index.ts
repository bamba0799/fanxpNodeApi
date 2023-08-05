import express from 'express';

// sub-routers
import quizRouter from './quiz';
// import questionsRouter from './questions;
// import answersRouter from './answers';

const router = express.Router();

router.use('/', quizRouter);
// router.use('/questions', questionsRouter);
// router.use('/answers', answersRouter);

export default router;
