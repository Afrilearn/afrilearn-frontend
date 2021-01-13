import {
    COURSE_INPUT_CHANGE  
  } from '../actions/types';
  
  const initialState = {
    drop: false   
  };
  
  const courseReducer = (state = initialState, action) => {
    switch (action.type) {
      case COURSE_INPUT_CHANGE:
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
      default:
        return state;
    }
  };
  export default courseReducer;
  