import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import sequelize from '..';

class ShortGameData extends Model {}

ShortGameData.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
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
    place: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    game_period: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    game_ended: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'short_game_data',
    timestamps: false,
    underscored: true,
  }
);

export default ShortGameData;
