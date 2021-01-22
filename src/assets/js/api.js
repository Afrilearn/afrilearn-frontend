import axios from "axios";
const URL =
  "http://afrilearnbackend-env.eba-7ppeuqks.us-east-1.elasticbeanstalk.com/api/v1/";
const PastQuestionURL = "https://api.exambly.com/adminpanel/v2/";

export default {
  url: URL,
  url2: PastQuestionURL,
  headers(fileupload = false) {
    const token = localStorage.getItem("token");

    let header = {};
    if (fileupload) {
      header["Content-type"] = "multipart/form-data";
    } else {
      header["Content-type"] = "application/json";
      header["Accept"] = "*/*";
      header["Access-Control-Allow-Origin"] = "*";
    }
    if (token && token !== undefined) {
      header["token"] = token;
    }
    return header;
  },

  checkUserExistJoinClass(email, classId) {
    return axios({
      method: "post",
      url: `${this.url}auth/check-join-class`,
      data: { email, classId },
    });
  },
  getRoles() {
    return axios({
      method: "get",
      url: `${this.url}auth/roles`,
      headers: this.headers(),
    });
  },

  joinApproved(classId, email, fullName, password) {
    return axios({
      method: "post",
      url: `${this.url}/classes/${classId}/join-class`,
      data: { email, fullName, password },
    });
  },

  registerUser(data) {
    return axios({
      method: "post",
      url: `${this.url}/auth/signup`,
      headers: this.headers(),
      data,
    });
  },

  login(data) {
    return axios({
      method: "post",
      url: `${this.url}/auth/login`,
      headers: this.headers(),
      data,
    });
  },

  resetPassword(data) {
    return axios({
      method: "get",
      url: `${this.url}/auth/${data}/reset_password`,
      headers: this.headers(),
    });
  },

  changePassword(data) {
    return axios({
      method: "post",
      url: `${this.url}/auth/change_password`,
      headers: this.headers(),
      data,
    });
  },

  socialLoginGoogle(data) {
    return axios({
      method: "post",
      url: `${this.url}auth/social_login/google`,
      headers: this.headers(),
      data,
    });
  },

  socialLoginFacebook(data) {
    return axios({
      method: "post",
      url: `${this.url}auth/social_login/facebook`,
      headers: this.headers(),
      data,
    });
  },

  socialLoginUpdate(data) {
    return axios({
      method: "patch",
      url: `${this.url}auth/profile-update`,
      headers: this.headers(),
      data,
    });
  },

  courseEnrolment(data) {
    return axios({
      method: "post",
      url: `${this.url}courses/enroll`,
      headers: this.headers(),
      data,
    });
  },

  getSearchResults(searchQuery) {
    return axios({
      method: "get",
      url: `${this.url}lessons?searchQuery=${searchQuery}`,
    });
  },

  getCourses() {
    return axios({
      method: "get",
      url: `${this.url}courses`,
      headers: this.headers(),
    });
  },

  getCourse(data) {
    return axios({
      method: "get",
      url: `${this.url}courses/${data}`,
      headers: this.headers(),
    });
  },

  getClasses() {
    return axios({
      method: "get",
      url: `${this.url}classes`,
    });
  },

  getClass(classId) {
    return axios({
      method: "get",
      url: `${this.url}classes/${classId}`,
    });
  },

  loadUser() {
    return axios({
      method: "get",
      url: `${this.url}/auth/load-user`,
      headers: this.headers(),
    });
  },

  getPaymentPlans() {
    return axios({
      method: "get",
      url: `${this.url}/payments/plans`,
      headers: this.headers(),
    });
  },

  createPaymentTransaction(data) {
    return axios({
      method: "post",
      url: `${this.url}/payments/add-transaction`,
      headers: this.headers(),
      data,
    });
  },

  addCommentToAnnouncement(announcementId, text) {
    return axios({
      method: "post",
      url: `${this.url}/classes/${announcementId}/comment`,
      headers: this.headers(),
      data: { text },
    });
  },

  addCommentToAssignedContent(assignedContentId, text, student) {
    return axios({
      method: "post",
      url: `${this.url}/classes/${assignedContentId}/comment-on-content`,
      headers: this.headers(),
      data: { text, student },
    });
  },

  sendClassRequest(classCode) {
    return axios({
      method: "post",
      url: `${this.url}/classes/send-class-request`,
      headers: this.headers(),
      data: { classCode },
    });
  },

  assignContentToStudent(description, lessonId, classId, dueDate, userId) {
    return axios({
      method: "post",
      url: `${this.url}/classes/${classId}/assign-content`,
      headers: this.headers(),
      data: { description, lessonId, classId, dueDate, userId },
    });
  },

  populateDashboard(data) {
    return axios({
      method: "post",
      url: `${this.url}/dashboard`,
      headers: this.headers(),
      data,
    });
  },

  getSubjectAndRelatedLessons(courseId, subjectId) {
    return axios({
      method: "post",
      url: `${this.url}lessons/${courseId}/${subjectId}/subject-lessons`,
    });
  },

  loadSubjects(examId) {
    return axios({
      method: "get",
      url: `${this.url2}getMySubjects/${examId}`,
      headers: this.headers2(),
    });
  },

  loadSchools() {
    return axios({
      method: "get",
      url: `${this.url2}getMySchools`,
      headers: this.headers2(),
    });
  },

  loadQuestions(id) {
    return axios({
      method: "get",
      url: `${this.url2}getQuestions/${id}`,
      headers: this.headers2(),
    });
  },

  flagQuestion(data) {
    return axios({
      method: "post",
      url: `${this.url2}reportQuestion`,
      headers: this.headers2(),
      data,
    });
  },

  submitPastQuestionResult(data) {
    return axios({
      method: "post",
      url: `${this.url}past-questions/save-past-question-result`,
      headers: this.headers(),
      data,
    });
  },

  submitPastQuestionProgress(data) {
    return axios({
      method: "post",
      url: `${this.url}past-questions/add-progress`,
      headers: this.headers(),
      data,
    });
  },

  submitLessonQuizResult(lessonId, data) {
    return axios({
      method: "post",
      url: `${this.url}/lessons/${lessonId}/save-test-results`,
      headers: this.headers(),
      data,
    });
  },

  getPerformance(courseId) {
    return axios({
      method: "get",
      url: `${this.url}/courses/${courseId}/progress-and-performance`,
      headers: this.headers()     
    });
  },
};
