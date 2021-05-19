import {
  GET_SUBJECT_AND_RELATED_LESSONS_SUCCESS,
  ADD_SUBJECT_PROGRESS_SUCCESS,
  ADD_RECENT_ACTIVITIES_SUCCESS,
  GET_SINGLE_LESSON_SUCCESS,
} from "../actions/types";

const initialState = {
  subject: {},
  lessonSubjectName: "",
  lessonSubjectId: "",
  lessonCourseId:"",
  totalNumberOfLessons: 0,
  subjectProgresses: [],
  numOfUsers:0,
  lesson:{}

};

const subjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUBJECT_AND_RELATED_LESSONS_SUCCESS:
      return {
        ...state,
        subject: action.payload.subject,
        lessonSubjectName: action.payload.subject.mainSubjectId.name,
        lessonSubjectId: action.payload.subject._id,
        lessonCourseId:action.payload.subject.courseId.id,
        numOfUsers: action.payload.numOfUsers
      };
    case ADD_SUBJECT_PROGRESS_SUCCESS:
      return {
        ...state,
      };
    case ADD_RECENT_ACTIVITIES_SUCCESS:
      return {
        ...state,
      };
    case GET_SINGLE_LESSON_SUCCESS:
      return {
        ...state,
        lesson: action.payload.lesson     
      };
    default:
      return state;
  }
};
export default subjectReducer;
