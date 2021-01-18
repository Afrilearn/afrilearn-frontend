import {
  INPUT_CHANGE,
  GET_ROLES_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CLEAR_FORM,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  PASSWORD_CHANGE_SUCCESS,
  SOCIAL_LOGIN_UPDATE_SUCCESS,
  AUTH_SUCCESS,
  AUTH_FAILURE,
} from "../actions/types";

const initialState = {
  drop: false,
  redirect: false,
  location: "/profile",
  chartSection: "subject",
  isAuthenticated: false,
  role: "",
  activeEnrolledCourseId: "",
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  referralCode: "",
  passwordMode: true,
  roles: [],
  classes: [],
  classLabel: "Select a Class",
  userId: "",
  user: {},
  courseId: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case GET_ROLES_SUCCESS:
      return {
        ...state,
        roles: action.payload.roles,
        classes: action.payload.courses,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case AUTH_SUCCESS:
      let myObj = {};
      let otherObj = {};

      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
      }
      if (!action.payload.user.role) {
        myObj = {
          location: "/social-login",
          isAuthenticated: false,
        };
      } else {
        myObj = {
          isAuthenticated: true,
          location: "/dashboard",
        };
      }
      otherObj = {
        userId: action.payload.user._id,
        user: action.payload.user,
        activeEnrolledCourseId: action.payload.user.enrolledCourses.length
          ? action.payload.user.enrolledCourses[0]._id
          : "",
        redirect: true,
        email: action.payload.user.email,
        fullName: action.payload.user.fullName,
      };
      return {
        ...state,
        ...myObj,
        ...otherObj,
      };

    case CLEAR_FORM:
      return {
        ...state,
        role: "",
        fullName: "",
        email: "",
        password: "",
        referralCode: "",
        passwordMode: true,
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case AUTH_FAILURE:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: {},
      };
    case PASSWORD_CHANGE_SUCCESS:
      return {
        ...state,
        password: "",
        confirmPassword: "",
      };
    case SOCIAL_LOGIN_UPDATE_SUCCESS:
      return {
        ...state,
        role: action.payload.user.role,
        location: "/dashboard",
        isAuthenticated: true,
        redirect: true,
      };
    default:
      return state;
  }
};
export default authReducer;
