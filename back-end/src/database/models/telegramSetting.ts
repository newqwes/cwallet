import { DataTypes, Model } from 'sequelize';

import sequelize from '..';

class TelegramSetting extends Model {
  id: number;
  img: string;
  text: string;
  schedule: string;
  is_started: boolean;
}

TelegramSetting.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true
    },
    text: {
      type: DataTypes.STRING,
      allowNull: true
    },
    schedule: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_started: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    sequelize,
    tableName: 'telegram_setting',
    timestamps: false
  }
);

export default TelegramSetting;
