import { all } from 'redux-saga/effects';
import { claim, user } from '../entities/User';
import { users } from '../entities/Users';
import { referrals } from '../entities/Referrals';
import { shortGame } from '../entities/ShortGame';
import { tasksSaga } from '../entities/Tasks';

function* rootSaga() {
  yield all([
    claim(),
    user(),
    users(),
    referrals(),
    shortGame(),
    tasksSaga()
  ]);
}

export default rootSaga;
