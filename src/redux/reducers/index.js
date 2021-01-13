import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import courseReducer from './courseReducer';

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  course: courseReducer,  
});
