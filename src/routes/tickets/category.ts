import express from 'express';
import * as ticketCategoryHandlers from '@/controllers/tickets/caterogy';

const router = express.Router();

router.post('/', ticketCategoryHandlers.createCategory);
router.get('/', ticketCategoryHandlers.getCategories);
router.get('/:categoryId', ticketCategoryHandlers.getOneCategory);
router.put('/:categoryId', ticketCategoryHandlers.updateCategory);
router.delete('/:categoryId', ticketCategoryHandlers.deleteCategory);

export default router;
