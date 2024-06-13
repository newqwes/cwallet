import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../shared/types';

interface IReferralsState {
  data: {
    children: Array<IUser>,
    grandchildren: Array<IUser>,
    parent: IUser | null,
    referralCode: string | null,
  };
  error: string;
  loading: boolean;
}

const initialState: IReferralsState = {
  data: {
    children: [],
    grandchildren: [],
    parent: null,
    referralCode: null,
  },
  error: '',
  loading: false,
};

export const referralsSlice = createSlice({
  name: 'referrals',
  initialState,
  reducers: {
    fetchReferrals: (state) => {
      state.loading = true;
    },
    fetchReferralsSuccess: (state, action: PayloadAction<{ children: Array<IUser>, grandchildren: Array<IUser> }>) => {
      state.loading = false;
      state.error = '';
      state.data.children = action.payload.children;
      state.data.grandchildren = action.payload.grandchildren;
    },
    fetchReferralsError: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // TODO:
    // add changeReferralParent
    // add changeReferralName
  },
});

export const {
  fetchReferrals,
  fetchReferralsSuccess,
  fetchReferralsError,
} = referralsSlice.actions;
