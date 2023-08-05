import { config } from 'dotenv';

// load .env
config();

export const PORT = process.env.PORT;

// JWT
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// ORANGE SMS
export const SMS_API_AUTHORIZATION_HEADER =
  process.env.SMS_API_AUTHORIZATION_HEADER;
