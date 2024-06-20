import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGameCoin, ISelectedCoinData, IShortGame, IGamePeriod } from "../../../shared/types";

interface IShortGameState {
  isActive: boolean;
  selectedCoinData: ISelectedCoinData | null;
  gameCoins: IGameCoin[];
  gamePeriod: IGamePeriod;
  isShow: boolean;
  history: ISelectedCoinData[];

  error: string | null;
  loading: boolean;
}

const initialState: IShortGameState = {
  isActive: false,
  selectedCoinData: null,
  gameCoins: [],
  gamePeriod: { start: '', progress: '', end: '' },
  isShow: true,
  history: [],

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
    fetchShortGameDataSuccess: (state, { payload }: PayloadAction<IShortGame>) => {
      state.loading = false;
      state.error = null;

      state.isActive = payload.is_active;
      state.selectedCoinData = payload.selected_coin_data;
      state.gameCoins = payload.game_coins;
      state.gamePeriod = payload.game_period;
      state.isShow = payload.is_shown;
      state.history = payload.history;
    },
    selectShortGameCoinSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    fetchShortGameDataError: (state, action: PayloadAction<any>) => {
      state = initialState;
      state.error = action.payload;
    },
    selectShortGameCoinError: (state, action: PayloadAction<any>) => {
      state = initialState;
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
