import { config } from 'dotenv';
import path from 'path';

// load .env
config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev',
  ),
});

export const PORT = process.env.PORT;

// JWT
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// ORANGE SMS
export const SMS_API_AUTHORIZATION_HEADER =
  process.env.SMS_API_AUTHORIZATION_HEADER;
