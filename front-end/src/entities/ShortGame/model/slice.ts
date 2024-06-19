import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAlreadyExistShortGame, IShortGame } from "../../../shared/types";

interface IShortGameState {
  data: IShortGame[];
  error: string | null;
  loading: boolean;
  place: number | undefined | null;
  game_period: string | undefined | null;
  game_ended: boolean | undefined | null;
  coin_list_id: string | undefined | null;
}

interface FinalResult {
  final_result: IShortGame[];
  already_selected?: {
    place: number | undefined;
    game_period: string | undefined;
    game_ended: boolean | undefined;
    coin_list_id: string | undefined;
  };
}

const initialState: IShortGameState = {
  data: [],
  place: null,
  game_period: null,
  game_ended: null,
  coin_list_id: null,
  error: null,
  loading: false,
};

export const shortGameSlice = createSlice({
  name: 'shortGame',
  initialState,
  reducers: {
    fetchShortGameData: (state) => {
      state.loading = true;
    },
    // @ts-ignore
    selectShortGameCoin: (state, { payload }: PayloadAction<string>) => {
      state.loading = true;
    },
    fetchShortGameDataSuccess: (state, { payload }: PayloadAction<FinalResult>) => {
      state.loading = false;
      state.data = payload?.final_result;

      const { place, game_period, game_ended, coin_list_id } = payload.already_selected || {};

      if (payload.already_selected) {
        state.place = place;
        state.game_period = game_period;
        state.game_ended = game_ended;
        state.coin_list_id = coin_list_id;
      }
      state.error = null;
    },
    selectShortGameCoinSuccess: (state, { payload }: PayloadAction<IAlreadyExistShortGame>) => {
      state.loading = false;
      state.place = payload.place;
      state.game_period = payload.game_period;
      state.game_ended = payload.game_ended;
      state.coin_list_id = payload.coin_list_id;
      state.error = null;
    },
    fetchShortGameDataError: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
    selectShortGameCoinError: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchShortGameData,
  fetchShortGameDataSuccess,
  fetchShortGameDataError,
  selectShortGameCoin,
  selectShortGameCoinSuccess,
  selectShortGameCoinError
} = shortGameSlice.actions;
