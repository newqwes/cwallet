import { combineReducers } from 'redux';
import { userSlice } from '../entities/User';
import { usersSlice } from '../entities/Users';
import { referralsSlice } from '../entities/Referrals';
import { shortGameSlice } from '../entities/ShortGame';
import { tasksSlice } from '../entities/Tasks';

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [usersSlice.name]: usersSlice.reducer,
  [referralsSlice.name]: referralsSlice.reducer,
  [shortGameSlice.name]: shortGameSlice.reducer,
  [tasksSlice.name]: tasksSlice.reducer
});

export default rootReducer;
