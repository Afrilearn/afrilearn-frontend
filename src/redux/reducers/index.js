import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import courseReducer from './courseReducer';
import paymentReducer from './paymentReducer';

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  course: courseReducer, 
  payment: paymentReducer 
});
