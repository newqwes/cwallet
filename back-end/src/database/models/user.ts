import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import sequelize from '..';

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: () => uuidv4(),
    },
    telegramId: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      unique: true
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    languageCode: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    nextDateUpdate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    coins: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
      allowNull: true,
      validate: {
        min: 0,
      },
    },
    avatar: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: 'user',
    timestamps: false,
  },
);

export default User;
