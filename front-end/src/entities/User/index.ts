export {
  userSlice,
  fetchUser,
  fetchUserSuccess,
  fetchUserError,
  claimCoins,
  claimCoinsSuccess,
  claimCoinsError,
} from './model/slice';
export {
  selectUserCoinCount,
  selectUserRefCode,
  selectUserNextClaimDate,
  selectLoading,
  selectError,
} from './model/selectors';
