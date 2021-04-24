import API from '../../assets/js/api'
import { returnErrors } from './errorActions'
import {
  GET_PARENT_CHILDREN_SUCCESS,
  GET_PARENT_CHILDREN_FAILURE,
  GET_CURRENT_CHILD_COURSE_SUCCESS,
  GET_CURRENT_CHILD_COURSE_FAILURE,
  GET_CURRENT_CHILD_COURSE_SUBJECTS_SUCCESS,
  GET_CURRENT_CHILD_COURSE_SUBJECTS_FAILURE,
} from './types'

const dispatchError = (dispatch, err, id) => {
  dispatch(
    returnErrors(
      err.response.data.errors
        ? err.response.data.errors
        : err.response.data.error,
      err.response.data.status,
      id
    )
  )
}
const dispatchSuccess = (dispatch, message, id, status = '200') => {
  dispatch(returnErrors(message, status, id))
}

export const getChildren = () => async (dispatch, getState) => {
  try {
    document.body.classList.add('loading-indicator')
    const result = await API.getParentChildren(getState().auth.user._id)
    dispatch({ type: GET_PARENT_CHILDREN_SUCCESS, payload: result.data.data })
    dispatchSuccess(
      dispatch,
      `Children fetched successfully`,
      GET_PARENT_CHILDREN_SUCCESS
    )
    document.body.classList.remove('loading-indicator')
  } catch (err) {
    document.body.classList.remove('loading-indicator')
    dispatchError(dispatch, err, GET_PARENT_CHILDREN_FAILURE)
  }
}

export const getCurrentCourseSubjects = courseId => async (dispatch) => {
    try {
        document.body.classList.add('loading-indicator')
        const result = await API.getCourseSubjects(courseId)
        dispatch({ type: GET_CURRENT_CHILD_COURSE_SUBJECTS_SUCCESS, payload: result.data.data })
        dispatchSuccess(
          dispatch,
          `Children fetched successfully`,
          GET_CURRENT_CHILD_COURSE_SUBJECTS_SUCCESS
        )
        document.body.classList.remove('loading-indicator')
      } catch (err) {
          console.log(err);
        document.body.classList.remove('loading-indicator')
        dispatchError(dispatch, err, GET_CURRENT_CHILD_COURSE_SUBJECTS_FAILURE)
      }
}
