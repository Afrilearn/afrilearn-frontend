import API from "../../assets/js/api";
import { returnErrors } from "./errorActions";
import { returnSuccess } from "./successActions";
import {
  INPUT_CHANGE,
  ACCEPT_REJECT_SCHOOL_ADMIN_REQUEST_SUCCESS,
  ACCEPT_REJECT_SCHOOL_ADMIN_REQUEST_FAILURE,
  ACCEPT_REJECT_SCHOOL_TEACHER_REQUEST_SUCCESS,
  ACCEPT_REJECT_SCHOOL_TEACHER_REQUEST_FAILURE,
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
  dispatch(returnErrors(message, status, id));
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

export const inputChange = (name, value) => (dispatch) => {
  dispatch({ type: INPUT_CHANGE, payload: { name, value } });
};
