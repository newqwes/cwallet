'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('short_game_data', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: () => uuidv4(),
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'user', // Убедитесь, что имя таблицы правильное
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
      place: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      game_period: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      game_ended: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    });
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('short_game_data');
  },
};
