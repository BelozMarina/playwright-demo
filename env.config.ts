import dotenv from 'dotenv';
import { IEnvConfig } from './typings/IEnvConfig';

dotenv.config();

export const envConfig: IEnvConfig = {
  WEB_URL: process.env.WEB_URL || 'https://practicesoftwaretesting.com',
  USER_EMAIL: process.env.USER_EMAIL!,
  USER_PASSWORD: process.env.USER_PASSWORD!,
  USER_NAME: process.env.USER_NAME!,
};
