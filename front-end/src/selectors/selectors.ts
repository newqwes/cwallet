import { createSelector } from 'reselect';
import { RootState } from '../store/store.ts';

const selectUser = (state: RootState) => state.user;

export const selectUserCoinCount = createSelector(
  [selectUser],
  (example) => example.data
);

export const selectLoading = createSelector(
  [selectUser],
  (example) => example.loading
);

export const selectError = createSelector(
  [selectUser],
  (example) => example.error
);
