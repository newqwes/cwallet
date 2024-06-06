import { all } from 'redux-saga/effects';
import claim from '../entities/User/api/claimSaga';
import user from '../entities/User/api/userSaga';
import users from '../entities/Users/api/usersSaga';

function* rootSaga() {
  yield all([claim(), user(), users()]);
}

export default rootSaga;
