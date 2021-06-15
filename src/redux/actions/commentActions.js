import API from "../../assets/js/api";
import { returnErrors } from "./errorActions";

import {
  GET_LESSON_COMMENTS_SUCCESS,
  GET_LESSON_COMMENTS_FAILURE,
  COMMENT_INPUT_CHANGE,
  ADD_LESSON_COMMENT_SUCCESS,
  ADD_LESSON_COMMENT_FAILURE,
  LIKE_LESSON_COMMENT_SUCCESS,
  LIKE_LESSON_COMMENT_FAILURE,
  UNLIKE_LESSON_COMMENT_SUCCESS,
  UNLIKE_LESSON_COMMENT_FAILURE,
  ADD_LESSON_COMMENT_REPLY_SUCCESS,
  ADD_LESSON_COMMENT_REPLY_FAILURE,
  DELETE_LESSON_COMMENT_SUCCESS,
  DELETE_LESSON_COMMENT_FAILURE,
  UPDATE_LESSON_COMMENT_SUCCESS,
  UPDATE_LESSON_COMMENT_FAILURE
} from "./types";

export const commentInputChange = (name, value) => async (dispatch) => {
  try {
    dispatch({
      type: COMMENT_INPUT_CHANGE,
      payload: {
        name,
        value,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getLessonComments = (lessonId, data) => async (
  dispatch
) => {
  try {
    dispatch({
      type: COMMENT_INPUT_CHANGE,
      payload: {
        name: 'getCommentLoader',
        value: true,
      },
    });   
    const result = await API.getLessonComments(lessonId, data);
   
    dispatch({
      type: GET_LESSON_COMMENTS_SUCCESS,
      payload:result.data.data.comments      
    });

    dispatch({
      type: COMMENT_INPUT_CHANGE,
      payload: {
        name: 'getCommentLoader',
        value: false,
      },
    });   
  } catch (err) {
    dispatch({
      type: COMMENT_INPUT_CHANGE,
      payload: {
        name: 'getCommentLoader',
        value: false,
      },
    });
   
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "GET_LESSON_COMMENTS_FAILURE"
      )
    );
    dispatch({
      type: GET_LESSON_COMMENTS_FAILURE,
    });
  }
};

export const addLessonComment = (data) => async (
  dispatch
) => {
  try {
    dispatch({
      type: COMMENT_INPUT_CHANGE,
      payload: {
        name: 'addCommentLoader',
        value: true,
      },
    });   

    const result = await API.postLessonComment(data);
   
    dispatch({
      type: ADD_LESSON_COMMENT_SUCCESS,
      payload:result.data.data     
    });

    dispatch({
      type: COMMENT_INPUT_CHANGE,
      payload: {
        name: 'addCommentLoader',
        value: false,
      },
    });   
  } catch (err) {
    dispatch({
      type: COMMENT_INPUT_CHANGE,
      payload: {
        name: 'addCommentLoader',
        value: false,
      },
    });
   
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "ADD_LESSON_COMMENT_FAILURE"
      )
    );
    dispatch({
      type: ADD_LESSON_COMMENT_FAILURE,
    });
  }
};

export const likeLessonComment = (data, currentCommentIndex) => async (dispatch) => {
  try {     
    const result = await API.likeLessonComment(data);  
    dispatch({
      type: LIKE_LESSON_COMMENT_SUCCESS,
      payload:{
        data:result.data.data.selectedComment,
        currentCommentIndex
      }      
    });  
  } catch (err) {     
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "LIKE_LESSON_COMMENT_FAILURE"
      )
    );
    dispatch({
      type: LIKE_LESSON_COMMENT_FAILURE,
    });
  }
};

export const unlikeLessonComment = (data,currentCommentIndex) => async (dispatch) => {
  try {     
    await API.unlikeLessonComment(data);
    dispatch({
      type: UNLIKE_LESSON_COMMENT_SUCCESS,
      payload:{
        userId:data.userId,
        currentCommentIndex
      } 
    });
  } catch (err) {    
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "UNLIKE_LESSON_COMMENT_FAILURE"
      )
    );
    dispatch({
      type: UNLIKE_LESSON_COMMENT_FAILURE,
    });
  }
};

export const addLessonCommentResponse = (data, currentCommentIndex) => async (
  dispatch
) => {
  try {
    dispatch({
      type: COMMENT_INPUT_CHANGE,
      payload: {
        name: 'addCommentResponseLoader',
        value: true,
      },
    });  
    
    const result = await API.addLessonCommentReply(data);   
    
    dispatch({
      type: ADD_LESSON_COMMENT_REPLY_SUCCESS,
      payload:{
        commentReply: result.data.data.commentReply,
        currentCommentIndex
      }     
    });

    dispatch({
      type: COMMENT_INPUT_CHANGE,
      payload: {
        name: 'addCommentResponseLoader',
        value: false,
      },
    });   
  } catch (err) {
    dispatch({
      type: COMMENT_INPUT_CHANGE,
      payload: {
        name: 'addCommentResponseLoader',
        value: false,
      },
    });
   
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "ADD_COMMENT_REPLY_FAILURE"
      )
    );
    dispatch({
      type: ADD_LESSON_COMMENT_REPLY_FAILURE,
    });
  }
};

export const deleteLessonComment = (commentId) => async (
  dispatch
) => {
  try {       
    await API.deleteLessonComment(commentId);      
    dispatch({
      type: DELETE_LESSON_COMMENT_SUCCESS,
      payload:{       
        commentId
      }     
    });
  } catch (err) {  
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "DELETE_LESSON_COMMENT_FAILURE"
      )
    );
    dispatch({
      type: DELETE_LESSON_COMMENT_FAILURE,
    });
  }
};

export const updateLessonComment = (data, commentId, currentCommentIndex) => async (
  dispatch
) => {
  try {
    dispatch({
      type: COMMENT_INPUT_CHANGE,
      payload: {
        name: 'updateCommentResponseLoader',
        value: true,
      },
    }); 
  
    const result = await API.updateLessonComment(data, commentId);   
    
    dispatch({
      type: UPDATE_LESSON_COMMENT_SUCCESS,
      payload:{
        data: result.data.data.comment,
        currentCommentIndex
      }     
    });

    dispatch({
      type: COMMENT_INPUT_CHANGE,
      payload: {
        name: 'updateCommentResponseLoader',
        value: false,
      },
    });   
  } catch (err) {
    dispatch({
      type: COMMENT_INPUT_CHANGE,
      payload: {
        name: 'updateCommentResponseLoader',
        value: false,
      },
    });
   
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "UPDATE_LESSON_COMMENT_FAILURE"
      )
    );
    dispatch({
      type: UPDATE_LESSON_COMMENT_FAILURE,
    });
  }
};