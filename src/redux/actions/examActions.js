import API from "../../assets/js/api";
import { returnErrors } from "./errorActions";

import {
  EXAM_INPUT_CHANGE,
  GET_EXAMS_SUCCESS,
  GET_EXAMS_FAILURE,
  GET_EXAM_SUCCESS,
  GET_EXAM_FAILURE,
  GET_RESULT_SUCCESS,
  GET_RESULT_FAILURE,
  GET_STUDENT_EXAMS_SUCCESS,
  GET_STUDENT_EXAMS_FAILURE,
  GET_EXAMINATION_INFORMATION_SUCCESS,
  GET_EXAMINATION_INFORMATION_FAILURE,
  GET_EXAM_TYPES_SUCCESS,
  GET_EXAM_TYPES_FAILURE,
  ADD_EXAM_SUCCESS,
  ADD_EXAM_FAILURE,
  GET_TERMS_SUCCESS,
  GET_TERMS_FAILURE,
  ADD_EXAM_QUESTION_SUCCESS,
  ADD_EXAM_QUESTION_FAILURE,
  UPDATE_EXAM_QUESTION_SUCCESS,
  UPDATE_EXAM_QUESTION_FAILURE,
  UPDATE_EXAM_SUCCESS,
  UPDATE_EXAM_FAILURE,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_FAILURE,
  UPDATE_RESULT_SUCCESS,
  UPDATE_RESULT_FAILURE,
  GET_STUDENTS_EXAM_RECORD_SUCCESS,
  GET_STUDENTS_EXAM_RECORD_FAILURE
} from "./types";

export const inputChange = (name, value) => async (dispatch) => {
  try {
    dispatch({
      type: EXAM_INPUT_CHANGE,
      payload: {
        name: name,
        value: value,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
export const getExamTypes = () => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    dispatch({
      type: EXAM_INPUT_CHANGE,
      payload: {
        name: "loadingExams",
        value: true,
      },
    });
    const result = await API.getExamTypes();
    dispatch({
      type: GET_EXAM_TYPES_SUCCESS,
      payload: result.data.data.examTypes,
    });
    dispatch({
      type: EXAM_INPUT_CHANGE,
      payload: {
        name: "loadingExams",
        value: false,
      },
    });
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch({
      type: EXAM_INPUT_CHANGE,
      payload: {
        name: "loadingExams",
        value: false,
      },
    });
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "GET_EXAM_TYPES_FAILURE"
      )
    );
    dispatch({
      type: GET_EXAM_TYPES_FAILURE,
    });
  }
};
export const addExam = (data) => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    dispatch({
      type: EXAM_INPUT_CHANGE,
      payload: {
        name: "addExamStatus",
        value: "started",
      },
    });
    const result = await API.addExam(data);
    dispatch({
      type: ADD_EXAM_SUCCESS,
      payload: result.data.data.exam,
    });
    dispatch({
      type: EXAM_INPUT_CHANGE,
      payload: {
        name: "addExamStatus",
        value: "success",
      },
    });
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch({
      type: EXAM_INPUT_CHANGE,
      payload: {
        name: "addExamStatus",
        value: "failed",
      },
    });
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "ADD_EXAM_FAILURE"
      )
    );
    dispatch({
      type: ADD_EXAM_FAILURE,
    });
  }
};
export const addExamQuestion = (data) => async (dispatch, getState) => {
  try {
    document.body.classList.add("loading-indicator");
    dispatch({
      type: EXAM_INPUT_CHANGE,
      payload: {
        name: "addQuestionStatus",
        value: "started",
      },
    });
    const result = await API.addExamQuestion(data);
    dispatch({
      type: ADD_EXAM_QUESTION_SUCCESS,
      payload: result.data.data.examQuestion,
    });
    dispatch({
      type: EXAM_INPUT_CHANGE,
      payload: {
        name: "addQuestionStatus",
        value: "success",
      },
    });
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch({
      type: EXAM_INPUT_CHANGE,
      payload: {
        name: "addQuestionStatus",
        value: "failed",
      },
    });
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "ADD_EXAM_QUESTION_FAILURE"
      )
    );
    dispatch({
      type: ADD_EXAM_QUESTION_FAILURE,
    });
  }
};
export const updateExamQuestion = (questionId, data) => async (
  dispatch,
  getState
) => {
  try {
    document.body.classList.add("loading-indicator");
    dispatch({
      type: EXAM_INPUT_CHANGE,
      payload: {
        name: "updateQuestionStatus",
        value: "started",
      },
    });
    const result = await API.updateExamQuestion(questionId, data);
    dispatch({
      type: UPDATE_EXAM_QUESTION_SUCCESS,
      payload: result.data.data.examQuestion,
    });
    dispatch({
      type: EXAM_INPUT_CHANGE,
      payload: {
        name: "updateQuestionStatus",
        value: "success",
      },
    });
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch({
      type: EXAM_INPUT_CHANGE,
      payload: {
        name: "updateQuestionStatus",
        value: "failed",
      },
    });
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "UPDATE_EXAM_QUESTION_FAILURE"
      )
    );
    dispatch({
      type: UPDATE_EXAM_QUESTION_FAILURE,
    });
  }
};
export const getExams = () => async (dispatch, getState) => {
  try {
    document.body.classList.add("loading-indicator");
    dispatch({
      type: EXAM_INPUT_CHANGE,
      payload: {
        name: "loadingExams",
        value: true,
      },
    });
    const result = await API.getExams();
    dispatch({
      type: GET_EXAMS_SUCCESS,
      payload: result.data.data.exams,
    });
    dispatch({
      type: EXAM_INPUT_CHANGE,
      payload: {
        name: "loadingExams",
        value: false,
      },
    });
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch({
      type: EXAM_INPUT_CHANGE,
      payload: {
        name: "loadingExams",
        value: false,
      },
    });
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "GET_EXAMS_FAILURE"
      )
    );
    dispatch({
      type: GET_EXAMS_FAILURE,
    });
  }
};
export const getTerms = () => async (dispatch, getState) => {
  try {
    document.body.classList.add("loading-indicator");
    dispatch({
      type: EXAM_INPUT_CHANGE,
      payload: {
        name: "loadingExams",
        value: true,
      },
    });
    const result = await API.getTerms();
    dispatch({
      type: GET_TERMS_SUCCESS,
      payload: result.data.data.terms,
    });
    dispatch({
      type: EXAM_INPUT_CHANGE,
      payload: {
        name: "loadingExams",
        value: false,
      },
    });
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch({
      type: EXAM_INPUT_CHANGE,
      payload: {
        name: "loadingExams",
        value: false,
      },
    });
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "GET_TERMS_FAILURE"
      )
    );
    dispatch({
      type: GET_TERMS_FAILURE,
    });
  }
};
export const deleteQuestion = (id) => async (dispatch, getState) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.deleteQuestion(id);
    dispatch({
      type: DELETE_QUESTION_SUCCESS,
      payload: id,
    });
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "DELETE_QUESTION_FAILURE"
      )
    );
    dispatch({
      type: DELETE_QUESTION_FAILURE,
    });
  }
};
export const getExam = (id) => async (dispatch, getState) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.getExam(id);
    dispatch({
      type: GET_EXAM_SUCCESS,
      payload: result.data.data.exam,
    });
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "GET_EXAM_FAILURE"
      )
    );
    dispatch({
      type: GET_EXAM_FAILURE,
    });
  }
};
export const updateExam = (id, data) => async (dispatch, getState) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.updateExam(id, data);
    dispatch({
      type: UPDATE_EXAM_SUCCESS,
      payload: result.data.data.exam,
    });
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "UPDATE_EXAM_FAILURE"
      )
    );
    dispatch({
      type: UPDATE_EXAM_FAILURE,
    });
  }
};
export const updateExamResultScore = (resultId, resultItemId, score) => async (
  dispatch,
  getState
) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.updateExamScore(resultId, resultItemId, score);
    dispatch({
      type: UPDATE_RESULT_SUCCESS,
      payload: result.data.data.result,
    });
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "UPDATE_RESULT_FAILURE"
      )
    );
    dispatch({
      type: UPDATE_RESULT_FAILURE,
    });
  }
};
export const getResult = (id) => async (dispatch, getState) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.getExamResult(id);
    dispatch({
      type: GET_RESULT_SUCCESS,
      payload: result.data.data.result,
    });
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "GET_RESULT_FAILURE"
      )
    );
    dispatch({
      type: GET_RESULT_FAILURE,
    });
  }
};
export const getStudentExam = (classId) => async (dispatch) => {
  try {
    const result = await API.getStudentExams(classId);
    dispatch({
      type: GET_STUDENT_EXAMS_SUCCESS,
      payload: result.data.data.exams || {},
    });
    // document.body.classList.remove("loading-indicator");
  } catch (err) {
    // document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "GET_STUDENT_EXAMS_FAILURE"
      )
    );
    dispatch({
      type: GET_STUDENT_EXAMS_FAILURE,
    });
  }
};
export const getStudentExamInformation = (examId) => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.getExamInformation(examId);
    dispatch({
      type: GET_EXAMINATION_INFORMATION_SUCCESS,
      payload: result.data.data.exams,
    });
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "GET_EXAMINATION_INFORMATION_FAILURE"
      )
    );
    dispatch({
      type: GET_EXAMINATION_INFORMATION_FAILURE,
    });
  }
};
export const getStudentsExaminationRecord = (classId) => async (dispatch,getState) => {
  try {    
    document.body.classList.add("loading-indicator");
    const result = await API.getExamRecord(classId);
    let pendingExam = [];
    let takenExam =[];
    const { userId } = getState().auth;

    if(result.data.data.exams && result.data.data.exams.length){
      result.data.data.exams.map((record)=>{
        const result =   record.participants.filter((item)=> item===userId);       
        if(result.length>0){
          takenExam.push(record)         
        }else{
          pendingExam.push(record)
        }
      })     
    }  
     
    dispatch({
      type: GET_STUDENTS_EXAM_RECORD_SUCCESS,
      payload: {
        takenExam,
        pendingExam
      }
    });

    document.body.classList.remove("loading-indicator");
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "GET_STUDENTS_EXAM_RECORD_FAILURE"
      )
    );
    dispatch({
      type: GET_STUDENTS_EXAM_RECORD_FAILURE,
    });
  }
};
