import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import successReducer from "./successReducer";
import courseReducer from "./courseReducer";
import paymentReducer from "./paymentReducer";
import subjectReducer from "./subjectReducer";
import classReducer from "./classReducer";
import pastQuestionsReducer from "./pastQuestionsReducer";
import searchReducer from "./searchReducer";
import parentReducer from "./parentReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  success: successReducer,
  course: courseReducer,
  payment: paymentReducer,
  class: classReducer,
  subject: subjectReducer,
  search: searchReducer,
  pastQuestion: pastQuestionsReducer,
  parent: parentReducer,
});
