import API from '../../assets/js/api'
import { returnErrors } from './errorActions'
import { returnSuccess } from './successActions'
import {
    GET_CURRENT_CHILD_COURSE_SUBJECTS_SUCCESS,
    GET_CURRENT_CHILD_COURSE_SUBJECTS_FAILURE,
    GET_CHILDREN_SUCCESS,
    GET_CHILDREN_FAILURE,
    UNLINK_CHILD_ACCOUNT_SUCCESS,
    UNLINK_CHILD_ACCOUNT_FAILURE,
    UNLINK_CHILDREN_ACCOUNT_SUCCESS,
    UNLINK_CHILDREN_ACCOUNT_FAILURE,
    LINK_CHILD_ACCOUNT_SUCCESS,
    LINK_CHILD_ACCOUNT_FAILURE,
    DELETE_CHILD_ACCOUNT_SUCCESS,
    DELETE_CHILD_ACCOUNT_FAILURE,
    DELETE_CHILDREN_ACCOUNT_SUCCESS,
    DELETE_CHILDREN_ACCOUNT_FAILURE,
    FETCH_CHILD_ACTIVITIES_SUCCESS,
    FETCH_CHILD_ACTIVITIES_FAILURE,
    INPUT_CHANGE
} from "./types";

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

export const getCurrentCourseSubjects = courseId => async dispatch => {
  try {
    document.body.classList.add('loading-indicator')
    const result = await API.getCourseSubjects(courseId)
    dispatch({
      type: GET_CURRENT_CHILD_COURSE_SUBJECTS_SUCCESS,
      payload: result.data.data
    })
    dispatchSuccess(
      dispatch,
      `Children fetched successfully`,
      GET_CURRENT_CHILD_COURSE_SUBJECTS_SUCCESS
    )
    document.body.classList.remove('loading-indicator')
  } catch (err) {
    document.body.classList.remove('loading-indicator')
    dispatchError(dispatch, err, GET_CURRENT_CHILD_COURSE_SUBJECTS_FAILURE)
  }
}

export const inputChange = (name, value) => dispatch => {
    dispatch({ type: INPUT_CHANGE, payload: { name, value } })
}

export const getChildren = () => async dispatch => {
    try {
        document.body.classList.add('loading-indicator')
        const result = await API.getChildren();
        console.log(result.data.data)

        dispatch({
            type: GET_CHILDREN_SUCCESS,
            payload: {
                children: result.data.data.children
            }
        })

        document.body.classList.remove('loading-indicator')
    } catch (err) {
        document.body.classList.remove('loading-indicator')
        dispatch(
            returnErrors(
                err.response.data.errors
                    ? err.response.data.errors
                    : err.response.data.error,
                err.response.data.status,
                'GET_CHILDREN_FAILURE'
            )
        )
        dispatch({
            type: GET_CHILDREN_FAILURE
        })
    }
}

export const linkChildAccount = data => async dispatch => {
    try {
        document.body.classList.add('loading-indicator')
        const result = await API.linkChildAccount(data);

        dispatch({
            type: LINK_CHILD_ACCOUNT_SUCCESS,
            payload: result.data.data
        })
        dispatchSuccess(
            dispatch,
            'Child account linked successfully',
            LINK_CHILD_ACCOUNT_SUCCESS
        )
        document.body.classList.remove('loading-indicator')
    } catch (err) {
        document.body.classList.remove('loading-indicator')
        dispatchError(dispatch, err, LINK_CHILD_ACCOUNT_FAILURE)
    }
}

export const unlinkChildAccount = data => async dispatch => {
    try {
        document.body.classList.add('loading-indicator')
        const result = await API.unlinkChildAccount(data)

        dispatch({
            type: UNLINK_CHILD_ACCOUNT_SUCCESS,
            payload: result.data.data.user._id
        })
        dispatchSuccess(
            dispatch,
            'Child account unlinked successfully',
            UNLINK_CHILD_ACCOUNT_SUCCESS
        )
        document.body.classList.remove('loading-indicator')
    } catch (err) {
        document.body.classList.remove('loading-indicator')
        dispatchError(dispatch, err, UNLINK_CHILD_ACCOUNT_FAILURE)
    }
}

export const unlinkChildrenAccounts = data => async dispatch => {
    try {
        document.body.classList.add('loading-indicator')
        console.log(data);
        const result = await API.unlinkChildrenAccounts(data)

        dispatch({
            type: UNLINK_CHILDREN_ACCOUNT_SUCCESS,
            payload: data.childrenIds
        })
        dispatchSuccess(
            dispatch,
            'Children accounts unlinked successfully',
            UNLINK_CHILDREN_ACCOUNT_SUCCESS
        )
        document.body.classList.remove('loading-indicator')
    } catch (err) {
        document.body.classList.remove('loading-indicator')
        dispatchError(dispatch, err, UNLINK_CHILDREN_ACCOUNT_FAILURE)
    }
}

export const deleteChildAccount = data => async dispatch => {
    try {
        document.body.classList.add('loading-indicator')
        const result = await API.deleteChildAccount(data)

        dispatch({
            type: DELETE_CHILD_ACCOUNT_SUCCESS,
            payload: result.data.data.user._id
        })
        dispatchSuccess(
            dispatch,
            'Child account deleted successfully',
            DELETE_CHILD_ACCOUNT_SUCCESS
        )
        document.body.classList.remove('loading-indicator')
    } catch (err) {
        document.body.classList.remove('loading-indicator')
        dispatchError(dispatch, err, DELETE_CHILD_ACCOUNT_FAILURE)
    }
}

export const deleteChildrenAccounts = data => async dispatch => {
    try {
        document.body.classList.add('loading-indicator')
        console.log(data);
        const result = await API.deleteChildrenAccounts(data)

        dispatch({
            type: DELETE_CHILDREN_ACCOUNT_SUCCESS,
            payload: data.childrenIds
        })
        dispatchSuccess(
            dispatch,
            'Children accounts deleted successfully',
            DELETE_CHILDREN_ACCOUNT_SUCCESS
        )
        document.body.classList.remove('loading-indicator')
    } catch (err) {
        document.body.classList.remove('loading-indicator')
        dispatchError(dispatch, err, DELETE_CHILDREN_ACCOUNT_FAILURE)
    }
}

export const fetchChildRecentActivities = data => async dispatch => {
    try {
        document.body.classList.add('loading-indicator')
        const result = await API.getChildActivities(data)

        dispatch({
            type: FETCH_CHILD_ACTIVITIES_SUCCESS,
            payload: result.data.data
        })
        document.body.classList.remove('loading-indicator')
    } catch (err) {
        document.body.classList.remove('loading-indicator')
        dispatchError(dispatch, err, FETCH_CHILD_ACTIVITIES_FAILURE)
    }
}
