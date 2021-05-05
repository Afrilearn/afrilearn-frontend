import {
  ACCEPT_REJECT_SCHOOL_ADMIN_REQUEST_SUCCESS,
  ACCEPT_REJECT_SCHOOL_TEACHER_REQUEST_SUCCESS,
  GET_SCHOOL_COURSES_SUCCESS,
  GET_SCHOOL_PROFILE_SUCCESS,
  SCHOOL_ADD_EXISTING_TEACHER_SUCCESS,
  SCHOOL_SIGNUP_FOR_STUDENT_SUCCESS,
  UPLOAD_SCHOOL_COVER_PHOTO_SUCCESS,
} from "../actions/types";

const initialState = {
  schools: [],
  school: {},
  courseId: "",
  courses: [],
  profile: {},
  logo: "",
  coverPhoto: "",
};

const schoolReducer = (state = initialState, action) => {
  let arr;
  switch (action.type) {
    case ACCEPT_REJECT_SCHOOL_TEACHER_REQUEST_SUCCESS:
      return {
        ...state,
      };
    case ACCEPT_REJECT_SCHOOL_ADMIN_REQUEST_SUCCESS:
      return {
        ...state,
      };
    case GET_SCHOOL_PROFILE_SUCCESS:
      return {
        ...state,
        school: action.payload,
      };
    case SCHOOL_ADD_EXISTING_TEACHER_SUCCESS:
      return {
        ...state,
      };
    case SCHOOL_SIGNUP_FOR_STUDENT_SUCCESS:
      return {
        ...state,
        school: {
          ...state.school,
          numOfStudents: state.school.numOfStudents + 1,
        },
      };
    case UPLOAD_SCHOOL_COVER_PHOTO_SUCCESS:
      return {
        ...state,
        coverPhoto: action.payload.school.coverPhoto,
      };
    case GET_SCHOOL_COURSES_SUCCESS:
      return {
        ...state,
        courses: action.payload.courses,
        profile: action.payload.profile,
        logo: action.payload.profile.logo,
        coverPhoto: action.payload.profile.coverPhoto,
      };
    default:
      return state;
  }
};
export default schoolReducer;
