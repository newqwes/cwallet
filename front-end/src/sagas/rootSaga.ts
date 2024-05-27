import { all } from 'redux-saga/effects';

import refresh from './refresh';
import user from './user';

function* rootSaga() {
  yield all([refresh(), user()]);
}

export default rootSaga;
