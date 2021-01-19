import { GET_SINGLE_CLASS_SUCCESS } from "../actions/types";

const initialState = {
  class: {},
  classMembers: [],
};

const classReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_CLASS_SUCCESS:
      return {
        ...state,
        class: action.payload.class,
        classMembers: action.payload.classMembers,
      };

    default:
      return state;
  }
};
export default classReducer;
