import {
    COURSE_INPUT_CHANGE,
    GET_ALL_COURSES_SUCCESS,
    GET_SINGLE_COURSE_SUCCESS  
  } from '../actions/types';
  
  const initialState = {
    courses: [],
    course:{},
    lessonCount:0,
    subjectCount:0   
  };
  
  const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case COURSE_INPUT_CHANGE:
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            };

        case GET_ALL_COURSES_SUCCESS:
            return {
                ...state,
                courses:action.payload.courses                
            };

        case GET_SINGLE_COURSE_SUCCESS:
            return {
                ...state,
                course:action.payload.course,
                lessonCount:action.payload.lessonCount,
                subjectCount:action.payload.subjectCount                
            };

      default:
        return state;
    }
  };
  export default courseReducer;
  