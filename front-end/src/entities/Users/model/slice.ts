import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUsersState } from './types';


const initialState: IUsersState = {
  data: [],
  error: '',
  loading: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsers: (state) => {
      state.loading = true;
    },
    fetchUsersSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchUsersError: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchUsers,
  fetchUsersSuccess,
  fetchUsersError,
} = usersSlice.actions;
