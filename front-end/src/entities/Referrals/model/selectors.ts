import { createSelector } from 'reselect';

const selectReferrals = (state: RootState) => state.referrals;

export const selectReferralChilds = createSelector(
  [selectReferrals],
  (referrals) => referrals.data.childs,
);

export const selectLoading = createSelector(
  [selectReferrals],
  (referrals) => referrals.loading,
);

export const selectError = createSelector(
  [selectReferrals],
  (referrals) => referrals.error,
);
