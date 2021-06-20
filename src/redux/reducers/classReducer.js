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
  CREATE_COMMENT_TO_ANNOUNCEMENT_SUCCESS,
  GET_PEOPLE_IN_PAYMENT_CLASS_SUCCESS,
  DELETE_ASSIGNED_CONTENT_SUCCESS,
  CREATE_COMMENT_TO_CONTENT_SUCCESS,
  GET_CLASS_ASSIGNED_CONTENTS_SUCCESS,
  GET_CLASS_PAST_QUESTIONS_SUCCESS,
  GET_CLASS_SUBJECTS_SUCCESS,
  GET_CLASS_ANNOUNCEMENTS_SUCCESS,
  GET_CLASS_BASICS_SUCCESS,
  GET_CLASS_ASSIGNED_CONTENT_SUCCESS,
  ADD_NEW_ADMIN_TO_CLASS_SUCCESS,
} from "../actions/types";

const initialState = {
  classes: [],
  class: {},
  classMembersLoading: false,
  classMembers: [],
  isLoading: false,
  adminsLoading: false,
  admins: [],
  classMembersPayment: [],
  teacherAssignedContentsLoading: false,
  teacherAssignedContent: {},
  teacherAssignedContentLoading: false,
  teacherAssignedContents: [],
  classRelatedPastQuestionsLoading: false,
  classRelatedPastQuestions: [],
  classRelatedSubjectsLoading: false,
  classRelatedSubjects: [],
  classAnnouncementsLoading: false,
  classAnnouncements: [],
};

const classReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLASS_INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case GET_CLASS_MEMBERS_SUCCESS:
      return {
        ...state,
        classMembers: action.payload.classMembers,
        admins: action.payload.admins,
      };
    case GET_CLASS_ANNOUNCEMENTS_SUCCESS:
      return {
        ...state,
        classAnnouncements: action.payload.announcements,
      };
    case GET_CLASS_SUBJECTS_SUCCESS:
      return {
        ...state,
        classRelatedSubjects: action.payload.subjects,
      };
    case GET_CLASS_PAST_QUESTIONS_SUCCESS:
      return {
        ...state,
        classRelatedPastQuestions: action.payload.relatedPastQuestions,
      };
    case GET_CLASS_ASSIGNED_CONTENTS_SUCCESS:
      return {
        ...state,
        teacherAssignedContents: action.payload.assignedContents,
      };
    case GET_CLASS_ASSIGNED_CONTENT_SUCCESS:
      return {
        ...state,
        teacherAssignedContent: action.payload.assignedContent,
      };

    case CREATE_COMMENT_TO_CONTENT_SUCCESS:
      const teacherAssignedContent = state.teacherAssignedContent;
      teacherAssignedContent.comments.push(action.payload);
      return {
        ...state,
        teacherAssignedContent: { ...teacherAssignedContent },
      };
    case DELETE_ASSIGNED_CONTENT_SUCCESS:
      const teacherAssignedContents = state.class.teacherAssignedContents.filter(
        (item) => item._id !== action.payload._id
      );
      return {
        ...state,
        teacherAssignedContents,
      };
    case GET_SINGLE_CLASS_SUCCESS:
      return {
        ...state,
        class: action.payload.class,
        // classMembers: action.payload.classMembers,
      };
    case GET_CLASS_BASICS_SUCCESS:
      return {
        ...state,
        class: action.payload.class,
        // classMembers: action.payload.classMembers,
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
      let newArray = state.classAnnouncements;
      newArray.unshift(action.payload);
      state.classAnnouncements = [...newArray];
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
    case ADD_NEW_ADMIN_TO_CLASS_SUCCESS:
      return {
        ...state,
        admins: [...state.admins, action.payload.admin],
      };

    case SCHOOL_UNLINK_TEACHER_ACCOUNT_SUCCESS:
      return {
        ...state,
        admins: state.admins.filter(
          (user) => user.userId._id !== action.payload._id
        ),
      };

    case CREATE_COMMENT_TO_ANNOUNCEMENT_SUCCESS:
      const classAnnouncements = state.classAnnouncements;
      const classAnnouncementUpdated = state.classAnnouncements.find(
        (item) => item._id === action.payload.announcementId
      );
      classAnnouncementUpdated.comments.push(action.payload);

      return {
        ...state,
        classAnnouncements: [...state.classAnnouncements],
      };

    case ADD_ANNOUNCEMENT_SUCCESS:
      const classAnnouncementsN = state.classAnnouncements;
      classAnnouncementsN.push(action.payload);

      return {
        ...state,
        classAnnouncements: classAnnouncementsN,
      };

    case GET_PEOPLE_IN_PAYMENT_CLASS_SUCCESS:
      return {
        ...state,
        classMembersPayment: action.payload.classMembers,
      };
    default:
      return state;
  }
};
export default classReducer;
