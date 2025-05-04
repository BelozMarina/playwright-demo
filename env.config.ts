import dotenv from 'dotenv';
import { IEnvConfig } from './typings/IEnvConfig';

dotenv.config();

export const envConfig: IEnvConfig = {
  WEB_URL: process.env.WEB_URL || 'https://practicesoftwaretesting.com',
  USER_EMAIL: process.env.USER_EMAIL!,
  USER_PASSWORD: process.env.USER_PASSWORD!,
  USER_NAME: process.env.USER_NAME!,
  CARD_NUMBER: process.env.CARD_NUMBER!,
  CARD_EXPIRY_DATE: process.env.CARD_EXPIRY!,
  CARD_CVV: process.env.CARD_CVV!,
  CARD_HOLDER_NAME: process.env.CARD_HOLDER_NAME!,
};
