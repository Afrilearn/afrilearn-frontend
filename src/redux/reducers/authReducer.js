import {
  INPUT_CHANGE  
} from '../actions/types';

const initialState = {
  drop: false,
  redirect: false,
  location:'/profile'  
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };  
    default:
      return state;
  }
};
export default authReducer;
