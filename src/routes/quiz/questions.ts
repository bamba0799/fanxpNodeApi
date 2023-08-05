import express from 'express';
import {
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from '@/controllers/quiz/questions';

const router = express.Router();

router.route('/').post(createQuestion);
router.route('/:questionId').put(updateQuestion).delete(deleteQuestion);

export default router;
