import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import sequelize from '..';

class Tasks extends Model {
  id: string;
  user_id: string;
  subscribe_to_channel: number;
  subscribe_to_chat: number;
  subscribe_to_x: number;
  invite_frend: number;
  invate_three_friends: number;
  accumulate_30000_coins: number;
}

Tasks.init(
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
    subscribe_to_channel: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    subscribe_to_chat: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    subscribe_to_x: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    invite_frend: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    invate_three_friends: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    accumulate_30000_coins: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'tasks',
    timestamps: false,
    underscored: true,
  }
);

export default Tasks;
