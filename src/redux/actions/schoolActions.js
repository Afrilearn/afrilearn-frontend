import API from '../../assets/js/api'
import { returnErrors } from './errorActions'
import {
    SCHOOL_INPUT_CHANGE
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


export const inputChange = (name, value) => dispatch => {
    dispatch({ type: SCHOOL_INPUT_CHANGE, payload: { name, value } })
}