
import API from './../../assets/js/api';
import { returnErrors } from "./errorActions";

import {
  COURSE_INPUT_CHANGE,
  GET_ALL_COURSES_SUCCESS,
  GET_ALL_COURSES_FAILURE 
} from './types';

export const inputChange = (name, value) => async (dispatch) => {
  try {
    dispatch({
      type: COURSE_INPUT_CHANGE,
      payload: {
        name: name,
        value: value,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getCourses = () => async (dispatch) => {
    try {
      document.body.classList.add('loading-indicator');   
      const result = await API.getCourses();    
      dispatch({
        type: GET_ALL_COURSES_SUCCESS,
        payload: result.data.data
      });
      document.body.classList.remove('loading-indicator');
    } catch (err) {
      document.body.classList.remove('loading-indicator');
      dispatch(
        returnErrors(
          err.response.data.errors
            ? err.response.data.errors
            : err.response.data.error,
          err.response.data.status,
          'GET_ALL_COURSES_FAILURE'
        )
      );
      dispatch({
        type: GET_ALL_COURSES_FAILURE,
      });
    }
};
