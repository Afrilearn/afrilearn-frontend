import { GET_SUBJECT_AND_RELATED_LESSONS_SUCCESS } from "../actions/types";

const initialState = {
  subject: {},
};

const subjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUBJECT_AND_RELATED_LESSONS_SUCCESS:
      return {
        ...state,
        subject: action.payload.subject,
      };

    default:
      return state;
  }
};
export default subjectReducer;
