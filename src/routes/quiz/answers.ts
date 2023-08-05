import express from 'express';
import {
  createAnswer,
  updateAnswer,
  deleteAnswer,
} from '@/controllers/quiz/answers';

const router = express.Router();

router.route('/').post(createAnswer);
router.route('/:answerId').put(updateAnswer).delete(deleteAnswer);

export default router;
