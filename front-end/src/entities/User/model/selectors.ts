import { createSelector } from 'reselect';

const selectUser = (state: RootState) => state.user;

export const selectUserCoinCount = createSelector(
  [selectUser],
  (user) => user.data.coins
);

export const selectUserClaimedCoins = createSelector(
  [selectUser],
  (user) => user.claimedCoins
);

export const selectUserTelegramId = createSelector(
  [selectUser],
  (user) => user.data.telegramId
);

export const selectUserRefCode = createSelector(
  [selectUser],
  (user) => user.data.referralCode
);

export const selectUserNextClaimDate = createSelector(
  [selectUser],
  (user) => new Date(user.data.nextClaimDate)
);

export const selectUpgradesDate = createSelector(
  [selectUser],
  (user) => user.upgrades
);

export const selectLoading = createSelector(
  [selectUser],
  (user) => user.loading
);

export const selectError = createSelector(
  [selectUser],
  (user) => user.error
);

export const selectUserGeneralLevel = createSelector(
  [selectUser],
  (user) => Math.min(user.data.luckLevel, user.data.miningLevel, user.data.timeLevel)
);
