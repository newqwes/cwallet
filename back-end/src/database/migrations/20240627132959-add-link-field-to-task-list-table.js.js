'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('tasks_list', 'link', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('tasks_list', 'text', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('tasks_list', 'link');
    await queryInterface.removeColumn('tasks_list', 'text');
  },
};
