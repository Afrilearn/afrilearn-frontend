import {
    COURSE_INPUT_CHANGE,
    GET_ALL_COURSES_SUCCESS,
    GET_SINGLE_COURSE_SUCCESS,
    POPULATE_DASHBOARD_SUCCESS  
  } from '../actions/types';
  
  const initialState = {
    courses: [],
    course:{},
    lessonCount:0,
    subjectCount:0,
    dashboardData:[],
    excelling:0,
    average:0,
    belowAverage:0,
    noRating:0,
    excellingText:'',
    averageText:'',
    belowAverageText:'',
    noRatingText:'',
    selectedCategory:'Unknown Category',    
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
        
        case POPULATE_DASHBOARD_SUCCESS:
            return {
                ...state,
                excelling:action.payload.excelling,
                average:action.payload.average,
                belowAverage:action.payload.belowAverage,
                noRating:action.payload.noRating,
                excellingText:action.payload.excellingText,
                averageText:action.payload.averageText,
                belowAverageText:action.payload.belowAverageText,
                noRatingText:action.payload.noRatingText,
                dashboardData:action.payload.dashboard,
            };

      default:
        return state;
    }
  };
  export default courseReducer;
  