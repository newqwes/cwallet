import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ClaimState {
  data: any;
  error: any;
  loading: boolean;
}

const initialState: ClaimState = {
  data: null,
  error: null,
  loading: false,
};

const claimReducer = createSlice({
  name: 'claim',
  initialState,
  reducers: {
    claimRequest: (state) => {
      state.loading = true;
    },
    claimSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
    },
    claimFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { claimRequest, claimSuccess, claimFailure } = claimReducer.actions;
export default claimReducer.reducer;
