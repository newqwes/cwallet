import { all } from 'redux-saga/effects';

import claim from './claim';
import user from './user';

function* rootSaga() {
  yield all([claim(), user()]);
}

export default rootSaga;
