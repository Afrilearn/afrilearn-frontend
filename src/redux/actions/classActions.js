import API from "../../assets/js/api";
import { returnErrors } from "./errorActions";

import {
  GET_CLASSES_SUCCESS,
  GET_CLASSES_FAILURE,
  GET_SINGLE_CLASS_SUCCESS,
  GET_SINGLE_CLASS_FAILURE,
  CREATE_COMMENT_TO_ANNOUNCEMENT_SUCCESS,
  CREATE_COMMENT_TO_ANNOUNCEMENT_FAILURE,
  CREATE_COMMENT_TO_CONTENT_FAILURE,
  CREATE_COMMENT_TO_CONTENT_SUCCESS,
  ASSIGN_CONTENT_TO_STUDENT_SUCCESS,
  ASSIGN_CONTENT_TO_STUDENT_FAILURE,
  SEND_CLASS_REQUEST_SUCCESS,
  SEND_CLASS_REQUEST_FAILURE,
  USER_JOIN_THROUGH_INVITE_SUCCESS,
  USER_JOIN_THROUGH_INVITE_FAILURE,
  SEND_CLASS_INVITE_SUCCESS,
  SEND_CLASS_INVITE_FAILURE,
  ACCEPT_REJECT_CLASSMEMBER_SUCCESS,
  ACCEPT_REJECT_CLASSMEMBER_FAILURE,
  ADD_CLASS_SUCCESS,
  ADD_CLASS_FAILURE,
  ADD_ANNOUNCEMENT_FAILURE,
  ADD_ANNOUNCEMENT_SUCCESS,
  CLASS_INPUT_CHANGE,
  GET_CLASS_MEMBERS_SUCCESS,
  GET_CLASS_MEMBERS_FAILURE,
  SCHOOL_UNLINK_STUDENT_ACCOUNT_SUCCESS,
  SCHOOL_UNLINK_STUDENT_ACCOUNT_FAILURE,
  SCHOOL_DELETE_TEACHER_ACCOUNT_SUCCESS,
  SCHOOL_DELETE_TEACHER_ACCOUNT_FAILURE,
  SCHOOL_UNLINK_TEACHER_ACCOUNT_SUCCESS,
  SCHOOL_UNLINK_TEACHER_ACCOUNT_FAILURE,
  SCHOOL_DELETE_STUDENT_ACCOUNT_SUCCESS,
  SCHOOL_DELETE_STUDENT_ACCOUNT_FAILURE,
  GET_PEOPLE_IN_PAYMENT_CLASS_SUCCESS,
  DELETE_ASSIGNED_CONTENT_SUCCESS,
  DELETE_ASSIGNED_CONTENT_FAILURE,
  GET_CLASS_SUBJECTS_SUCCESS,
  GET_CLASS_SUBJECTS_FAILURE,
  GET_CLASS_PAST_QUESTIONS_SUCCESS,
  GET_CLASS_PAST_QUESTIONS_FAILURE,
  GET_CLASS_BASICS_SUCCESS,
  GET_CLASS_BASICS_FAILURE,
  GET_CLASS_ANNOUNCEMENTS_SUCCESS,
  GET_CLASS_ANNOUNCEMENTS_FAILURE,
  GET_CLASS_ASSIGNED_CONTENTS_SUCCESS,
  GET_CLASS_ASSIGNED_CONTENTS_FAILURE,
  GET_CLASS_ASSIGNED_CONTENT_SUCCESS,
  GET_CLASS_ASSIGNED_CONTENT_FAILURE,
} from "./types";


export const joinClassApproved = (classId, email, fullName, password) => async (
  dispatch
) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.joinApproved(classId, email, fullName, password);

    dispatch({
      type: USER_JOIN_THROUGH_INVITE_SUCCESS,
      payload: {
        user: result.data.data.user,
      },
    });
    dispatch(
      returnErrors(
        "Class request has been approved. Login to continue",
        "200",
        "USER_JOIN_THROUGH_INVITE_SUCCESS"
      )
    );
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "USER_JOIN_THROUGH_INVITE_FAILURE"
      )
    );
    dispatch({
      type: USER_JOIN_THROUGH_INVITE_FAILURE,
    });
  }
};

export const acceptRejectClassmember = (classId, userId, status) => async (
  dispatch
) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.acceptRejectClassmember(classId, userId, status);

    dispatch({
      type: ACCEPT_REJECT_CLASSMEMBER_SUCCESS,
      payload: {
        user: result.data.data.user,
      },
    });
    dispatch(
      returnErrors(
        "Classmember status changed",
        "200",
        "ACCEPT_REJECT_CLASSMEMBER_SUCCESS"
      )
    );
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "ACCEPT_REJECT_CLASSMEMBER_FAILURE"
      )
    );
    dispatch({
      type: ACCEPT_REJECT_CLASSMEMBER_FAILURE,
    });
  }
};

export const sendClassInvitation = (email, link) => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.sendClassInvite(email, link);

    dispatch({
      type: SEND_CLASS_INVITE_SUCCESS,
      payload: {
        user: result.data.data.user,
      },
    });
    dispatch(
      returnErrors("Class invite sent.", "200", "SEND_CLASS_INVITE_SUCCESS")
    );
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "SEND_CLASS_INVITE_FAILURE"
      )
    );
    dispatch({
      type: SEND_CLASS_INVITE_FAILURE,
    });
  }
};

export const getClasses = () => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.getClasses();

    dispatch({
      type: GET_CLASSES_SUCCESS,
      payload: {
        classes: result.data.data.classes,
      },
    });

    document.body.classList.remove("loading-indicator");
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "GET_CLASSES_FAILURE"
      )
    );
    dispatch({
      type: GET_CLASSES_FAILURE,
    });
  }
};

export const getClass = (classId) => async (dispatch) => {
  try {
    dispatch({
      type: CLASS_INPUT_CHANGE,
      payload: {
        name: "isLoading",
        value: true,
      },
    });
    document.body.classList.add("loading-indicator");
    const result = await API.getClass(classId);

    dispatch({
      type: GET_SINGLE_CLASS_SUCCESS,
      payload: {
        class: result.data.data.class,
        classMembers: result.data.data.classMembers,
      },
    });

    document.body.classList.remove("loading-indicator");
    dispatch({
      type: CLASS_INPUT_CHANGE,
      payload: {
        name: "isLoading",
        value: false,
      },
    });
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "GET_SINGLE_CLASS_FAILURE"
      )
    );
    dispatch({
      type: GET_SINGLE_CLASS_FAILURE,
    });
    dispatch({
      type: CLASS_INPUT_CHANGE,
      payload: {
        name: "isLoading",
        value: false,
      },
    });
  }
};
export const getClassBasicDetails = (classId) => async (dispatch) => {
  try {
    dispatch({
      type: CLASS_INPUT_CHANGE,
      payload: {
        name: "isLoading",
        value: true,
      },
    });
    document.body.classList.add("loading-indicator");
    const result = await API.getClassBasicDetails(classId);

    dispatch({
      type: GET_CLASS_BASICS_SUCCESS,
      payload: {
        class: result.data.data.class,
      },
    });

    document.body.classList.remove("loading-indicator");
    dispatch({
      type: CLASS_INPUT_CHANGE,
      payload: {
        name: "isLoading",
        value: false,
      },
    });
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "GET_CLASS_BASICS_FAILURE"
      )
    );
    dispatch({
      type: GET_CLASS_BASICS_FAILURE,
    });
    dispatch({
      type: CLASS_INPUT_CHANGE,
      payload: {
        name: "isLoading",
        value: false,
      },
    });
  }
};
export const getClassSubjects = (classId) => async (dispatch) => {
  try {
    dispatch({
      type: CLASS_INPUT_CHANGE,
      payload: {
        name: "classRelatedSubjectsLoading",
        value: true,
      },
    });
    document.body.classList.add("loading-indicator");
    const result = await API.getSubjectsInClass(classId);

    dispatch({
      type: GET_CLASS_SUBJECTS_SUCCESS,
      payload: {
        subjects: result.data.data.subjects,
      },
    });

    document.body.classList.remove("loading-indicator");
    dispatch({
      type: CLASS_INPUT_CHANGE,
      payload: {
        name: "classRelatedSubjectsLoading",
        value: false,
      },
    });
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "GET_CLASS_SUBJECTS_FAILURE"
      )
    );
    dispatch({
      type: GET_CLASS_SUBJECTS_FAILURE,
    });
    dispatch({
      type: CLASS_INPUT_CHANGE,
      payload: {
        name: "classRelatedSubjectsLoading",
        value: false,
      },
    });
  }
};
export const getClassPastQuestions = (classId) => async (dispatch) => {
  try {
    dispatch({
      type: CLASS_INPUT_CHANGE,
      payload: {
        name: "classRelatedPastQuestionsLoading",
        value: true,
      },
    });
    document.body.classList.add("loading-indicator");
    const result = await API.getPastQuestionsInClass(classId);

    dispatch({
      type: GET_CLASS_PAST_QUESTIONS_SUCCESS,
      payload: {
        relatedPastQuestions: result.data.data.relatedPastQuestions,
      },
    });

    document.body.classList.remove("loading-indicator");
    dispatch({
      type: CLASS_INPUT_CHANGE,
      payload: {
        name: "classRelatedPastQuestionsLoading",
        value: false,
      },
    });
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "GET_CLASS_PAST_QUESTIONS_FAILURE"
      )
    );
    dispatch({
      type: GET_CLASS_PAST_QUESTIONS_FAILURE,
    });
    dispatch({
      type: CLASS_INPUT_CHANGE,
      payload: {
        name: "classRelatedPastQuestionsLoading",
        value: false,
      },
    });
  }
};

export const getClassAnnouncements = (classId) => async (dispatch) => {
  try {
    dispatch({
      type: CLASS_INPUT_CHANGE,
      payload: {
        name: "classAnnouncementsLoading",
        value: true,
      },
    });
    document.body.classList.add("loading-indicator");
    const result = await API.getAnnouncementsInClass(classId);

    dispatch({
      type: GET_CLASS_ANNOUNCEMENTS_SUCCESS,
      payload: {
        announcements: result.data.data.announcements,
      },
    });

    document.body.classList.remove("loading-indicator");
    dispatch({
      type: CLASS_INPUT_CHANGE,
      payload: {
        name: "classAnnouncementsLoading",
        value: false,
      },
    });
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "GET_CLASS_ANNOUNCEMENTS_FAILURE"
      )
    );
    dispatch({
      type: GET_CLASS_ANNOUNCEMENTS_FAILURE,
    });
    dispatch({
      type: CLASS_INPUT_CHANGE,
      payload: {
        name: "classAnnouncementsLoading",
        value: false,
      },
    });
  }
};

export const getClassAssignedContent = (classWorkId) => async (dispatch) => {
  try {
    dispatch({
      type: CLASS_INPUT_CHANGE,
      payload: {
        name: "teacherAssignedContentLoading",
        value: true,
      },
    });
    document.body.classList.add("loading-indicator");
    const result = await API.getAssignedContent(classWorkId);

    dispatch({
      type: GET_CLASS_ASSIGNED_CONTENT_SUCCESS,
      payload: {
        assignedContent: result.data.data.assignedContent,
      },
    });

    document.body.classList.remove("loading-indicator");
    dispatch({
      type: CLASS_INPUT_CHANGE,
      payload: {
        name: "teacherAssignedContentLoading",
        value: false,
      },
    });
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "GET_CLASS_ASSIGNED_CONTENT_FAILURE"
      )
    );
    dispatch({
      type: GET_CLASS_ASSIGNED_CONTENT_FAILURE,
    });
    dispatch({
      type: CLASS_INPUT_CHANGE,
      payload: {
        name: "teacherAssignedContentLoading",
        value: false,
      },
    });
  }
};
export const getClassAssignedContents = (classId) => async (dispatch) => {
  try {
    dispatch({
      type: CLASS_INPUT_CHANGE,
      payload: {
        name: "teacherAssignedContentsLoading",
        value: true,
      },
    });
    document.body.classList.add("loading-indicator");
    const result = await API.getAssignedContentsInClass(classId);

    dispatch({
      type: GET_CLASS_ASSIGNED_CONTENTS_SUCCESS,
      payload: {
        assignedContents: result.data.data.assignedContents,
      },
    });

    document.body.classList.remove("loading-indicator");
    dispatch({
      type: CLASS_INPUT_CHANGE,
      payload: {
        name: "teacherAssignedContentsLoading",
        value: false,
      },
    });
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "GET_CLASS_ASSIGNED_CONTENTS_FAILURE"
      )
    );
    dispatch({
      type: GET_CLASS_ASSIGNED_CONTENTS_FAILURE,
    });
    dispatch({
      type: CLASS_INPUT_CHANGE,
      payload: {
        name: "teacherAssignedContentsLoading",
        value: false,
      },
    });
  }
};
export const getClassAssignedContentsForStudent = (classId, userId) => async (
  dispatch
) => {
  try {
    dispatch({
      type: CLASS_INPUT_CHANGE,
      payload: {
        name: "teacherAssignedContentsLoading",
        value: true,
      },
    });
    document.body.classList.add("loading-indicator");
    const result = await API.getAssignedContentsInClassForStudent(
      classId,
      userId
    );

    dispatch({
      type: GET_CLASS_ASSIGNED_CONTENTS_SUCCESS,
      payload: {
        assignedContents: result.data.data.assignedContents,
      },
    });

    document.body.classList.remove("loading-indicator");
    dispatch({
      type: CLASS_INPUT_CHANGE,
      payload: {
        name: "teacherAssignedContentsLoading",
        value: false,
      },
    });
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "GET_CLASS_ASSIGNED_CONTENTS_FAILURE"
      )
    );
    dispatch({
      type: GET_CLASS_ASSIGNED_CONTENTS_FAILURE,
    });
    dispatch({
      type: CLASS_INPUT_CHANGE,
      payload: {
        name: "teacherAssignedContentsLoading",
        value: false,
      },
    });
  }
};

export const getMembersInClass = (classId, paymentClass = false) => async (
  dispatch
) => {
  try {
    dispatch({
      type: CLASS_INPUT_CHANGE,
      payload: {
        name: "classMembersLoading",
        value: true,
      },
    });
    dispatch({
      type: CLASS_INPUT_CHANGE,
      payload: {
        name: "adminsLoading",
        value: true,
      },
    });
    document.body.classList.add("loading-indicator");
    const result = await API.getStudentsInClass(classId);

    if (paymentClass) {
      dispatch({
        type: GET_PEOPLE_IN_PAYMENT_CLASS_SUCCESS,
        payload: result.data?.data,
      });
    } else {
      dispatch({
        type: GET_CLASS_MEMBERS_SUCCESS,
        payload: {
          admins: result.data.data.admins,
          classMembers: result.data.data.classMembers,
        },
      });
    }

    document.body.classList.remove("loading-indicator");
    dispatch({
      type: CLASS_INPUT_CHANGE,
      payload: {
        name: "classMembersLoading",
        value: false,
      },
    });
    dispatch({
      type: CLASS_INPUT_CHANGE,
      payload: {
        name: "adminsLoading",
        value: false,
      },
    });
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "GET_CLASS_MEMBERS_FAILURE"
      )
    );
    dispatch({
      type: GET_CLASS_MEMBERS_FAILURE,
    });
    dispatch({
      type: CLASS_INPUT_CHANGE,
      payload: {
        name: "classMembersLoading",
        value: false,
      },
    });
    dispatch({
      type: CLASS_INPUT_CHANGE,
      payload: {
        name: "adminsLoading",
        value: false,
      },
    });
  }
};

export const addClass = (courseId, name) => async (dispatch, getState) => {
  try {
    await API.addClass(courseId, name);
    dispatch({
      type: ADD_CLASS_SUCCESS,
    });
    dispatch(
      returnErrors("Class registered successfully.", "200", "ADD_CLASS_SUCCESS")
    );
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "ADD_CLASS_FAILURE"
      )
    );
    dispatch({
      type: ADD_CLASS_FAILURE,
    });
  }
};

export const createComment = (announcementId, text) => async (
  dispatch,
  getState
) => {
  try {
    const result = await API.addCommentToAnnouncement(announcementId, text);
    dispatch({
      type: CREATE_COMMENT_TO_ANNOUNCEMENT_SUCCESS,
      payload: result.data.data.comment,
    });
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "CREATE_COMMENT_TO_ANNOUNCEMENT_FAILURE"
      )
    );
    dispatch({
      type: CREATE_COMMENT_TO_ANNOUNCEMENT_FAILURE,
    });
  }
};

export const makeAnnouncement = (classId, text) => async (
  dispatch,
  getState
) => {
  try {
    const result = await API.makeAnnouncement(classId, text);
    console.log(result.data.data.announcement)
    dispatch({
      type: ADD_ANNOUNCEMENT_SUCCESS,
      payload: result.data.data.announcement,
    });
    dispatch(
      returnErrors(
        "Announcement sent to class",
        "200",
        "ADD_ANNOUNCEMENT_SUCCESS"
      )
    );
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "ADD_ANNOUNCEMENT_FAILURE"
      )
    );
    dispatch({
      type: ADD_ANNOUNCEMENT_FAILURE,
    });
  }
};

export const createCommentForContent = (
  assignedContentId,
  text,
  student
) => async (dispatch, getState) => {
  try {
    const result = await API.addCommentToAssignedContent(
      assignedContentId,
      text,
      student
    );
    dispatch({
      type: CREATE_COMMENT_TO_CONTENT_SUCCESS,
      payload: result.data.data.comment,
    });
  } catch (err) {
    console.log(err);
    dispatch(
      returnErrors(
        "Error creating comment",
        "500",
        "CREATE_COMMENT_TO_CONTENT_FAILURE"
      )
    );
    dispatch({
      type: CREATE_COMMENT_TO_CONTENT_FAILURE,
    });
  }
};

export const sendClassRequest = (classCode) => async (dispatch, getState) => {
  try {
    await API.sendClassRequest(classCode);
    dispatch({
      type: SEND_CLASS_REQUEST_SUCCESS,
    });
    dispatch(
      returnErrors(
        "Your request to join the class will be sent to the class teacher for approval",
        "200",
        "SEND_CLASS_REQUEST_SUCCESS"
      )
    );
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "SEND_CLASS_REQUEST_FAILURE"
      )
    );
    dispatch({
      type: SEND_CLASS_REQUEST_FAILURE,
    });
  }
};

export const assignContent = (data, classId) => async (dispatch, getState) => {
  try {
    await API.assignContentToStudent(data, classId);
    dispatch({
      type: ASSIGN_CONTENT_TO_STUDENT_SUCCESS,
    });
    dispatch(
      returnErrors(
        "Content has been assigned",
        "200",
        "ASSIGN_CONTENT_TO_STUDENT_SUCCESS"
      )
    );
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "ASSIGN_CONTENT_TO_STUDENT_FAILURE"
      )
    );
    dispatch({
      type: ASSIGN_CONTENT_TO_STUDENT_FAILURE,
    });
  }
};

export const deleteAssignedContent = (classWorkId) => async (
  dispatch,
  getState
) => {
  try {
    const result = await API.deleteAssignedContent(classWorkId);
    dispatch({
      type: DELETE_ASSIGNED_CONTENT_SUCCESS,
      payload: result.data.data.createdContent,
    });
    dispatch(
      returnErrors(
        "Content has been removed",
        "200",
        "DELETE_ASSIGNED_CONTENT_SUCCESS"
      )
    );
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "DELETE_ASSIGNED_CONTENT_FAILURE"
      )
    );
    dispatch({
      type: DELETE_ASSIGNED_CONTENT_FAILURE,
    });
  }
};

export const schoolDeleteStudent = (userId, schoolId) => async (
  dispatch,
  getState
) => {
  try {
    const result = await API.deleteStudentAccount({ userId, schoolId });
    dispatch({
      type: SCHOOL_DELETE_STUDENT_ACCOUNT_SUCCESS,
      payload: result.data.data.user,
    });
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "SCHOOL_DELETE_STUDENT_ACCOUNT_FAILURE"
      )
    );
    dispatch({
      type: SCHOOL_DELETE_STUDENT_ACCOUNT_FAILURE,
    });
  }
};
export const schoolUnlinkStudent = (userId, schoolId) => async (
  dispatch,
  getState
) => {
  try {
    const result = await API.unLinkStudentAccount({ userId, schoolId });
    dispatch({
      type: SCHOOL_UNLINK_STUDENT_ACCOUNT_SUCCESS,
      payload: result.data.data.user,
    });
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "SCHOOL_UNLINK_STUDENT_ACCOUNT_FAILURE"
      )
    );
    dispatch({
      type: SCHOOL_UNLINK_STUDENT_ACCOUNT_FAILURE,
    });
  }
};
export const schoolDeleteTeacher = (userId, schoolId) => async (
  dispatch,
  getState
) => {
  try {
    const result = await API.deleteTeacherAccount({ userId, schoolId });
    dispatch({
      type: SCHOOL_DELETE_TEACHER_ACCOUNT_SUCCESS,
      payload: result.data.data.user,
    });
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "SCHOOL_DELETE_TEACHER_ACCOUNT_FAILURE"
      )
    );
    dispatch({
      type: SCHOOL_DELETE_TEACHER_ACCOUNT_FAILURE,
    });
  }
};
export const schoolUnlinkteacher = (userId, schoolId) => async (
  dispatch,
  getState
) => {
  try {
    const result = await API.unLinkTeacherAccount({ userId, schoolId });
    dispatch({
      type: SCHOOL_UNLINK_TEACHER_ACCOUNT_SUCCESS,
      payload: result.data.data.user,
    });
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "SCHOOL_UNLINK_TEACHER_ACCOUNT_FAILURE"
      )
    );
    dispatch({
      type: SCHOOL_UNLINK_TEACHER_ACCOUNT_FAILURE,
    });
  }
};
