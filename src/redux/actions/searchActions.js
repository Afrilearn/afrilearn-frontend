import API from "../../assets/js/api";
import { returnErrors } from "./errorActions";

import {
  GET_ALL_SEARCH_RESULTS_SUCCESS,
  GET_ALL_SEARCH_RESULTS_FAILURE, 
  SEARCH_INPUT_CHANGE,
  GET_SEARCH_RESULTS_DETAILS_SUCCESS
} from "./types";


export const searchInputChange = (name, value) => async (dispatch) => {
  try {
    dispatch({
      type: SEARCH_INPUT_CHANGE,
      payload: {
        name: name,
        value: value,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getSearchResults = (searchQuery, details = false) => async (dispatch) => {
  try {    
    let result = null;

    if(details){
      document.body.classList.add("loading-indicator");     
      result = await API.getSearchResults(searchQuery,{details:true});      
    }else{
      dispatch({
        type: SEARCH_INPUT_CHANGE,
        payload: {
          name: 'isSearching',
          value: true,
        },
      });
      result = await API.getSearchResults(searchQuery);
    }   

   

  
    if(details){
      dispatch({
        type: GET_SEARCH_RESULTS_DETAILS_SUCCESS,
        payload: result.data.data,
      });
      document.body.classList.remove("loading-indicator");
    }else{
      dispatch({
        type: GET_ALL_SEARCH_RESULTS_SUCCESS,
        payload: result.data.data,
      });

      dispatch({
        type: SEARCH_INPUT_CHANGE,
        payload: {
          name: 'isSearching',
          value: false,
        },
      });
    }   
  } catch (err) {   
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "GET_ALL_SEARCH_RESULTS_FAILURE"
      )
    );
    dispatch({
      type: GET_ALL_SEARCH_RESULTS_FAILURE,
    });
  }
};


