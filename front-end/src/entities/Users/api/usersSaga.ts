import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchUsers, fetchUsersError, fetchUsersSuccess } from '../model/slice';
import { usersAPI } from './usersAPI.ts';


function* fetchUsersSaga() {
  try {
    const response: string = yield call(usersAPI.getUsers);
    yield put(fetchUsersSuccess(response));
  } catch (error) {
    yield put(fetchUsersError(error || 'An error occurred'));
  }
}

function* watchFetchUsers() {
  yield takeLatest(fetchUsers.type, fetchUsersSaga);
}

export default function* users() {
  yield all([watchFetchUsers()]);
}
