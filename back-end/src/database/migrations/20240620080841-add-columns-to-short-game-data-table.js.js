'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Удаление столбца 'game_period'
    await queryInterface.removeColumn('short_game_data', 'game_period');

    // Добавление столбца 'game_period' с типом DATE, где значения могут быть NULL
    await queryInterface.addColumn('short_game_data', 'game_period', {
      type: Sequelize.DATE,
      allowNull: true
    });

    await queryInterface.addColumn('short_game_data', 'volatility_result', {
      type: Sequelize.FLOAT,
      defaultValue: 0,
    });
    await queryInterface.addColumn('short_game_data', 'is_shown', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn('short_game_data', 'in_progress', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Восстановление столбца 'game_period' с типом VARCHAR
    await queryInterface.addColumn('short_game_data', 'game_period', {
      type: Sequelize.STRING,
      allowNull: true // Установим allowNull в true, если это нужно
    });

    await queryInterface.removeColumn('short_game_data', 'volatility_result');
    await queryInterface.removeColumn('short_game_data', 'is_shown');
    await queryInterface.removeColumn('short_game_data', 'in_progress');
  }
};
