import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILevelData, IUser } from '../../../shared/types';

interface IUserState {
  /**
   * @see {@link ./back-end/src/dto/userDto.ts} Types for user
   */
  data: IUser;
  error: string | null;
  loading: boolean;
  claimedCoins: number | null;
  upgrades: ILevelData[];
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
  upgrades: []
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
      state.data = {
        ...action.payload.user,
        nextClaimDate: new Date(action.payload?.user?.nextClaimDate).toISOString()
      };
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
    fetchUpgrades: (state) => {
      state.loading = true;
    },
    fetchUpgradesSuccess: (state, action: PayloadAction<ILevelData[]>) => {
      state.loading = false;
      state.upgrades = action.payload;
    },
    fetchUpgradesError: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // @ts-ignore
    upgradeLevel: (state, { payload }: PayloadAction<string>) => {
      state.loading = true;
    },
    // @ts-ignore
    upgradeLevelSuccess: (state, { payload }: PayloadAction<{ success: boolean }>) => {
      state.loading = false;
    },
    upgradeLevelError: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  fetchUser,
  fetchUserSuccess,
  fetchUserError,
  claimCoins,
  claimCoinsSuccess,
  claimCoinsError,
  emptyOutClaimCoins,
  fetchUpgradesSuccess,
  fetchUpgrades,
  fetchUpgradesError,
  upgradeLevel,
  upgradeLevelSuccess,
  upgradeLevelError
} = userSlice.actions;
