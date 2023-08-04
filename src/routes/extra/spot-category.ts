import express from 'express';
import * as spotCategoryHandlers from '@/controllers/extra/spot-category';

const router = express.Router();

router.post('/', spotCategoryHandlers.createCategory);
router.get('/', spotCategoryHandlers.getCategories);
router.get('/:categoryId', spotCategoryHandlers.getOneCategory);
router.put('/:categoryId', spotCategoryHandlers.updateCategory);
router.delete('/:categoryId', spotCategoryHandlers.deleteCategory);

export default router;
