import { REFERRAL_CODE_LENGTH } from '../constants';

export const generateReferralCode = (length: number = REFERRAL_CODE_LENGTH): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const isValidReferralCode = (input: string): boolean => {
  const upperCaseInput = input.toUpperCase();
  const regex = /^[A-Z0-9]+$/;
  return !(upperCaseInput.length > 20 || !regex.test(upperCaseInput));
}
