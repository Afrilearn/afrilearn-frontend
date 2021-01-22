import API from "../../assets/js/api";
import { returnErrors } from "./errorActions";

import {
  GET_CLASSES_SUCCESS,
  GET_CLASSES_FAILURE,
  GET_SINGLE_CLASS_SUCCESS,
  GET_SINGLE_CLASS_FAILURE,
  CREATE_COMMENT_TO_ANNOUNCEMENT_SUCCESS,
  CREATE_COMMENT_TO_ANNOUNCEMENT_FAILURE,
  CREATE_COMMENT_TO_CONTENT_FAILURE,
  CREATE_COMMENT_TO_CONTENT_SUCCESS,
  ASSIGN_CONTENT_TO_STUDENT_SUCCESS,
  ASSIGN_CONTENT_TO_STUDENT_FAILURE,
  SEND_CLASS_REQUEST_SUCCESS,
  SEND_CLASS_REQUEST_FAILURE,
  USER_JOIN_THROUGH_INVITE_SUCCESS,
  USER_JOIN_THROUGH_INVITE_FAILURE,
} from "./types";

export const joinClassApproved = (classId, email, fullName, password) => async (
  dispatch
) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.joinApproved(classId, email, fullName, password);

    dispatch({
      type: USER_JOIN_THROUGH_INVITE_SUCCESS,
      payload: {
        user: result.data.data.user,
      },
    });
    dispatch(
      returnErrors(
        "Class request has been approved. Login to continue",
        "200",
        "USER_JOIN_THROUGH_INVITE_SUCCESS"
      )
    );
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "USER_JOIN_THROUGH_INVITE_FAILURE"
      )
    );
    dispatch({
      type: USER_JOIN_THROUGH_INVITE_FAILURE,
    });
  }
};

export const getClasses = () => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.getClasses();

    dispatch({
      type: GET_CLASSES_SUCCESS,
      payload: {
        classes: result.data.data.classes,
      },
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
        "GET_CLASSES_FAILURE"
      )
    );
    dispatch({
      type: GET_CLASSES_FAILURE,
    });
  }
};

export const getClass = (classId) => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.getClass(classId);

    dispatch({
      type: GET_SINGLE_CLASS_SUCCESS,
      payload: {
        class: result.data.data.class,
        classMembers: result.data.data.classMembers,
      },
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
        "GET_SINGLE_CLASS_FAILURE"
      )
    );
    dispatch({
      type: GET_SINGLE_CLASS_FAILURE,
    });
  }
};

export const createComment = (announcementId, text) => async (
  dispatch,
  getState
) => {
  try {
    await API.addCommentToAnnouncement(announcementId, text);
    dispatch({
      type: CREATE_COMMENT_TO_ANNOUNCEMENT_SUCCESS,
    });
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "CREATE_COMMENT_TO_ANNOUNCEMENT_FAILURE"
      )
    );
    dispatch({
      type: CREATE_COMMENT_TO_ANNOUNCEMENT_FAILURE,
    });
  }
};

export const createCommentForContent = (
  assignedContentId,
  text,
  student
) => async (dispatch, getState) => {
  try {
    await API.addCommentToAssignedContent(assignedContentId, text, student);
    dispatch({
      type: CREATE_COMMENT_TO_CONTENT_SUCCESS,
    });
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "CREATE_COMMENT_TO_CONTENT_FAILURE"
      )
    );
    dispatch({
      type: CREATE_COMMENT_TO_CONTENT_FAILURE,
    });
  }
};

export const sendClassRequest = (classCode) => async (dispatch, getState) => {
  try {
    await API.sendClassRequest(classCode);
    dispatch({
      type: SEND_CLASS_REQUEST_SUCCESS,
    });
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "SEND_CLASS_REQUEST_FAILURE"
      )
    );
    dispatch({
      type: SEND_CLASS_REQUEST_FAILURE,
    });
  }
};

export const assignContent = (
  description,
  lessonId,
  classId,
  dueDate,
  userId
) => async (dispatch, getState) => {
  try {
    await API.assignContentToStudent(
      description,
      lessonId,
      classId,
      dueDate,
      userId
    );
    dispatch({
      type: ASSIGN_CONTENT_TO_STUDENT_SUCCESS,
    });
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "ASSIGN_CONTENT_TO_STUDENT_FAILURE"
      )
    );
    dispatch({
      type: ASSIGN_CONTENT_TO_STUDENT_FAILURE,
    });
  }
};