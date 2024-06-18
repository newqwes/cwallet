import { Model, DataTypes } from 'sequelize';

import sequelize from '..';

class ManualCoin extends Model {
  coin_id: string;
}

ManualCoin.init(
  {
    coin_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },

  },
  {
    sequelize,
    tableName: 'manual_coin',
    timestamps: false,
    underscored: true,
  }
);

export default ManualCoin;
