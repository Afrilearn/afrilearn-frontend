import {
  GET_PARENT_CHILDREN_SUCCESS,
  GET_CURRENT_CHILD_COURSE_SUCCESS
} from '../actions/types'

const initialState = {
  children: [],
  currentCourse: {}
}

const parentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PARENT_CHILDREN_SUCCESS:
      return {
        ...state,
        children: action.payload.children
      }
    case GET_CURRENT_CHILD_COURSE_SUCCESS:
      return {
        ...state,
        currentCourse: action.payload.course
      }
    default:
      return state
  }
}

export default parentReducer
