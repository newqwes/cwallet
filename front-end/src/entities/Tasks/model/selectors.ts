import { createSelector } from 'reselect';

const selectTasks = (state: RootState) => state.tasks;

export const selectTasksData = createSelector(
  [selectTasks],
  (referrals) => referrals.tasks,
);
