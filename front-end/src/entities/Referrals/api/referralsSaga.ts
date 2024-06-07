import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchReferrals, fetchReferralsError, fetchReferralsSuccess } from '../model/slice';
import { referralsAPI } from './referralsAPI.ts';


function* fetchReferralsSaga() {
  try {
    const response: string = yield call(referralsAPI.getReferrals);
    yield put(fetchReferralsSuccess(response));
  } catch (error) {
    yield put(fetchReferralsError(error || 'An error occurred'));
  }
}

function* watchFetchReferrals() {
  yield takeLatest(fetchReferrals.type, fetchReferralsSaga);
}

export function* referrals() {
  yield all([watchFetchReferrals()]);
}
