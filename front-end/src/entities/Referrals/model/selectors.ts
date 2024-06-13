import { createSelector } from 'reselect';

const selectReferrals = (state: RootState) => state.referrals;

export const selectReferralChildren = createSelector(
  [selectReferrals],
  (referrals) => referrals.data.children,
);

export const selectReferralGrandchildren = createSelector(
  [selectReferrals],
  (referrals) => referrals.data.grandchildren,
);

export const selectLoading = createSelector(
  [selectReferrals],
  (referrals) => referrals.loading,
);

export const selectError = createSelector(
  [selectReferrals],
  (referrals) => referrals.error,
);
