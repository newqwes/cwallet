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
  selectUserNextClaimDate,
  selectLoading,
  selectError,
} from './model/selectors';
