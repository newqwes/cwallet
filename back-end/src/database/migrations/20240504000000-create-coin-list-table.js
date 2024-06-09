const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('coin_list', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: () => uuidv4(),
      },
      coin_id: { type: DataTypes.STRING, allowNull: false },
      symbol: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      image_link: { type: DataTypes.STRING, allowNull: false },
      current_price: { type: DataTypes.FLOAT, allowNull: false },
      last_updated: { type: DataTypes.STRING, allowNull: false },
      historical_chart_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      historical_chart_prices: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('coin_list');
  },
};
