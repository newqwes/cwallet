import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RefreshState {
  data: any;
  error: any;
  loading: boolean;
}

const initialState: RefreshState = {
  data: null,
  error: null,
  loading: false,
};

const refreshReducer = createSlice({
  name: 'refresh',
  initialState,
  reducers: {
    makeRefreshRequest: (state) => {
      state.loading = true;
    },
    makeRefreshSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
    },
    makeRefreshFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { makeRefreshRequest, makeRefreshSuccess, makeRefreshFailure } = refreshReducer.actions;
export default refreshReducer.reducer;
