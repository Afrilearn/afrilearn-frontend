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
  CHECK_USER_AND_JOIN_CLASS_SUCCESS,
  UPDATE_PROFILE_SUCCES,
  PASSWORD_CHANGE_FROM_PROFILE_SUCCESS,
  LOGOUT_SUCCESS,
  UPDATE_PROFILE_PIC_SUCCESS,
  PAYMENT_VERIFICATION_SUCCESS,
  FOLLOW_A_USER_IN_FEED_SUCCESS,
} from "../actions/types";

const initialState = {
  drop: false,
  searchRedirect: false,
  redirect: false,
  location: localStorage.getItem("location"),
  chartSection: "subject",
  searchLocation: "/search",
  isAuthenticated: false,
  inClass: false,
  targetUser: null,
  role: "",
  activeEnrolledCourseId: "",
  activeCourseId: "",
  activeCourseName: "",
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  formFullName: "",
  phoneNumber: "",
  formEmail: "",
  formPassword: "",
  formConfirmPassword: "",
  referralCode: "",
  passwordMode: true,
  confirmPasswordMode: true,
  roles: [],
  classes: [],
  classLabel: "Select a Class",
  userId: "",
  user: {},
  courseId: "",
  formClassId: "",
  formCourseId: "",
  address: "unknown",
  activeCoursePaidStatus: false,
  dashboardRoute: false,
  className: "",
  schoolName: "",
  students: 0,
  teachers: 0,
  numberOfClassNote: 0,
  numberOfQuizQuestions: 0,
  state: "",
  allUsers: 0,
  courseCategoryId: "",
  redirectTo: "",
  rolesLoader: false,
  authLoader: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case CHECK_USER_AND_JOIN_CLASS_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
      };
    case FOLLOW_A_USER_IN_FEED_SUCCESS:
      const inFollowing = state.user.followings.includes(
        action.payload.followed.userId._id
      );
      const currentUser = state.user;
      let currentFollowings = state.user.followings;
      console.log("current", currentFollowings);
      if (inFollowing) {
        currentFollowings = currentFollowings.filter(
          (following) => following !== action.payload.followed.userId._id
        );
        console.log("removing", currentFollowings);
      } else {
        currentFollowings = [
          ...currentUser.followings,
          action.payload.followed.userId._id,
        ];
        console.log("adding", currentFollowings);
      }
      return {
        ...state,
        user: { ...currentUser, followings: [...currentFollowings] },
      };
    case GET_ROLES_SUCCESS:
      return {
        ...state,
        roles: action.payload.roles,
        classes: action.payload.courses,
        students: action.payload.students,
        teachers: action.payload.teachers,
        numberOfClassNote: action.payload.numberOfClassNote,
        numberOfQuizQuestions: action.payload.numberOfQuizQuestions,
        allUsers: action.payload.allUsers,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case AUTH_SUCCESS:
    case SOCIAL_LOGIN_UPDATE_SUCCESS:
      let myObj = {};
      let otherObj = {};

      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
      }

      if (!action.payload.user.role) {
        myObj = {
          isAuthenticated: false,
          location: "/social-login",
        };
      } else {
        if (action.payload.user.role === "602f3ce39b146b3201c2dc1d") {
          let activeEnrolledCourseId = "";
          if (
            action.payload.user.adminRoles &&
            action.payload.user.adminRoles.length &&
            action.payload.user.adminRoles.length > 0
          ) {
            activeEnrolledCourseId =
              action.payload.user.adminRoles[0] &&
              action.payload.user.adminRoles[0].classId &&
              action.payload.user.adminRoles[0].classId._id;
          }
          if (
            action.payload.user.classOwnership &&
            action.payload.user.classOwnership.length &&
            action.payload.user.classOwnership.length > 0
          ) {
            activeEnrolledCourseId =
              action.payload.user.classOwnership[0] &&
              action.payload.user.classOwnership[0]._id;
          }
          myObj = {
            isAuthenticated: true,
            location: "/classes/teacher",
            activeEnrolledCourseId,
            activeCourseId:
              action.payload.user.classOwnership &&
              action.payload.user.classOwnership.length
                ? action.payload.user.classOwnership[0].enrolledCourse._id
                : "",
            activeCourseName:
              action.payload.user.classOwnership &&
              action.payload.user.classOwnership.length
                ? action.payload.user.classOwnership[0].name
                : "",
            activeCoursePaidStatus:
              action.payload.user.classOwnership &&
              action.payload.user.classOwnership.length
                ? action.payload.user.classOwnership[0].enrolledCourse
                    .paymentIsActive
                : "",
          };
        } else if (action.payload.user.role === "5fd08fba50964811309722d5") {
          myObj = {
            activeEnrolledCourseId:
              action.payload.user.enrolledCourses &&
              action.payload.user.enrolledCourses.length
                ? action.payload.user.enrolledCourses[0]._id
                : "",
            activeCourseId:
              action.payload.user.enrolledCourses &&
              action.payload.user.enrolledCourses.length
                ? action.payload.user.enrolledCourses[0].courseId._id
                : "",
            activeCourseName:
              action.payload.user.enrolledCourses &&
              action.payload.user.enrolledCourses.length
                ? action.payload.user.enrolledCourses[0].courseId.name
                : "",
            activeCoursePaidStatus:
              action.payload.user.enrolledCourses &&
              action.payload.user.enrolledCourses.length
                ? action.payload.user.enrolledCourses[0].paymentIsActive
                : "",
            isAuthenticated: true,
            location: "/dashboard",
          };
        } else if (action.payload.user.role === "606ed82e70f40e18e029165e") {
          myObj = {
            isAuthenticated: true,
            location: "/dashboard",
          };
        } else if (action.payload.user.role === "607ededa2712163504210684") {
          myObj = {
            isAuthenticated: true,
            location: "/dashboard",
          };
        }
      }
      otherObj = {
        userId: action.payload.user._id,
        user: action.payload.user,
        redirect: true,
        email: action.payload.user.email,
        fullName: action.payload.user.fullName,
        role: action.payload.user.role ? action.payload.user.role : "",
        state: action.payload.user.state ? action.payload.user.state : "",
      };

      return {
        ...state,
        ...myObj,
        ...otherObj,
      };
    case CLEAR_FORM:
      return {
        ...state,
        fullName: "",
        email: "",
        password: "",
        referralCode: "",
        passwordMode: true,
        courseId: "",
        confirmPassword: "",
        confirmPasswordMode: true,
        formFullName: "",
        formEmail: "",
        formPassword: "",
        formConfirmPassword: "",
        formCourseId: "",
      };
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case AUTH_FAILURE:
      localStorage.removeItem("token");
      localStorage.setItem("location", "/");
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
    case PASSWORD_CHANGE_FROM_PROFILE_SUCCESS:
      return {
        ...state,
        password: "",
        confirmPassword: "",
      };
    case UPDATE_PROFILE_SUCCES:
      return {
        ...state,
        user: {
          ...state.user,
          fullName: action.payload.fullName,
          phoneNumber: action.payload.phoneNumber,
          dateOfBirth: action.payload.dateOfBirth,
          country: action.payload.country,
          state: action.payload.state,
          gender: action.payload.gender,
        },
      };
    case UPDATE_PROFILE_PIC_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          profilePhotoUrl: action.payload.profilePhotoUrl,
        },
      };
    case PAYMENT_VERIFICATION_SUCCESS:
      return {
        ...state,
        activeCoursePaidStatus: action.payload,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        drop: false,
        searchRedirect: false,
        redirect: false,
        location: "",
        chartSection: "subject",
        searchLocation: "/search",
        isAuthenticated: false,
        role: "",
        activeEnrolledCourseId: "",
        activeCourseId: "",
        activeCourseName: "",
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        referralCode: "",
        passwordMode: true,
        classLabel: "Select a Class",
        userId: "",
        user: {},
        courseId: "",
        address: "unknown",
        activeCoursePaidStatus: false,
        dashboardRoute: false,
        className: "",
      };
    default:
      return state;
  }
};
export default authReducer;
