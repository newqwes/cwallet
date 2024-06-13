import { all, call, put, takeLatest, select, delay } from 'redux-saga/effects';
import { fetchReferrals, fetchReferralsError, fetchReferralsSuccess } from '../model/slice';
import { referralsAPI } from './referralsAPI.ts';
import { IUser } from "../../../shared/types";
import { selectUserTelegramId } from "../../User/model/selectors.ts";

function* fetchReferralsSaga() {
  try {
    const response: { users: IUser[] } = yield call(referralsAPI.getReferrals);
    let children: IUser[] = [];
    let grandchildren: IUser[] = [];

    // не успевает загрузиться telegramId
    yield delay(100);
    const telegramId: number = yield select(selectUserTelegramId);
    if (response?.users) {
      children = response.users.filter(user => user.refParent === telegramId);
      grandchildren = response.users.filter(user => user.refGrandParent === telegramId);
    }

    yield put(fetchReferralsSuccess({children, grandchildren}));
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
