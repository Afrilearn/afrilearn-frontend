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
  GET_EXAMINATION_INFORMATION_FAILURE
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
export const getExams = () => async (dispatch, getState) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.getExams();
    console.log("result", result);
    dispatch({
      type: GET_EXAMS_SUCCESS,
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
        "GET_EXAMS_FAILURE"
      )
    );
    dispatch({
      type: GET_EXAMS_FAILURE,
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
      payload: result.data.data.exams,
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
