import {
  GET_USER_STORIES_SUCCESS,
  USER_STORY_INPUT_CHANGE,
} from "../actions/types";

const initialState = {
  userStories: [],
  agentStoryLoading: false,
  agentStoryStatus: "",
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_STORY_INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case GET_USER_STORIES_SUCCESS:
      return {
        ...state,
        userStories: action.payload,
      };

    default:
      return state;
  }
};
export default searchReducer;
