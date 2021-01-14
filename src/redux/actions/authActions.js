
import API from './../../assets/js/api';
import { returnErrors } from "./errorActions";

import {
  INPUT_CHANGE,  
  GET_ROLES_SUCCESS,
  GET_ROLES_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CLEAR_FORM,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_SUCCESS,
  PASSWORD_CHANGE_FAILURE,
  PASSWORD_CHANGE_SUCCESS,
  SOCIAL_LOGIN_UPDATE_SUCCESS,
  SOCIAL_LOGIN_UPDATE_FAILURE,
  COURSE_ENROLMENT_SUCCESS,
  COURSE_ENROLMENT_FAILURE,
  AUTH_SUCCESS,
  AUTH_FAILURE,
} from './types';

export const inputChange = (name, value) => async (dispatch) => {
  try {
    dispatch({
      type: INPUT_CHANGE,
      payload: {
        name: name,
        value: value,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
export const getRoles = () => async (dispatch) => {
  try {
    document.body.classList.add('loading-indicator');   
    const result = await API.getRoles();    
    dispatch({
      type: GET_ROLES_SUCCESS,
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
        'GET_ROLES_FAILURE'
      )
    );
    dispatch({
      type: GET_ROLES_FAILURE,
    });
  }
};
export const registerUser = (user) => async (dispatch) => {
  try {
    document.body.classList.add('loading-indicator');
    const result = await API.registerUser(user);
    dispatch({
      type: INPUT_CHANGE,
      payload: {
        name: 'location',
        value: '/dashboard',
      }
    }); 
    dispatch({
      type: CLEAR_FORM,
    });  
    dispatch({
      type: REGISTER_SUCCESS,
      payload: result.data.data,
    });
    const course = {
      userId: result.data.data.user._id,
      courseId:user.activeClass                          
    };
    await API.courseEnrolment(course);
   
    document.body.classList.remove('loading-indicator');
  } catch (err) {
    document.body.classList.remove('loading-indicator');
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        'REGISTER_FAILURE'
      )
    );
    dispatch({
      type: REGISTER_FAILURE,
    });
  }
};
export const loginUser = (user, google = false, facebook = false) => async (dispatch) => {
  try {
    document.body.classList.add('loading-indicator');
    let result = null;
    if (google) {
      result = await API.socialLoginGoogle(user);
    } else if(facebook){
      result = await API.socialLoginFacebook(user);
    }else {
      result = await API.login(user);
    }   
    dispatch({
      type: LOGIN_SUCCESS,
      payload: result.data.data,
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
        'LOGIN_FAILURE'
      )
    );
    dispatch({
      type: LOGIN_FAILURE,
    });
  }
};
export const resetPassword = (user) => async (dispatch) => {
  try {
    document.body.classList.add('loading-indicator');
    const result = await API.resetPassword(user);
    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: result.data.data,
    });
    dispatch({
      type: CLEAR_FORM,
    });
    dispatch(
      returnErrors(
        'Password reset code sent to your email',
        '200',
        'RESET_PASSWORD_SUCCESS'
      )
    );
    document.body.classList.remove('loading-indicator');
  } catch (err) {
    document.body.classList.remove('loading-indicator');
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        'RESET_PASSWORD_FAILURE'
      )
    );
    dispatch({
      type: RESET_PASSWORD_FAILURE,
    });
  }
};
export const changePassword = (user) => async (dispatch) => {
  try {
    document.body.classList.add('loading-indicator');
    await API.changePassword(user);
    dispatch({
      type: PASSWORD_CHANGE_SUCCESS     
    });
    dispatch(
      returnErrors(
        'Password changed successfully',
        '200',
        'PASSWORD_CHANGE_SUCCESS'
      )
    );
    document.body.classList.remove('loading-indicator');
  } catch (err) {
    document.body.classList.remove('loading-indicator');
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        'PASSWORD_CHANGE_FAILURE'
      )
    );
    dispatch({
      type: PASSWORD_CHANGE_FAILURE,
    });
  }
};
export const socialLoginUpdate = (user, course) => async (dispatch) => {
  try {
    document.body.classList.add('loading-indicator');
    const result = await API.socialLoginUpdate(user); 
    dispatch({
      type: SOCIAL_LOGIN_UPDATE_SUCCESS,
      payload: result.data
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
        'SOCIAL_LOGIN_UPDATE_FAILURE'
      )
    );
    dispatch({
      type: SOCIAL_LOGIN_UPDATE_FAILURE,
    });
  }
};
export const courseEnrolment = (user) => async (dispatch) => {
  try {
    document.body.classList.add('loading-indicator');
    await API.courseEnrolment(user);
    dispatch({
      type: COURSE_ENROLMENT_SUCCESS     
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
        'COURSE_ENROLMENT_FAILURE'
      )
    );
    dispatch({
      type: COURSE_ENROLMENT_FAILURE,
    });
  }
};
export const loadUser = () => async (dispatch) => {
  try {
    document.body.classList.add('loading-indicator');
    const result = await API.loadUser(); 

    dispatch({
      type: GET_ROLES_SUCCESS,
      payload: result.data.data
    });

    dispatch({
      type: AUTH_SUCCESS,
      payload: result.data.data,
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
        'AUTH_FAILURE'
      )
    );
    dispatch({
      type: AUTH_FAILURE,
    });
  }
};