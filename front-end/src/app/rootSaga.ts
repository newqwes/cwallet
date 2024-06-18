import { all } from 'redux-saga/effects';
import { claim, user } from '../entities/User';
import { users } from '../entities/Users';
import { referrals } from '../entities/Referrals';
import { shortGame } from '../entities/ShortGame';

function* rootSaga() {
  yield all([
    claim(),
    user(),
    users(),
    referrals(),
    shortGame()
  ]);
}

export default rootSaga;
