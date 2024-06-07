export interface IUser {
  id: string;
  telegramId: number;
  firstName: string;
  lastName: string;
  languageCode: string;
  nextClaimDate: Date;
  coins: number;
  avatar: string;
  level: number;
  referralCode: string | null;
  refParent: number | null;
  refParentChangedTimes: number;
};
