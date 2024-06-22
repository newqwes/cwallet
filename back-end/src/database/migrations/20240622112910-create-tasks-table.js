'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('tasks', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: () => uuidv4(),
      },
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: 'user',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      subscribe_to_channel: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      subscribe_to_chat: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      subscribe_to_x: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      invite_frend: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      invate_three_friends: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      accumulate_30000_coins: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
    });
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('tasks');
  },
};
