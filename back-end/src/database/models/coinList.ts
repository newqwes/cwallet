import { Model, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import sequelize from '..';

class CoinList extends Model {
  id: string;
  coin_id: string;
  market_cap_rank: number;
  market_cap: number;
  symbol: string;
  name: string;
  image_link: string;
  current_price: number;
  last_updated: string;
  historical_chart_active: boolean;
  historical_chart_prices: any[];
}

CoinList.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    coin_id: { type: DataTypes.STRING, allowNull: false },
    market_cap_rank: { type: DataTypes.FLOAT },
    market_cap: { type: DataTypes.FLOAT },
    symbol: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    image_link: { type: DataTypes.STRING, allowNull: false },
    current_price: { type: DataTypes.FLOAT, allowNull: false },
    last_updated: { type: DataTypes.STRING, allowNull: false },
    historical_chart_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    historical_chart_prices: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'coin_list',
    timestamps: false,
    underscored: true,
  }
);

export default CoinList;
