'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('telegram_setting', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      schedule: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_started: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    });

    await queryInterface.bulkInsert(
      'telegram_setting',
      [
        {
          img: 'https://cdn.midjourney.com/69aa4c29-a938-4f7c-9b97-8c2521015d22/0_0.png',
          text: '🚀 Exciting News, Cwallet Users! 🌟\n' +
            '\n' +
            'We\'ve just rolled out the new Level Up feature for your characters! Don\'t miss out on enhancing your experience. Try it today and let us know how you like it! 💬\n' +
            '\n',
          schedule: '18 13 * * 3',
          is_started: false
        }
      ],
      {}
    );
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('telegram_setting', null, {});
    await queryInterface.dropTable('telegram_setting');
  },
};
