'use strict';

const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('long_game', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: uuidv4(),
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'user',
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
      coin_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      start_date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      finish_date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      finish_price: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('long_game');
  },
};
