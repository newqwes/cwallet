import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import sequelize from '..';

class User extends Model {
  id: string;
  telegramId: number;
  firstName: string | null;
  lastName: string | null;
  languageCode: string | null;

  /**
   * Example: "2024-05-29T08:26:42.000Z"
   */
  nextClaimDate: Date;
  coins: number | null;
  avatar: string | null;
  level: number;

  // The bias towards higher or lower values (0 to 1, where 0 is lower values and 1 is higher values)
  timeBias: number;
  claimBias: number;

  // The influence of the bias on the result (0 to 1, where 0 is no influence and 1 is full influence)
  timeInfluence: number;
  claimInfluence: number;

  referralCode: string;
  refParent: number;
  refParentChangedTimes: number;
}

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
    nextClaimDate: {
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
    },
    timeBias: {
      type: DataTypes.FLOAT,
      defaultValue: 0.5,
      allowNull: false,
    },
    claimBias: {
      type: DataTypes.FLOAT,
      defaultValue: 0.5,
      allowNull: false,
    },
    timeInfluence: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: false,
    },
    claimInfluence: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: false,
    },
    referralCode: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    refParent: {
      type: DataTypes.DOUBLE,
    },
    refParentChangedTimes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true,
      validate: {
        min: 0,
      },
    },
  },
  {
    sequelize,
    tableName: 'user',
    timestamps: false,
  },
);

export default User;
