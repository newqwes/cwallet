import { all, call, put, takeLatest } from 'redux-saga/effects';
import { claimRequest, claimFailure, claimSuccess } from '../store/claimReducer.ts';
import { claimAPI } from '../api';

function* claimSaga() {
  try {
    const response: string = yield call(claimAPI.claim);
    yield put(claimSuccess(response));
  } catch (error) {
    yield put(claimFailure(error || 'An error occurred'));
  }
}

function* watchClaim() {
  yield takeLatest(claimRequest.type, claimSaga);
}

export default function* claim() {
  yield all([watchClaim()]);
}
