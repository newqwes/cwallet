import { createSelector } from 'reselect';
import { RootState } from '../store/store.ts';

const selectUser = (state: RootState) => state.user;

export const selectUserCoinCount = createSelector(
  [selectUser],
  (user) => user.data.coins
);

export const selectUserNextClaimDate = createSelector(
  [selectUser],
  (user) => user.data.nextClaimDate
);

export const selectLoading = createSelector(
  [selectUser],
  (user) => user.loading
);

export const selectError = createSelector(
  [selectUser],
  (user) => user.error
);
