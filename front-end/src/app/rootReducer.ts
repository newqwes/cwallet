import { combineReducers } from 'redux';
import { userSlice } from '../entities/User';
import { usersSlice } from '../entities/Users';
import { referralsSlice } from '../entities/Referrals';

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [usersSlice.name]: usersSlice.reducer,
  [referralsSlice.name]: referralsSlice.reducer,
});

export default rootReducer;
