import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import sequelize from '..';

class TinderGame extends Model {
  id: string;
  user_id: string;
  coin_list_id: string;

  /**
   * Example: "2024-05-29T08:26:42.000Z"
   */
  game_period: Date;
  game_ended: boolean;
  is_shown: boolean;
  created_at: Date;
  updated_at: Date;
}

TinderGame.init(
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
    game_period: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    game_ended: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_shown: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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
    tableName: 'tinder_game',
    timestamps: true,
    underscored: true,
  }
);

export default TinderGame;
