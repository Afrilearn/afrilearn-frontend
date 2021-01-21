import { GET_SUBJECT_AND_RELATED_LESSONS_SUCCESS } from "../actions/types";

const initialState = {
  subject: {},
  lessonSubjectName:'',
  lessonSubjectId:''
};

const subjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUBJECT_AND_RELATED_LESSONS_SUCCESS:
      return {
        ...state,
        subject: action.payload.subject,
        lessonSubjectName:action.payload.subject.mainSubjectId.name,
        lessonSubjectId:action.payload.subject._id
      };

    default:
      return state;
  }
};
export default subjectReducer;
