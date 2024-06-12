import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../shared/types';


interface IUserState {
  /**
   * @see {@link ./back-end/src/dto/userDto.ts} Types for user
   */
  data: IUser;
  error: string | null;
  loading: boolean;
  claimedCoins: number | null;
}

const initialState: IUserState = {
  data: {
    id: 'unknowId',
    telegramId: 0,
    firstName: 'firstName',
    lastName: 'lastName',
    languageCode: 'en',
    nextClaimDate: '',
    coins: 0,
    avatar: 'avatar',
    referralCode: null,
    refParent: null,
    refParentChangedTimes: 0,
    referralRewards: 0,
    luckLevel: 1,
    timeLevel: 1,
    miningLevel: 1,
    secretLevel: 1,
    refGrandParent: 0
  },
  claimedCoins: null,
  error: null,
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
      state.data = {...action.payload.user, nextClaimDate: new Date(action.payload?.user?.nextClaimDate).toISOString()};
      state.claimedCoins = null;
      state.error = null;
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
      state.claimedCoins = action.payload.coins - state.data.coins;
      state.data.coins = action.payload.coins;
      state.data.nextClaimDate = new Date(action.payload.nextClaimDate).toISOString();
      state.error = null;
    },
    claimCoinsError: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
    emptyOutClaimCoins: (state) => {
      state.claimedCoins = null;
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
  emptyOutClaimCoins
} = userSlice.actions;
