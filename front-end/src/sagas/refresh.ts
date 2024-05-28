import { all, call, put, takeLatest } from 'redux-saga/effects';
import { makeRefreshRequest, makeRefreshFailure, makeRefreshSuccess } from '../store/refreshReducer.ts';
import { refreshAPI } from '../api';

function* makeRefreshSaga() {
  try {
    console.log('makeRefreshSaga');
    const response: string = yield call(refreshAPI.refresh);
    yield put(makeRefreshSuccess(response));
  } catch (error) {
    yield put(makeRefreshFailure(error || 'An error occurred'));
  }
}

function* watchMakeRefresh() {
  yield takeLatest(makeRefreshRequest.type, makeRefreshSaga);
}

export default function* refresh() {
  yield all([watchMakeRefresh()]);
}
