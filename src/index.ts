import 'module-alias/register';
import express from 'express';
import { PORT } from '@/constants/variables';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ msg: 'Hello World !' });
});

app.listen(parseInt(PORT!), () => {
  console.log(`Live on http://localhost:${PORT}`);
});
