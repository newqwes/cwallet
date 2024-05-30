import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchUser, fetchUserError, fetchUserSuccess } from '../model/slice';
import { userAPI } from './userAPI';


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
