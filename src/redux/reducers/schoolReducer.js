import {
  ACCEPT_REJECT_SCHOOL_ADMIN_REQUEST_SUCCESS,
  ACCEPT_REJECT_SCHOOL_TEACHER_REQUEST_SUCCESS,
} from "../actions/types";

const initialState = {
  schools: [],
  school: {},
};

const schoolReducer = (state = initialState, action) => {
  let arr;
  switch (action.type) {
    case ACCEPT_REJECT_SCHOOL_TEACHER_REQUEST_SUCCESS:
      return {
        ...state,
      };
    case ACCEPT_REJECT_SCHOOL_ADMIN_REQUEST_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default schoolReducer;
