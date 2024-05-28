import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  data: any;
  error: any;
  loading: boolean;
  coins: number | null;
}

const initialState: UserState = {
  data: null,
  error: null,
  loading: false,
  coins: null,
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchDataRequest: (state) => {
      state.loading = true;
    },
    fetchDataSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
      state.coins = action.payload?.user?.coins || null;
    },
    fetchDataFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataRequest, fetchDataSuccess, fetchDataFailure } = userReducer.actions;
export default userReducer.reducer;
