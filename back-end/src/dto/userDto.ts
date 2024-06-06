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
  level: number;
  referralCode: string;
  refParent: number;
  refParentChangedTimes: number;

  constructor(model: User) {
    this.id = model.id;
    this.telegramId = Number(model.telegramId);
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.languageCode = model.languageCode;
    this.nextClaimDate = model.nextClaimDate;
    this.coins = Number(model.coins);
    this.avatar = model.avatar;
    this.level = Number(model.level);
    this.referralCode = model.referralCode;
    this.refParent = Number(model.refParent);
    this.refParentChangedTimes = Number(model.refParentChangedTimes);
  }
}

export default UserDto;
