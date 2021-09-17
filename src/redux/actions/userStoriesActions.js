import API from "../../assets/js/api";
import { returnErrors } from "./errorActions";

import {
  GET_USER_STORIES_SUCCESS,
  GET_USER_STORIES_FAILURE 
} from "./types";


export const getUserStories = () => async dispatch => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.getUserStories();     
    dispatch({
      type:  GET_USER_STORIES_SUCCESS,
      payload: result.data.data.customerStories,
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
        "GET_USER_STORIES_FAILURE"
      )
    );
    dispatch({
      type: GET_USER_STORIES_FAILURE,
    });
  }
};

