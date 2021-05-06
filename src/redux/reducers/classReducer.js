import {
  GET_SINGLE_CLASS_SUCCESS,
  GET_CLASSES_SUCCESS,
  USER_JOIN_THROUGH_INVITE_SUCCESS,
  SEND_CLASS_INVITE_SUCCESS,
  ACCEPT_REJECT_CLASSMEMBER_SUCCESS,
  ADD_CLASS_SUCCESS,
  ADD_ANNOUNCEMENT_SUCCESS,
  CLASS_INPUT_CHANGE,
  GET_CLASS_MEMBERS_SUCCESS,
  SCHOOL_DELETE_STUDENT_ACCOUNT_SUCCESS,
  SCHOOL_UNLINK_STUDENT_ACCOUNT_SUCCESS,
  SCHOOL_DELETE_TEACHER_ACCOUNT_SUCCESS,
  SCHOOL_UNLINK_TEACHER_ACCOUNT_SUCCESS,
} from "../actions/types";

const initialState = {
  classes: [],
  class: {},
  classMembers: [],
  isLoading: false,
  admins: [],
};

const classReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLASS_INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case GET_SINGLE_CLASS_SUCCESS:
      return {
        ...state,
        class: action.payload.class,
        classMembers: action.payload.classMembers,
      };
    case GET_CLASSES_SUCCESS:
      return {
        ...state,
        classes: action.payload.classes,
      };
    case USER_JOIN_THROUGH_INVITE_SUCCESS:
      return {
        ...state,
      };
    case SEND_CLASS_INVITE_SUCCESS:
      return {
        ...state,
      };
    case ACCEPT_REJECT_CLASSMEMBER_SUCCESS:
      return {
        ...state,
      };
    case ADD_CLASS_SUCCESS:
      return {
        ...state,
      };
    case ADD_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
      };
    case GET_CLASS_MEMBERS_SUCCESS:
      return {
        ...state,
        admins: action.payload.admins,
        classMembers: action.payload.classMembers,
      };

    case SCHOOL_DELETE_STUDENT_ACCOUNT_SUCCESS:
      return {
        ...state,
        classMembers: state.classMembers.filter(
          (user) => user.userId._id !== action.payload._id
        ),
      };

    case SCHOOL_UNLINK_STUDENT_ACCOUNT_SUCCESS:
      return {
        ...state,
        classMembers: state.classMembers.filter(
          (user) => user.userId._id !== action.payload._id
        ),
      };
    case SCHOOL_DELETE_TEACHER_ACCOUNT_SUCCESS:
      return {
        ...state,
        admins: state.admins.filter(
          (user) => user.userId._id !== action.payload._id
        ),
      };

    case SCHOOL_UNLINK_TEACHER_ACCOUNT_SUCCESS:
      return {
        ...state,
        admins: state.admins.filter(
          (user) => user.userId._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};
export default classReducer;
