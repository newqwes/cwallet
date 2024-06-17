'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('short_game_coins', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: () => uuidv4(),
      },
      coin_list_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'coin_list',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      start_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      volatility: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('short_game_coins');
  },
};
