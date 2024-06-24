'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('level', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      multiplier: {
        type: DataTypes.FLOAT,
        allowNull: false,
      }
    });

    await queryInterface.bulkInsert(
      'level',
      [
        { name: 'luckLevel', price: 1200, multiplier: 1.5 },
        { name: 'timeLevel', price: 1800, multiplier: 1.4 },
        { name: 'miningLevel', price: 1600, multiplier: 1.5 },
        { name: 'secretLevel', price: 5000, multiplier: 2 }
      ],
      {}
    );
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('level', null, {});
    await queryInterface.dropTable('level');
  },
};
