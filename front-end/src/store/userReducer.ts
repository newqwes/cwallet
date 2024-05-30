import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
  data: {
    id: string;
    telegramId: number;
    firstName: string;
    lastName: string;
    languageCode: string;
    nextDateUpdate: Date;
    coins: number;
    avatar: string;
    level: number;
  };
  error: string;
  loading: boolean;
}

const initialState: IUserState = {
  data: {
    id: 'unknowId',
    telegramId: 0,
    firstName: 'firstName',
    lastName: 'lastName',
    languageCode: 'en',
    nextDateUpdate: new Date(),
    coins: 0,
    avatar: 'avatar',
    level: 0,
  },
  error: '',
  loading: false,
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUser: (state) => {
      state.loading = true;
    },
    fetchUserSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload.user;
    },
    fetchUserError: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
    claimCoins: (state) => {
      state.loading = true;
    },
    claimCoinsSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data.coins = action.payload.claimedCoins;
      state.data.nextDateUpdate = action.payload.nextDate;
    },
    claimCoinsError: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchUser,
  fetchUserSuccess,
  fetchUserError,
  claimCoins,
  claimCoinsSuccess,
  claimCoinsError,
} = userReducer.actions;
export default userReducer.reducer;
