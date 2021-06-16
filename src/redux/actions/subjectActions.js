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
  REMOVE_FAVOURITE_VIDEO_FAILURE,
  ADD_LIKED_VIDEO_SUCCESS,
  ADD_LIKED_VIDEO_FAILURE,
  REMOVE_LIKED_VIDEO_SUCCESS,
  REMOVE_LIKED_VIDEO_FAILURE,
  COURSE_INPUT_CHANGE,
  SUBJECT_INPUT_CHANGE,
  REPORT_LESSON_SUCCESS,
  REPORT_LESSON_FAILURE 
} from "./types";


export const subjectInputChange = (name, value) => async (dispatch) => {
  try {
    dispatch({
      type: SUBJECT_INPUT_CHANGE,
      payload: {
        name,
        value,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getSubjectAndRelatedLessons = (courseId, subjectId) => async (
  dispatch
) => {
  try {
    dispatch({
      type: COURSE_INPUT_CHANGE,
      payload: {
        name: 'subjectAndRelatedLessonsLoader',
        value: true,
      },
    });
    document.body.classList.add("loading-indicator");
    const result = await API.getSubjectAndRelatedLessons(courseId, subjectId);
    dispatch({
      type: GET_SUBJECT_AND_RELATED_LESSONS_SUCCESS,
      payload:result.data.data      
    });
    dispatch({
      type: COURSE_INPUT_CHANGE,
      payload: {
        name: 'subjectAndRelatedLessonsLoader',
        value: false,
      },
    });
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    dispatch({
      type: COURSE_INPUT_CHANGE,
      payload: {
        name: 'subjectAndRelatedLessonsLoader',
        value: false,
      },
    });
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
    dispatch({
      type: COURSE_INPUT_CHANGE,
      payload: {
        name: 'favouriteVideoLoader',
        value: true,
      },
    });
    const result = await API.saveFavouriteVideo(data);  
    dispatch({
      type: STORE_FAVOURITE_VIDEO_SUCCESS,
      payload:result.data.data.result
    });
    dispatch({
      type: COURSE_INPUT_CHANGE,
      payload: {
        name: 'favouriteVideoLoader',
        value: false,
      },
    });
  } catch (err) {    
    dispatch({
      type: COURSE_INPUT_CHANGE,
      payload: {
        name: 'favouriteVideoLoader',
        value: false,
      },
    });
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
    dispatch({
      type: COURSE_INPUT_CHANGE,
      payload: {
        name: 'favouriteVideoLoader',
        value: true,
      },
    });
    await API.removeFavouriteVideo(data);  
    dispatch({
      type: REMOVE_FAVOURITE_VIDEO_SUCCESS,
      payload:data.lessonId
    });
    dispatch({
      type: COURSE_INPUT_CHANGE,
      payload: {
        name: 'favouriteVideoLoader',
        value: false,
      },
    });
  } catch (err) {  
    dispatch({
      type: COURSE_INPUT_CHANGE,
      payload: {
        name: 'favouriteVideoLoader',
        value: false,
      },
    });  
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

export const storeLikedVideos = (data, currentLessonIndex) => async (dispatch) => {
  try {  
    dispatch({
      type: COURSE_INPUT_CHANGE,
      payload: {
        name: 'likedVideoLoader',
        value: true,
      },
    });
    const result = await API.saveLikedVideo(data);  
    dispatch({
      type: ADD_LIKED_VIDEO_SUCCESS,
      payload:{
        data:result.data.data.selectedLesson,
        currentLessonIndex
      }      
    });
    dispatch({
      type: COURSE_INPUT_CHANGE,
      payload: {
        name: 'likedVideoLoader',
        value: false,
      },
    });
  } catch (err) {  
    dispatch({
      type: COURSE_INPUT_CHANGE,
      payload: {
        name: 'likedVideoLoader',
        value: false,
      },
    });  
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "ADD_LIKED_VIDEO_FAILURE"
      )
    );
    dispatch({
      type: ADD_LIKED_VIDEO_FAILURE,
    });
  }
};

export const removeLikedVideos = (data,currentLessonIndex) => async (dispatch) => {
  try {  
    dispatch({
      type: COURSE_INPUT_CHANGE,
      payload: {
        name: 'likedVideoLoader',
        value: true,
      },
    });
    await API.removeLikedVideo(data);  
    dispatch({
      type: REMOVE_LIKED_VIDEO_SUCCESS,
      payload:{
        userId:data.userId,
        currentLessonIndex
      } 
    });
    dispatch({
      type: COURSE_INPUT_CHANGE,
      payload: {
        name: 'likedVideoLoader',
        value: false,
      },
    });
  } catch (err) {   
    dispatch({
      type: COURSE_INPUT_CHANGE,
      payload: {
        name: 'likedVideoLoader',
        value: false,
      },
    }); 
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "REMOVE_LIKED_VIDEO_FAILURE"
      )
    );
    dispatch({
      type: REMOVE_LIKED_VIDEO_FAILURE,
    });
  }
};

export const reportLesson = (data) => async (dispatch) => {
  try {    
    await API.reportLesson(data);  
    dispatch({
      type: REPORT_LESSON_SUCCESS    
    });    
  } catch (err) {    
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "REPORT_LESSON_FAILURE"
      )
    );
    dispatch({
      type: REPORT_LESSON_FAILURE,
    });
  }
};