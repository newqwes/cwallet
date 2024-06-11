'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Добавляем новые поля
    await queryInterface.addColumn('user', 'luckLevel', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    });
    await queryInterface.addColumn('user', 'timeLevel', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    });
    await queryInterface.addColumn('user', 'miningLevel', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    });
    await queryInterface.addColumn('user', 'secretLevel', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    });

    // Удаляем старое поле
    await queryInterface.removeColumn('user', 'level');
  },

  down: async (queryInterface, Sequelize) => {
    // Добавляем обратно поле level
    await queryInterface.addColumn('user', 'level', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    });

    // Удаляем новые поля
    await queryInterface.removeColumn('user', 'luckLevel');
    await queryInterface.removeColumn('user', 'timeLevel');
    await queryInterface.removeColumn('user', 'miningLevel');
    await queryInterface.removeColumn('user', 'secretLevel');
  }
};
