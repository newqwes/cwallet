export interface IUser {
  id: string;
  telegramId: number;
  firstName: string;
  lastName: string;
  languageCode: string;
  nextClaimDate: string;
  coins: number;
  avatar: string;
  referralCode: string | null;
  refParent: number | null;
  refParentChangedTimes: number;
  referralRewards: number;
  luckLevel: number;
  timeLevel: number;
  miningLevel: number;
  secretLevel: number;
  refGrandParent: number;

  shortVolatility: number;
  shortPlace: number;
  shortGames: number;
}
