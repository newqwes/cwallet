import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchDataRequest, fetchDataSuccess, fetchDataFailure } from '../store/userReducer.ts';
import { userAPI } from '../api';

function* fetchDataSaga() {
  try {
    const response: string = yield call(userAPI.getUserData);
    yield put(fetchDataSuccess(response));
  } catch (error) {
    yield put(fetchDataFailure(error || 'An error occurred'));
  }
}

function* watchFetchData() {
  yield takeLatest(fetchDataRequest.type, fetchDataSaga);
}

export default function* user() {
  yield all([watchFetchData()]);
}
