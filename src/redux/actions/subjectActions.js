import API from "../../assets/js/api";
import { returnErrors } from "./errorActions";

import {
  GET_SUBJECT_AND_RELATED_LESSONS_SUCCESS,
  GET_SUBJECT_AND_RELATED_LESSONS_FAILURE,
  ADD_RECENT_ACTIVITIES_FAILURE,
  ADD_RECENT_ACTIVITIES_SUCCESS,
  ADD_SUBJECT_PROGRESS_FAILURE,
  ADD_SUBJECT_PROGRESS_SUCCESS,
  GET_SINGLE_LESSON_SUCCESS,
  GET_SINGLE_LESSON_FAILURE,
  STORE_UNFINISHED_VIDEO_SUCCESS,
  STORE_UNFINISHED_VIDEO_FAILURE,
  CLEAR_UNFINISHED_VIDEO_SUCCESS,
  CLEAR_UNFINISHED_VIDEO_FAILURE,
  STORE_FAVOURITE_VIDEO_SUCCESS,
  STORE_FAVOURITE_VIDEO_FAILURE,
  REMOVE_FAVOURITE_VIDEO_SUCCESS,
  REMOVE_FAVOURITE_VIDEO_FAILURE
} from "./types";

export const getSubjectAndRelatedLessons = (courseId, subjectId) => async (
  dispatch
) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.getSubjectAndRelatedLessons(courseId, subjectId);
    dispatch({
      type: GET_SUBJECT_AND_RELATED_LESSONS_SUCCESS,
      payload:result.data.data      
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

export const addSubjectProgress = (
  classId,
  lessonId,
  subjectId,
  courseId,
  reason,
  type
) => async (dispatch) => {
  try {
    // document.body.classList.add("loading-indicator");
    await API.addSubjectProgress(
      classId,
      lessonId,
      subjectId,
      courseId,
      reason,
      type
    );
    dispatch({
      type: ADD_SUBJECT_PROGRESS_SUCCESS,
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
        "ADD_SUBJECT_PROGRESS_FAILURE"
      )
    );
    dispatch({
      type: ADD_SUBJECT_PROGRESS_FAILURE,
    });
  }
};

export const addRecentActivity = (lessonId, type) => async (dispatch) => {
  try {
    // document.body.classList.add("loading-indicator");
    await API.addRecentActivity(lessonId, type);
    dispatch({
      type: ADD_RECENT_ACTIVITIES_SUCCESS,
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
        "ADD_RECENT_ACTIVITIES_FAILURE"
      )
    );
    dispatch({
      type: ADD_RECENT_ACTIVITIES_FAILURE,
    });
  }
};

export const getSingleLesson = (lessonId) => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");

    const result = await API.getSingleLesson(lessonId);

    dispatch({
      type: GET_SINGLE_LESSON_SUCCESS,
      payload: {
        lesson: result.data.data.lesson,
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
        "GET_SINGLE_LESSON_FAILURE"
      )
    );
    dispatch({
      type: GET_SINGLE_LESSON_FAILURE,
    });
  }
};

export const storeUnFinishedVideos = (data) => async (dispatch) => {
  try {       
    await API.storeUnFinishedVideos(data);
    dispatch({
      type: STORE_UNFINISHED_VIDEO_SUCCESS,
    });
  } catch (err) {    
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "STORE_UNFINISHED_VIDEO_FAILURE"
      )
    );
    dispatch({
      type: STORE_UNFINISHED_VIDEO_FAILURE,
    });
  }
};

export const clearUnFinishedVideos = (data) => async (dispatch) => {
  try {       
    await API.clearUnFinishedVideos(data);
    dispatch({
      type: CLEAR_UNFINISHED_VIDEO_SUCCESS,
    });
  } catch (err) {    
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "CLEAR_UNFINISHED_VIDEO_FAILURE"
      )
    );
    dispatch({
      type: CLEAR_UNFINISHED_VIDEO_FAILURE,
    });
  }
};

export const storeFavouriteVideos = (data) => async (dispatch) => {
  try {  
    const result = await API.saveFavouriteVideo(data);  
    dispatch({
      type: STORE_FAVOURITE_VIDEO_SUCCESS,
      payload:result.data.data.result
    });
  } catch (err) {    
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "STORE_FAVOURITE_VIDEO_FAILURE"
      )
    );
    dispatch({
      type: STORE_FAVOURITE_VIDEO_FAILURE,
    });
  }
};
export const removeFavouriteVideos = (data) => async (dispatch) => {
  try {  
    await API.removeFavouriteVideo(data);  
    dispatch({
      type: REMOVE_FAVOURITE_VIDEO_SUCCESS,
      payload:data.lessonId
    });
  } catch (err) {    
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "REMOVE_FAVOURITE_VIDEO_FAILURE"
      )
    );
    dispatch({
      type: REMOVE_FAVOURITE_VIDEO_FAILURE,
    });
  }
};