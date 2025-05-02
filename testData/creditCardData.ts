import { ICreditCard } from '../typings/ICreditCard';

export const creditCard: ICreditCard = {
  cardNumber: process.env.CARD_NUMBER!,
  cardHolderName: process.env.CARD_HOLDER_NAME!,
  expiryDate: process.env.CARD_EXPIRY_DATE!,
  cvv: process.env.CARD_CVV!,
};
