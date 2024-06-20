'use strict';

const { DataTypes } = require("sequelize");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('coin_list', 'market_cap_rank', {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn('coin_list', 'market_cap', {
      type: Sequelize.FLOAT,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('coin_list', 'market_cap_rank');
    await queryInterface.removeColumn('coin_list', 'market_cap');
  }
};
