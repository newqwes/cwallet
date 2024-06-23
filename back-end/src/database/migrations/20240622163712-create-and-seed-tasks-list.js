'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('tasks_list', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      task_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reward: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });

    await queryInterface.bulkInsert(
      'tasks_list',
      [
        { task_name: 'subscribe_to_channel', reward: 20 },
        { task_name: 'subscribe_to_chat', reward: 30 },
        { task_name: 'subscribe_to_x', reward: 40 },
        { task_name: 'invite_frend', reward: 50 },
        { task_name: 'invate_three_friends', reward: 200 },
        { task_name: 'accumulate_30000_coins', reward: 500 },
      ],
      {}
    );
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.bulkDelete('tasks_list', null, {});
    await queryInterface.dropTable('tasks_list');
  },
};
