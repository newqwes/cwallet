export interface ICoinInfo {
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
  historical_chart_prices: number[][]; // [[*date*, *price*], [1718150400000, 6.3795764], [], [], ..., []]
}

export interface IShortGame {
  coin_list_id: string;
  start_price: number;
  volatility: number;
  coin_info: ICoinInfo
}

export interface IAlreadyExistShortGame {
  id: string;
  start_price: number;
  place: number;
  game_ended: boolean;
  user_id: string;
  coin_list_id: string;
  game_period: string;
}
