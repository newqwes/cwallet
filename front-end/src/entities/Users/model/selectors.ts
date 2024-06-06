import { createSelector } from 'reselect';

const selectUsers = (state: RootState) => state.users;

export const selectUsersData = createSelector(
  [selectUsers],
  (users) => users.data
);

export const selectLoading = createSelector(
  [selectUsers],
  (users) => users.loading
);

export const selectError = createSelector(
  [selectUsers],
  (users) => users.error
);
