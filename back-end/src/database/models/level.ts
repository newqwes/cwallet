import { DataTypes, Model } from 'sequelize';

import sequelize from '..';

class Level extends Model {
  id: string;
  name: string;
  price: number;
  multiplier: number;
}

Level.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    multiplier: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'level',
    timestamps: false
  }
);

export default Level;
