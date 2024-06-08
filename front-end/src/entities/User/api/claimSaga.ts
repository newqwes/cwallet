import { all, call, put, delay, takeLatest } from 'redux-saga/effects';
import { claimCoins, claimCoinsError, claimCoinsSuccess, emptyOutClaimCoins, fetchUser } from '../model/slice';
import { userAPI } from './userAPI';
import { postEvent } from "@tma.js/sdk";

function* claimCoinsSaga() {
  try {
    const response: string = yield call(userAPI.claimCoins);
    yield put(claimCoinsSuccess(response));

    // @ts-expect-error: This error is expected because web_app_trigger_haptic_feedback obj params is empty
    postEvent('web_app_trigger_haptic_feedback', {
      type: 'notification',
      impact_style: 'heavy',
      notification_type: 'success'
    });

    yield delay(2000);
    yield put(emptyOutClaimCoins());
  } catch (error) {
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
