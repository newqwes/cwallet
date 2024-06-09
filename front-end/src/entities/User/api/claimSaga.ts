import { all, call, put, delay, takeLatest } from 'redux-saga/effects';
import { claimCoins, claimCoinsError, claimCoinsSuccess, emptyOutClaimCoins, fetchUser } from '../model/slice';
import { vibrateNow } from '../../../shared/libs/vibration';
import { userAPI } from './userAPI';

function* claimCoinsSaga() {
  try {
    const response: string = yield call(userAPI.claimCoins);
    yield put(claimCoinsSuccess(response));

    vibrateNow('success');
    yield delay(2000);
    yield put(emptyOutClaimCoins());
  } catch (error) {
    vibrateNow('error');
    yield put(fetchUser());
    yield put(claimCoinsError(error || 'An error occurred while claiming coins'));
  }
}

function* watchClaimCoins() {
  yield takeLatest(claimCoins.type, claimCoinsSaga);
}

export function* claim() {
  yield all([watchClaimCoins()]);
}
