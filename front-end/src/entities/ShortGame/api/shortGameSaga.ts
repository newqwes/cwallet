import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  fetchShortGameData,
  fetchShortGameDataSuccess,
  fetchShortGameDataError,
  selectShortGameCoin, selectShortGameCoinSuccess, selectShortGameCoinError
} from '../model/slice';
import { shortGameAPI } from './shortGameAPI';
import { IShortGame } from "../../../shared/types";
import { PayloadAction } from "@reduxjs/toolkit";

function* fetchSortedDataByShortGameSaga() {
  try {
    const data: IShortGame = yield call(shortGameAPI.getSortedDataByShortGame);

    yield put(fetchShortGameDataSuccess(data));
  } catch (error) {
    yield put(fetchShortGameDataError(error || 'An error occurred'));
  }
}

function* selectShortGameCoinSaga({ payload }: PayloadAction<string>) {
  try {
    yield call(shortGameAPI.selectShortGameCoin, { coin_id: payload });
    yield put(selectShortGameCoinSuccess());
    yield put(fetchShortGameData());
  } catch (error) {
    yield put(selectShortGameCoinError(error || 'An error occurred'));
  }
}

export function* shortGame() {
  yield all([
    takeEvery(fetchShortGameData.type, fetchSortedDataByShortGameSaga),
    // @ts-ignore
    takeEvery(selectShortGameCoin.type, selectShortGameCoinSaga),
  ]);
}
