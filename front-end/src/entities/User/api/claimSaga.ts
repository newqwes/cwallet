import { all, call, put, takeLatest } from 'redux-saga/effects';
import { claimCoins, claimCoinsError, claimCoinsSuccess } from '../model/slice';
import { userAPI } from './userAPI';

function* claimCoinsSaga() {
  try {
    const response: string = yield call(userAPI.claimCoins);
    yield put(claimCoinsSuccess(response));
  } catch (error) {
    yield put(claimCoinsError(error || 'An error occurred while claiming coins'));
  }
}

function* watchClaimCoins() {
  yield takeLatest(claimCoins.type, claimCoinsSaga);
}

export function* claim() {
  yield all([watchClaimCoins()]);
}
