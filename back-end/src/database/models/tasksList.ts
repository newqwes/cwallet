import { DataTypes, Model } from 'sequelize';

import sequelize from '..';

class TasksList extends Model {
  id: number;
  task_name: string;
  reward: number;
}

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
  },
  {
    sequelize,
    tableName: 'tasks_list',
    timestamps: false,
    underscored: true,
  }
);

export default TasksList;
