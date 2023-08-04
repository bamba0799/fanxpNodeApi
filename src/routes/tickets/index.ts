import express from 'express';
import * as ticketsHandlers from '@/controllers/tickets';

const router = express.Router();

router.post('/', ticketsHandlers.createTicket);
router.get('/', ticketsHandlers.getTickets);
router.get('/:ticketId', ticketsHandlers.getOneTicket);
router.put('/:ticketId', ticketsHandlers.updateTicket);
router.delete('/:ticketId', ticketsHandlers.deleteTicket);

export default router;
