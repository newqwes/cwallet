import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface IUsersState {
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
  }[];
  error: string;
  loading: boolean;
}

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
