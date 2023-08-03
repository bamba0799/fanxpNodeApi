import 'module-alias/register';
import express from 'express';
import { PORT } from '@/constants/variables';

// routers
import teamsRouter from '@/routes/teams';

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/teams', teamsRouter);

app.listen(parseInt(PORT!), () => {
  console.log(`Live on http://localhost:${PORT}`);
});
