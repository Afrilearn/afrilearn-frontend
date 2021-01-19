import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import courseReducer from "./courseReducer";
import paymentReducer from "./paymentReducer";
import subjectReducer from "./subjectReducer";
import classReducer from "./classReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  course: courseReducer,
  payment: paymentReducer,
  class: classReducer,
  subject: subjectReducer,
});
