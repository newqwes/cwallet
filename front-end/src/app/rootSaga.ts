import { all } from 'redux-saga/effects';
import claim from '../entities/User/api/claimSaga';
import user from '../entities/User/api/userSaga';

function* rootSaga() {
  yield all([claim(), user()]);
}

export default rootSaga;
