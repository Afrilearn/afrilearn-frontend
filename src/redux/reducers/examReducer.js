import {
  GET_EXAMS_SUCCESS,
  EXAM_INPUT_CHANGE,
  GET_EXAM_SUCCESS,
  UPDATE_EXAM_SUCCESS,
  GET_QUESTIONS_SUCCESS,
  GET_RESULT_SUCCESS,
  UPDATE_RESULT_SUCCESS,
  GET_EXAM_TYPES_SUCCESS,
  ADD_EXAM_SUCCESS,
  GET_TERMS_SUCCESS,
  ADD_EXAM_QUESTION_SUCCESS,
  UPDATE_EXAM_QUESTION_SUCCESS,
  DELETE_QUESTION_SUCCESS,
} from "../actions/types";

const initialState = {
  questions: [],
  examTypes: [],
  terms: [],
  exams: [],
  result: {},
  exam: { questions: [] },
  addExamStatus: "pending",
  addingExam: false,
  loadingExams: false,
  selcetedQuestion: {},
};

const examReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXAM_INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case UPDATE_EXAM_QUESTION_SUCCESS:
      const upQuestionIndex = state.exam.questions.findIndex(
        (i) => i._id === action.payload._id
      );
      const questions = state.exam.questions;
      questions.splice(upQuestionIndex, 1, action.payload);
      return {
        ...state,
        exam: { ...state.exam, questions: [...questions] },
      };
    case ADD_EXAM_QUESTION_SUCCESS:
      return {
        ...state,
        exam: {
          ...state.exam,
          questions: [...state.exam.questions, action.payload],
        },
      };
    case GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: action.payload,
      };

    case GET_TERMS_SUCCESS:
      return {
        ...state,
        terms: action.payload,
      };

    case GET_EXAMS_SUCCESS:
      return {
        ...state,
        exams: action.payload,
      };
    case GET_EXAM_TYPES_SUCCESS:
      return {
        ...state,
        examTypes: action.payload,
      };

    case ADD_EXAM_SUCCESS:
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

    case DELETE_QUESTION_SUCCESS:
      const qIndex = state.exam.questions.findIndex(
        (i) => i._id == action.payload
      );
      const currQs = state.exam.questions;

      currQs.splice(qIndex, 1);
      return {
        ...state,
        exam: { ...state.exam, questions: [...currQs] },
      };
    case UPDATE_EXAM_SUCCESS:
      const examIndex = state.exams.findIndex(
        (i) => i._id == action.payload._id
      );
      const newExs = state.exams;
      newExs.splice(examIndex, 1, action.payload);
      return {
        ...state,
        exam: action.payload,
        exams: newExs,
      };

    default:
      return state;
  }
};
export default examReducer;
