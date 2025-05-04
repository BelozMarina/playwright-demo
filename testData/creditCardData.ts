import { envConfig } from '../env.config';
import { ICreditCard } from '../typings/ICreditCard';

export const creditCardData: ICreditCard = {
  cardNumber: envConfig.CARD_NUMBER,
  cardHolder: envConfig.CARD_HOLDER_NAME,
  expiryDate: envConfig.CARD_EXPIRY_DATE,
  cvv: envConfig.CARD_CVV,
};
