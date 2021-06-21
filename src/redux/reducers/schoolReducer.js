import {
  ACCEPT_REJECT_SCHOOL_ADMIN_REQUEST_SUCCESS,
  ACCEPT_REJECT_SCHOOL_TEACHER_REQUEST_SUCCESS,
  GET_SCHOOL_COURSES_SUCCESS,
  GET_SCHOOL_PROFILE_SUCCESS,
  SCHOOL_ADD_EXISTING_TEACHER_SUCCESS,
  SCHOOL_INPUT_CHANGE,
  SCHOOL_SIGNUP_FOR_STUDENT_SUCCESS,
  SCHOOL_SIGNUP_FOR_ADMIN_SUCCESS,
  UPDATE_CLASS_NAME_SUCCESS,
  UPLOAD_SCHOOL_COVER_PHOTO_SUCCESS,
  UPLOAD_SCHOOL_LOGO_SUCCESS,
  UPLOAD_SCHOOL_PROFILE_SUCCESS,
} from "../actions/types";

const initialState = {
  schools: [],
  school: {},
  courseId: "",
  courses: [],
  profile: {},
  logo: "",
  coverPhoto: "",
  name: "",
  description: "",
  regNumber: "",
  location: "",
  phone: "",
  website: "",
};

const schoolReducer = (state = initialState, action) => {
  let arr;
  switch (action.type) {
    case SCHOOL_INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
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
        profile: action.payload.profile,
        logo: action.payload.profile.logo,
        coverPhoto: action.payload.profile.coverPhoto,
        name: action.payload.profile.name,
        description: action.payload.profile.description,
        regNumber: action.payload.profile.regNumber,
        location: action.payload.profile.location,
        phone: action.payload.profile.phone,
        website: action.payload.profile.website,
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
    case SCHOOL_SIGNUP_FOR_ADMIN_SUCCESS:
      return {
        ...state,
        school: {
          ...state.school,
          numOfTeachers: state.school.numOfTeachers + 1,
        },
      };
    case UPLOAD_SCHOOL_PROFILE_SUCCESS:
      return {
        ...state,
        name: action.payload.school.name,
        description: action.payload.school.description,
        regNumber: action.payload.school.regNumber,
        location: action.payload.school.location,
        phone: action.payload.school.phone,
        website: action.payload.school.website,
      };
    case UPLOAD_SCHOOL_COVER_PHOTO_SUCCESS:
      return {
        ...state,
        coverPhoto: action.payload.school.coverPhoto,
      };
    case UPLOAD_SCHOOL_LOGO_SUCCESS:
      return {
        ...state,
        logo: action.payload.school.logo,
      };
    case GET_SCHOOL_COURSES_SUCCESS:
      return {
        ...state,
        courses: action.payload.courses,
      };
    case UPDATE_CLASS_NAME_SUCCESS:
      const indexOfChangedClass = state.school.state.school.schoolClassesData.findIndex(
        (item) => item.classId === action.payload.class._id
      );
      state.school.schoolClassesData[indexOfChangedClass].className =
        action.payload.class.name;
      return {
        ...state,
        school: state.school,
      };
    default:
      return state;
  }
};
export default schoolReducer;
