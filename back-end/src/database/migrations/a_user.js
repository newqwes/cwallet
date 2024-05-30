const { v4: uuidv4 } = require('uuid');
const {DataTypes} = require("sequelize");

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('user', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: uuidv4(),
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
        defaultValue: 0,
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
        allowNull: true,
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
      }
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('user');
  },
};
