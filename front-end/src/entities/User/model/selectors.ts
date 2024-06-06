import { createSelector } from 'reselect';

const selectUser = (state: RootState) => state.user;

export const selectUserCoinCount = createSelector(
  [selectUser],
  (user) => user.data.coins
);

export const selectUserRefCode = createSelector(
  [selectUser],
  (user) => user.data.referralCode
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
