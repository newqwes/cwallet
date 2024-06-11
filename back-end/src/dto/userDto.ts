import User from '../database/models/user';

class UserDto {
  id: string;
  telegramId: number;
  firstName: string;
  lastName: string;
  languageCode: string;
  nextClaimDate: Date;
  coins: number | null;
  avatar: string | null;
  referralCode: string;
  refParent: number;
  refParentChangedTimes: number;

  referralRewards: number;
  luckLevel: number;
  timeLevel: number;
  miningLevel: number;
  secretLevel: number;
  refGrandParent: number;

  constructor(model: User) {
    this.id = model.id;
    this.telegramId = Number(model.telegramId);
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.languageCode = model.languageCode;
    this.nextClaimDate = model.nextClaimDate;
    this.coins = Number(model.coins);
    this.avatar = model.avatar;
    this.referralCode = model.referralCode;
    this.refParent = Number(model.refParent);
    this.refParentChangedTimes = Number(model.refParentChangedTimes);

    this.referralRewards = Number(model.referralRewards);
    this.luckLevel = Number(model.luckLevel);
    this.timeLevel = Number(model.timeLevel);
    this.miningLevel = Number(model.miningLevel);
    this.secretLevel = Number(model.secretLevel);
    this.refGrandParent = Number(model.refGrandParent);
  }
}

export default UserDto;
