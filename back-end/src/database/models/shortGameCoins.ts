import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import sequelize from '..';

class ShortGameCoins extends Model {}

ShortGameCoins.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    coin_list_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'coin_list',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    start_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    volatility: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'short_game_coins',
    timestamps: false,
    underscored: true,
  }
);

export default ShortGameCoins;
