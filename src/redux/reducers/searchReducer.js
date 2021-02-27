import {
  GET_ALL_SEARCH_RESULTS_SUCCESS,
  SEARCH_INPUT_CHANGE,
} from "../actions/types";

const initialState = {
  searchResults: [],
  keyword: "",
  isSearching:false
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case GET_ALL_SEARCH_RESULTS_SUCCESS:
      return {
        ...state,
        searchResults: action.payload.result,
      };

    default:
      return state;
  }
};
export default searchReducer;
