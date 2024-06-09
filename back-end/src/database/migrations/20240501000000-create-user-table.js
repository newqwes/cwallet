const { v4: uuidv4 } = require('uuid');

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
      },
      lastName: {
        type: DataTypes.STRING(50),
      },
      languageCode: {
        type: DataTypes.STRING(50),
      },
      nextClaimDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      coins: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      avatar: {
        type: DataTypes.STRING(100),
      },
      level: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
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
        type: DataTypes.DOUBLE
      },
      refParentChangedTimes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
        validate: {
          min: 0,
        },
      },
    });

    await queryInterface.addConstraint('user', {
      fields: ['telegramId'],
      type: 'unique',
      name: 'unique_telegramId'
    });
    await queryInterface.addConstraint('user', {
      fields: ['referralCode'],
      type: 'unique',
      name: 'unique_referralCode'
    });
  },

  down: async queryInterface => {
    await queryInterface.removeConstraint('user', 'unique_telegramId');
    await queryInterface.removeConstraint('user', 'unique_referralCode');
    await queryInterface.dropTable('user');
  },
};
