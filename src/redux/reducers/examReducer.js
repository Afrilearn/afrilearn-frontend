import {
  GET_EXAMS_SUCCESS,
  EXAM_INPUT_CHANGE,
  GET_EXAM_SUCCESS,
  UPDATE_EXAM_SUCCESS,
  GET_QUESTIONS_SUCCESS,
  GET_RESULT_SUCCESS,
  UPDATE_RESULT_SUCCESS,
  GET_STUDENT_EXAMS_SUCCESS,
  GET_EXAMINATION_INFORMATION_SUCCESS
} from "../actions/types";

const initialState = {
  questions: [],
  exams: [],
  result: {},
  exam: {},
  studentExam: {},
  examinationInfo: {}
};

const examReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXAM_INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: action.payload,
      };

    case GET_EXAMS_SUCCESS:
      return {
        ...state,
        exams: action.payload,
      };

    case GET_EXAM_SUCCESS:
      return {
        ...state,
        exam: action.payload,
      };

    case UPDATE_RESULT_SUCCESS:
    case GET_RESULT_SUCCESS:
      return {
        ...state,
        result: action.payload,
      };

    case UPDATE_EXAM_SUCCESS:
      const examIndex = state.exams.findIndex(
        (i) => i._id == action.payload._id
      );
      return {
        ...state,
        exam: action.payload,
        exams: state.exams.splice(examIndex, 1, action.payload),
      };
    case GET_STUDENT_EXAMS_SUCCESS:
      return {
        ...state,
        studentExam: action.payload,
      };
    case GET_EXAMINATION_INFORMATION_SUCCESS:
      localStorage.setItem("subjectName", action.payload.subjectId?.mainSubjectId.name);
      localStorage.setItem("term", action.payload.termId?.name);
      localStorage.setItem("duration", action.payload.duration * 1000 * 60);
      return {
        ...state,
        examinationInfo: action.payload,
      };
    default:
      return state;
  }
};
export default examReducer;
