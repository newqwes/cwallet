import { DataTypes, Model } from 'sequelize';
import sequelize from '..';
import TasksList from './tasksList';

class UserTasks extends Model {
  id: number;
  user_id: string;
  tasks_list_id: number;
  is_claimed: boolean;
}

UserTasks.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
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
    tasks_list_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tasks_list',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    is_claimed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'user_tasks',
    timestamps: false,
  },
);

UserTasks.belongsTo(TasksList, {
  foreignKey: 'tasks_list_id',
  as: 'TasksList',
});

export default UserTasks;
