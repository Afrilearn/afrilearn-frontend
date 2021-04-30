import {
  GET_CURRENT_CHILD_COURSE_SUCCESS,
  GET_CURRENT_CHILD_COURSE_SUBJECTS_SUCCESS,
  GET_CHILDREN_SUCCESS,
  // LINK_CHILD_ACCOUNT_SUCCESS,
  UNLINK_CHILD_ACCOUNT_SUCCESS,
  UNLINK_CHILDREN_ACCOUNT_SUCCESS,
  DELETE_CHILD_ACCOUNT_SUCCESS,
  DELETE_CHILDREN_ACCOUNT_SUCCESS,
  FETCH_CHILD_ACTIVITIES_SUCCESS,
  INPUT_CHANGE
} from '../actions/types'

const initialState = {
  children: [],
  currentChild: {},
  currentCourse: {},
  courseSubjects: [],
  children: [],
  linkEmail: '',
  childRecentActivities: []
}

const parentReducer = (state = initialState, action) => {
  let arr
  switch (action.type) {
    case GET_CURRENT_CHILD_COURSE_SUCCESS:
      return {
        ...state,
        currentCourse: action.payload.course
      }
    case GET_CURRENT_CHILD_COURSE_SUBJECTS_SUCCESS:
      return {
        ...state,
        courseSubjects: action.payload.subjects
      }
    case INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value
      }
    case GET_CHILDREN_SUCCESS:
      return {
        ...state,
        children: action.payload.children
      }
    case UNLINK_CHILD_ACCOUNT_SUCCESS:
      arr = state.children.slice()
      arr = arr.filter(child => child._id !== action.payload)
      return {
        ...state,
        children: arr
      }
    case DELETE_CHILD_ACCOUNT_SUCCESS:
      arr = state.children.slice()
      arr = arr.filter(child => child._id !== action.payload)
      return {
        ...state,
        children: arr
      }
    // case LINK_CHILD_ACCOUNT_SUCCESS:
    //     arr = state.children.slice();
    //     arr.push(action.payload.user);
    //     return {
    //         ...state,
    //         children: arr,
    //     }
    case UNLINK_CHILDREN_ACCOUNT_SUCCESS:
      return {
        ...state,
        children: state.children.filter(
          (child) => !action.payload.includes(child._id)
        ),
      };
    case DELETE_CHILDREN_ACCOUNT_SUCCESS:
      return {
        ...state,
        children: state.children.filter(
          (child) => !action.payload.includes(child._id)
        ),
      };
    case FETCH_CHILD_ACTIVITIES_SUCCESS:
      return {
        ...state,
        childRecentActivities: action.payload.recentActivities
      };
    default:
      return state
  }
}
export default parentReducer
