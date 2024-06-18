'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('manual_coin', {
      coin_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
    });
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('manual_coin');
  },
};
