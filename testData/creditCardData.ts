import { envConfig } from '../env.config';
import { ICreditCard } from '../typings/ICreditCard';

export const creditCard: ICreditCard = {
  cardNumber: envConfig.CARD_NUMBER,
  cardHolderName: envConfig.CARD_HOLDER,
  expiryDate: envConfig.CARD_EXPIRY_DATE,
  cvv: envConfig.CARD_CVV,
};
