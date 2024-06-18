import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  fetchShortGameData,
  fetchShortGameDataSuccess,
  fetchShortGameDataError,
  selectShortGameCoin, selectShortGameCoinSuccess, selectShortGameCoinError
} from '../model/slice';
import { shortGameAPI } from './shortGameAPI';
import { IShortGame, IAlreadyExistShortGame } from "../../../shared/types";
import { PayloadAction } from "@reduxjs/toolkit";

function* fetchSortedDataByShortGameSaga() {
  try {
    const { final_result, already_selected }: {
      final_result: IShortGame[],
      already_selected: IAlreadyExistShortGame
    } = yield call(shortGameAPI.getSortedDataByShortGame);

    yield put(fetchShortGameDataSuccess({ final_result, already_selected }));
  } catch (error) {
    yield put(fetchShortGameDataError(error || 'An error occurred'));
  }
}

function* selectShortGameCoinSaga({ payload }: PayloadAction<string>) {
  try {
    console.log('--QWES-- saga payload: ', payload);
    const response: IAlreadyExistShortGame = yield call(shortGameAPI.selectShortGameCoin, { coin_id: payload });
    yield put(selectShortGameCoinSuccess(response));
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
