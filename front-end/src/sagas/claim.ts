import { all, call, put, takeLatest } from 'redux-saga/effects';
import { claimAPI } from '../api';
import { claimCoins, claimCoinsError, claimCoinsSuccess } from '../store/userReducer.ts';

function* claimCoinsSaga() {
  try {
    const response: string = yield call(claimAPI.claimCoins);
    yield put(claimCoinsSuccess(response));
  } catch (error) {
    yield put(claimCoinsError(error || 'An error occurred while claiming coins'));
  }
}

function* watchClaimCoins() {
  yield takeLatest(claimCoins.type, claimCoinsSaga);
}

export default function* claim() {
  yield all([watchClaimCoins()]);
}
