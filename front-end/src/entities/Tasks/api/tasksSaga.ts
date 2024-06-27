import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  fetchTasks,
  fetchTasksError,
  fetchTasksSuccess,
  selectTask,
  selectTaskSuccess,
  selectTaskError,
} from '../model/slice';
import { tasksAPI } from './tasksAPI.ts';
import { ITask } from '../type/response.type.ts';
import { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../shared/types';
import { fetchUserSuccess } from '../../User';

function* fetchTasksSaga() {
  try {
    const response: ITask[] = yield call(tasksAPI.getTasks);
    response.sort((a, b) => {
      const valueA = (a.is_claimed === null) ? 0 : !a.is_claimed ? 1 : 2;
      const valueB = (b.is_claimed === null) ? 0 : !b.is_claimed ? 1 : 2;
      return valueA - valueB;
    });
    yield put(fetchTasksSuccess(response));
  } catch (error) {
    yield put(fetchTasksError(error || 'An error occurred'));
  }
}

function* selectTaskSaga({ payload }: PayloadAction<string>) {
  try {
    const user: IUser = yield call(tasksAPI.setTask, { task_name: payload });
    yield put(selectTaskSuccess());
    yield put(fetchUserSuccess(user));
    yield put(fetchTasks());
  } catch (error) {
    yield put(selectTaskError(error || 'An error occurred'));
  }
}

export function* tasksSaga() {
  yield all([
    takeEvery(fetchTasks.type, fetchTasksSaga),
    takeEvery(selectTask.type, selectTaskSaga),
  ]);
}


