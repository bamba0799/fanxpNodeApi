import { config } from 'dotenv';

// load .env
config();

export const PORT = process.env.PORT;
