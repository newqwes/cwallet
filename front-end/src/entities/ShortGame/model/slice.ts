import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAlreadyExistShortGame, IShortGame } from "../../../shared/types";

interface IShortGameState {
  data: IShortGame[];
  error: string | null;
  loading: boolean;
  place: number | undefined | null;
  game_period: string | undefined | null;
  game_ended: boolean | undefined | null;
}

interface FinalResult {
  final_result: IShortGame[];
  already_selected?: {
    place: number | undefined;
    game_period: string | undefined;
    game_ended: boolean | undefined;
  };
}

const initialState: IShortGameState = {
  data: [],
  place: null,
  game_period: null,
  game_ended: null,
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
    selectShortGameCoin: (state, { payload }: PayloadAction<string>) => {
      state.loading = true;
      console.log('--QWES-- selectShortGameCoin payload: ', payload);
    },
    fetchShortGameDataSuccess: (state, { payload }: PayloadAction<FinalResult>) => {
      state.loading = false;
      state.data = payload?.final_result;

      const { place, game_period, game_ended } = payload.already_selected || {};

      if (payload.already_selected) {
        state.place = place;
        state.game_period = game_period;
        state.game_ended = game_ended;
      }
      state.error = null;
    },
    selectShortGameCoinSuccess: (state, { payload }: PayloadAction<IAlreadyExistShortGame>) => {
      state.loading = false;
      state.place = payload.place;
      state.game_period = payload.game_period;
      state.game_ended = payload.game_ended;
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
