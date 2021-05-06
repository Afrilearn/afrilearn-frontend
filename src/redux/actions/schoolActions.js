import API from "../../assets/js/api";
import { returnErrors } from "./errorActions";
import { returnSuccess } from "./successActions";
import {
  SCHOOL_INPUT_CHANGE,
  ACCEPT_REJECT_SCHOOL_ADMIN_REQUEST_SUCCESS,
  ACCEPT_REJECT_SCHOOL_ADMIN_REQUEST_FAILURE,
  ACCEPT_REJECT_SCHOOL_TEACHER_REQUEST_SUCCESS,
  ACCEPT_REJECT_SCHOOL_TEACHER_REQUEST_FAILURE,
  GET_SCHOOL_PROFILE_SUCCESS,
  GET_SCHOOL_PROFILE_FAILURE,
  GET_SCHOOL_COURSES_SUCCESS,
  GET_SCHOOL_COURSES_FAILURE,
  UPLOAD_SCHOOL_COVER_PHOTO_SUCCESS,
  UPLOAD_SCHOOL_COVER_PHOTO_FAILURE,
  SCHOOL_ADD_EXISTING_TEACHER_SUCCESS,
  SCHOOL_ADD_EXISTING_TEACHER_FAILURE,
  SCHOOL_SIGNUP_FOR_STUDENT_SUCCESS,
  SCHOOL_SIGNUP_FOR_STUDENT_FAILURE,
  UPLOAD_SCHOOL_LOGO_FAILURE,
  UPLOAD_SCHOOL_LOGO_SUCCESS,
  UPLOAD_SCHOOL_PROFILE_SUCCESS,
  UPLOAD_SCHOOL_PROFILE_FAILURE,
  UPDATE_CLASS_NAME_SUCCESS,
  UPDATE_CLASS_NAME_FAILURE,
  SCHOOL_DELETE_STUDENT_ACCOUNT_SUCCESS,
  SCHOOL_DELETE_STUDENT_ACCOUNT_FAILURE,
} from "./types";

const dispatchError = (dispatch, err, id) => {
  dispatch(
    returnErrors(
      err.response.data.errors
        ? err.response.data.errors
        : err.response.data.error,
      err.response.data.status,
      id
    )
  );
};
const dispatchSuccess = (dispatch, message, id, status = "200") => {
  dispatch(returnSuccess(message, status, id));
};

export const acceptTeacherRequest = (email, schoolId, classId) => async (
  dispatch
) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.acceptTeacherRequest(email, schoolId, classId);
    dispatch({
      type: ACCEPT_REJECT_SCHOOL_TEACHER_REQUEST_SUCCESS,
    });
    dispatchSuccess(
      dispatch,
      `Request Accepted`,
      ACCEPT_REJECT_SCHOOL_TEACHER_REQUEST_SUCCESS
    );
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    console.log(err);
    document.body.classList.remove("loading-indicator");
    dispatchError(dispatch, err, ACCEPT_REJECT_SCHOOL_TEACHER_REQUEST_FAILURE);
  }
};

export const acceptAdminRequest = (email, schoolId, classId) => async (
  dispatch
) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.acceptAdminRequest(email, schoolId, classId);
    dispatch({
      type: ACCEPT_REJECT_SCHOOL_ADMIN_REQUEST_SUCCESS,
    });
    dispatchSuccess(
      dispatch,
      `Request Accepted`,
      ACCEPT_REJECT_SCHOOL_ADMIN_REQUEST_SUCCESS
    );
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    console.log(err);
    document.body.classList.remove("loading-indicator");
    dispatchError(dispatch, err, ACCEPT_REJECT_SCHOOL_ADMIN_REQUEST_FAILURE);
  }
};

export const getSchoolProfile = (schoolId) => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.getSchoolProfile(schoolId);
    dispatch({
      type: GET_SCHOOL_PROFILE_SUCCESS,
      payload: result.data.data,
    });
    dispatchSuccess(
      dispatch,
      `School profile Recieved`,
      GET_SCHOOL_PROFILE_SUCCESS
    );
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    // console.log(err);
    document.body.classList.remove("loading-indicator");
    dispatchError(dispatch, err, GET_SCHOOL_PROFILE_FAILURE);
  }
};

export const getSchoolCourses = (schoolId) => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.getSchoolCourses(schoolId);
    dispatch({
      type: GET_SCHOOL_COURSES_SUCCESS,
      payload: result.data.data,
    });
    dispatchSuccess(
      dispatch,
      `School profile Recieved`,
      GET_SCHOOL_COURSES_SUCCESS
    );
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    // console.log(err);
    document.body.classList.remove("loading-indicator");
    dispatchError(dispatch, err, GET_SCHOOL_COURSES_FAILURE);
  }
};
export const uploadSchoolCoverPhoto = (schoolId, data) => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.uploadSchoolCoverPhoto(schoolId, data);
    dispatch({
      type: UPLOAD_SCHOOL_COVER_PHOTO_SUCCESS,
      payload: result.data.data,
    });
    dispatchSuccess(
      dispatch,
      `School profile Updated`,
      UPLOAD_SCHOOL_COVER_PHOTO_SUCCESS
    );
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    // console.log(err);
    document.body.classList.remove("loading-indicator");
    dispatchError(dispatch, err, UPLOAD_SCHOOL_COVER_PHOTO_FAILURE);
  }
};
export const uploadSchoolLogo = (schoolId, data) => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.uploadSchoollogo(schoolId, data);
    dispatch({
      type: UPLOAD_SCHOOL_LOGO_SUCCESS,
      payload: result.data.data,
    });
    dispatchSuccess(
      dispatch,
      `School profile Updated`,
      UPLOAD_SCHOOL_LOGO_SUCCESS
    );
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    // console.log(err);
    document.body.classList.remove("loading-indicator");
    dispatchError(dispatch, err, UPLOAD_SCHOOL_LOGO_FAILURE);
  }
};
export const uploadSchoolProfile = (schoolId, data) => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.updateSchoolProfile(schoolId, data);
    dispatch({
      type: UPLOAD_SCHOOL_PROFILE_SUCCESS,
      payload: result.data.data,
    });
    dispatchSuccess(
      dispatch,
      `School profile Updated`,
      200,
      UPLOAD_SCHOOL_PROFILE_SUCCESS
    );
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    // console.log(err);
    document.body.classList.remove("loading-indicator");
    dispatchError(dispatch, err, UPLOAD_SCHOOL_PROFILE_FAILURE);
  }
};
export const schoolAddExistingTeacher = (email, schoolId, classId) => async (
  dispatch
) => {
  try {
    document.body.classList.add("loading-indicator");
    await API.schoolAddExistingTeacher(email, schoolId, classId);
    dispatch({
      type: SCHOOL_ADD_EXISTING_TEACHER_SUCCESS,
    });
    dispatchSuccess(
      dispatch,
      `Request sent`,
      200,
      SCHOOL_ADD_EXISTING_TEACHER_SUCCESS
    );
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    // console.log(err);
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "SCHOOL_ADD_EXISTING_TEACHER_FAILURE"
      )
    );
  }
};
export const schoolSignUpForStudent = (
  fullName,
  password,
  email,
  classId,
  schoolId,
  courseId
) => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    await API.schoolSignUpForStudent(
      fullName,
      password,
      email,
      classId,
      schoolId,
      courseId
    );
    dispatch({
      type: SCHOOL_SIGNUP_FOR_STUDENT_SUCCESS,
    });
    dispatchSuccess(
      dispatch,
      `Student Sign Up Successfully`,
      200,
      SCHOOL_SIGNUP_FOR_STUDENT_SUCCESS
    );
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    // console.log(err);
    document.body.classList.remove("loading-indicator");
    dispatchError(dispatch, err, SCHOOL_SIGNUP_FOR_STUDENT_FAILURE);
  }
};

export const inputChange = (name, value) => (dispatch) => {
  dispatch({ type: SCHOOL_INPUT_CHANGE, payload: { name, value } });
};

export const updateClassName = (classId, name) => async (
  dispatch,
  getState
) => {
  try {
    await API.updateClassName(classId, name);
    dispatch({
      type: UPDATE_CLASS_NAME_SUCCESS,
    });
  } catch (err) {
    dispatch(
      returnErrors("Error Updating class", 500, "UPDATE_CLASS_NAME_FAILURE")
    );
    dispatch({
      type: UPDATE_CLASS_NAME_FAILURE,
    });
  }
};
