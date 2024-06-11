'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('user', 'referralRewards', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: true,
      validate: {
        min: 0,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('user', 'referralRewards');
  }
};
