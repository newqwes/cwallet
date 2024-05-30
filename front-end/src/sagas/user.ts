import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchUser, fetchUserSuccess, fetchUserError } from '../store/userReducer.ts';
import { userAPI } from '../api';

function* fetchUserSaga() {
  try {
    const response: string = yield call(userAPI.getUser);
    yield put(fetchUserSuccess(response));
  } catch (error) {
    yield put(fetchUserError(error || 'An error occurred'));
  }
}

function* watchFetchUser() {
  yield takeLatest(fetchUser.type, fetchUserSaga);
}

export default function* user() {
  yield all([watchFetchUser()]);
}
