import { SCHOOL_INPUT_CHANGE } from '../actions/types'

const initialState = {
  formEmail: '',
  formFullName: '',
  formCourseId: ''
}

const schoolReducer = (state = initialState, action) => {
  switch (action.type) {
    case SCHOOL_INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value
      }
    default:
      return state
  }
}

export default schoolReducer
