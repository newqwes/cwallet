export interface ShortGameCoinsInitDataModel {
  coin_list_id: string;
  start_price: number;
  volatility: number;
}

export interface ShortGameCoinsUpdateVolatility {
  id: string;
  volatility: number;
}
