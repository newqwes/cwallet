export interface ShortGameDataInitDataModel {
  user_id: string;
  coin_list_id: string;
  game_period?: string;
}

export interface ShortGameUpdatePlaceDataModel {
  coin_list_id: string;
  place?: number;
  game_ended?: boolean;
  game_period?: Date;
  volatility_result?: number;
  is_shown?: boolean;
  in_progress?: boolean;
  user_id?: string;

  average_place?: number;
  average_volatility_result?: number;
  games_count?: number;
}
