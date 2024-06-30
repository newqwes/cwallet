import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import sequelize from '..';

class ShortGameData extends Model {
  id: string;
  user_id: string;
  coin_list_id: string;
  place: number;
  game_ended: boolean;

  /**
   * Example: "2024-05-29T08:26:42.000Z"
   */
  game_period: Date;
  volatility_result: number;
  is_shown: boolean;
  in_progress: boolean;
  is_paid: boolean;
  created_at: Date;
  updated_at: Date;

  average_volatility_result?: number;
  games_count?: number;
  average_place?: number;
}

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
      references: {
        model: 'user',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    coin_list_id: {
      type: DataTypes.UUID,
      references: {
        model: 'coin_list',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    place: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    game_period: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    game_ended: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    volatility_result: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    is_shown: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    in_progress: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    is_paid: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'short_game_data',
    timestamps: true,
    underscored: true,
  },
);

export default ShortGameData;
