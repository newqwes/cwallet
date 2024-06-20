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

export interface IGameCoin {
  coin_list_id: string;
  start_price: number;
  volatility: number;
  coin_info: ICoinInfo
}

export interface IShortGame {
  is_active: boolean; // Time when users can chose coin
  selected_coin_data: ISelectedCoinData;
  game_coins: IGameCoin[];
  game_period: IGamePeriod;
  is_shown: boolean;
  history: ISelectedCoinData[];
}

export interface IGamePeriod {
  start: Date | string;
  progress: Date | string;
  end: Date | string;
}

export interface ISelectedCoinData {
  id: string;
  user_id: number;
  coin_list_id: string;
  place: number;
  game_ended: boolean;
  volatility_result: number;
  is_shown: boolean;
  in_progress: boolean;
  is_paid: boolean;
  game_period: string;
  created_at: string;
  createdAt: string;
  updated_at: string;
  updatedAt: string;
}
