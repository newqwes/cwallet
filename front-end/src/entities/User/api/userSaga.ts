import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  fetchUser,
  fetchUserError,
  fetchUserSuccess,
  fetchUpgradesSuccess,
  fetchUpgrades,
  upgradeLevelSuccess,
  upgradeLevelError,
  fetchUpgradesError,
  upgradeLevel
} from '../model/slice';
import { userAPI } from './userAPI';
import { ILevelData } from '../../../shared/types';
import { PayloadAction } from '@reduxjs/toolkit';


function* fetchUserSaga() {
  try {
    const response: string = yield call(userAPI.getUser);
    yield put(fetchUserSuccess(response));
  } catch (error) {
    yield put(fetchUserError(error || 'An error occurred'));
  }
}

function* fetchUpgradesSaga() {
  try {
    const response: ILevelData[] = yield call(userAPI.levels);
    yield put(fetchUpgradesSuccess(response));
  } catch (error) {
    yield put(fetchUpgradesError(error || 'An error occurred'));
  }
}

function* upgradeLevelSaga({ payload }: PayloadAction<string>) {
  try {
    const response: { success: boolean } = yield call(userAPI.upgradeLevel, { level_name: payload });
    yield put(upgradeLevelSuccess(response));
    yield put(fetchUser());
    yield put(fetchUpgrades());
  } catch (error) {
    yield put(upgradeLevelError(error || 'An error occurred'));
  }
}

export function* user() {
  yield all([
    takeEvery(fetchUser.type, fetchUserSaga),
    takeEvery(fetchUpgrades.type, fetchUpgradesSaga),
    takeEvery(upgradeLevel.type, upgradeLevelSaga)
  ]);
}
