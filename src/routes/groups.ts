import express from 'express';
import * as groupsHandlers from '@/controllers/groups';

const router = express.Router();

router.post('/', groupsHandlers.createGroup);
router.get('/', groupsHandlers.getGroups);
router.get('/:groupId', groupsHandlers.getOneGroup);
router.put('/:groupId', groupsHandlers.updateGroup);
router.delete('/:groupId', groupsHandlers.deleteGroup);

export default router;
