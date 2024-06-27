import { DataTypes, Model } from 'sequelize';

import sequelize from '..';

class TasksList extends Model {
  id: number;
  task_name: string;
  reward: number;
  link?: string;
  text: string;
}

export const task_names = {
  'invite_friend': 'invite_friend',
  'subscribe_to_channel': 'subscribe_to_channel',
  'subscribe_to_chat': 'subscribe_to_chat',
  'subscribe_to_x': 'subscribe_to_x',
  'invite_three_friends': 'invite_three_friends',
  'accumulate_30000_coins': 'accumulate_30000_coins',
};

TasksList.init(
  {
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
    link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'tasks_list',
    timestamps: false,
    underscored: true,
  },
);

export default TasksList;
