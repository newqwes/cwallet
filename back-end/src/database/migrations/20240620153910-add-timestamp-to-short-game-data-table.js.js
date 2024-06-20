'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('short_game_data', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW')
    });
    await queryInterface.addColumn('short_game_data', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW')
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('short_game_data', 'created_at');
    await queryInterface.removeColumn('short_game_data', 'updated_at');
  }
};
