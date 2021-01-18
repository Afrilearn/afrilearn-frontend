import API from "../../assets/js/api";
import { returnErrors } from "./errorActions";

import {
  GET_SUBJECT_AND_RELATED_LESSONS_SUCCESS,
  GET_SUBJECT_AND_RELATED_LESSONS_FAILURE,
} from "./types";

export const getSubjectAndRelatedLessons = (courseId, subjectId) => async (
  dispatch
) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.getSubjectAndRelatedLessons(courseId, subjectId);
    dispatch({
      type: GET_SUBJECT_AND_RELATED_LESSONS_SUCCESS,
      payload: {
        subject: result.data.data.subject,
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
        "GET_SUBJECT_AND_RELATED_LESSONS_FAILURE"
      )
    );
    dispatch({
      type: GET_SUBJECT_AND_RELATED_LESSONS_FAILURE,
    });
  }
};
