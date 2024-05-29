import User from '../database/models/user';

class UserDto {
  id: string;
  telegramId: number;
  firstName: string;
  lastName: string;
  languageCode: string;
  nextDateUpdate: Date;
  coins: number | null;
  avatar: string | null;
  level: number;

  constructor(model: User) {
    this.id = model.id;
    this.telegramId = Number(model.telegramId);
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.languageCode = model.languageCode;
    this.nextDateUpdate = model.nextDateUpdate;
    this.coins = Number(model.coins);
    this.avatar = model.avatar;
    this.level = Number(model.level);
  }
}

export default UserDto;
