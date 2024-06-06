import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface IUserState {
  /**
   * @see {@link ./back-end/src/dto/userDto.ts} Types for user
   */
  data: {
    id: string;
    telegramId: number;
    firstName: string;
    lastName: string;
    languageCode: string;
    nextClaimDate: Date;
    coins: number;
    avatar: string;
    level: number;
    referralCode: string | null;
    refParent: number | null;
    refParentChangedTimes: number;
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
    nextClaimDate: new Date(),
    coins: 0,
    avatar: 'avatar',
    level: 0,
    referralCode: null,
    refParent: null,
    refParentChangedTimes: 0
  },
  error: '',
  loading: false,
};

export const userSlice = createSlice({
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
      state.data.coins = action.payload.coins;
      state.data.nextClaimDate = action.payload.nextClaimDate;
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
} = userSlice.actions;
