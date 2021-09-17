import {
 GET_USER_STORIES_SUCCESS
} from "../actions/types";

const initialState = {
  userStories: []  
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_USER_STORIES_SUCCESS:
      return {
        ...state,
        userStories: action.payload
      };

   
    default:
      return state;
  }
};
export default searchReducer;
