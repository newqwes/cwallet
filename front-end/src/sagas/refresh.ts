import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchDataRequest, fetchDataSuccess, fetchDataFailure } from '../store/userReducer.ts';
import { refreshAPI } from '../api';

function* fetchDataSaga() {
  try {
    const response: string = yield call(refreshAPI.refresh);
    yield put(fetchDataSuccess(response));
  } catch (error) {
    yield put(fetchDataFailure(error || 'An error occurred'));
  }
}

function* watchFetchData() {
  yield takeLatest(fetchDataRequest.type, fetchDataSaga);
}

export default function* refresh() {
  yield all([watchFetchData()]);
}
