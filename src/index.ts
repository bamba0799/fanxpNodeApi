import 'module-alias/register';
import express from 'express';
import { PORT } from '@/constants/variables';

// routers
import teamsRouter from '@/routes/teams';
import stadiumsRouter from '@/routes/stadiums';
import groupsRouter from '@/routes/groups';
import matchsRouter from '@/routes/matchs';
import stagesRouter from '@/routes/stages';
import extraRouter from '@/routes/extra';
import userRouter from '@/routes/user';
import ticketCategoryRouter from '@/routes/tickets/category';
import ticketsRouter from '@/routes/tickets';

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/teams', teamsRouter);
app.use('/api/stadiums', stadiumsRouter);
app.use('/api/groups', groupsRouter);
app.use('/api/matchs', matchsRouter);
app.use('/api/stages', stagesRouter);
app.use('/api/extra', extraRouter);
app.use('/api/user', userRouter);
app.use('/api/ticket-category', ticketCategoryRouter);
app.use('/api/tickets', ticketsRouter);

app.listen(parseInt(PORT!), () => {
  console.log(`Live on http://localhost:${PORT}`);
});
