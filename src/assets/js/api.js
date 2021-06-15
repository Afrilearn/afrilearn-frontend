import axios from "axios";
const URL =
  "http://afrilearnbackend-env.eba-kmm3jyax.eu-west-3.elasticbeanstalk.com/api/v1/";
const HerokuURL = "https://afrilearn-backend-01.herokuapp.com/api/v1/";
const LocalURL = "http://localhost:5000/api/v1/";
const PastQuestionURL = "https://api.exambly.com/adminpanel/v2/";

export default {
  url: LocalURL,
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

  headers2() {
    let header = {};
    header["Content-type"] = "application/json";
    header["authorization"] =
      "F0c7ljTmi25e7LMIF0Wz01lZlkHX9b57DFTqUHFyWeVOlKAsKR0E5JdBOvdunpqv";
    return header;
  },

  updateProfilePic(profilePhotoUrl) {
    return axios({
      method: "patch",
      url: `${this.url}auth/update-profile-pic`,
      headers: this.headers(),
      data: profilePhotoUrl,
    });
  },
  acceptRejectClassmember(classId, userId, status) {
    return axios({
      method: "patch",
      url: `${this.url}classes/accept-reject-class-request`,
      headers: this.headers(),
      data: { classId, userId, status },
    });
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

  sendClassInvite(email, link) {
    return axios({
      method: "post",
      url: `${this.url}classes/send-class-invite`,
      headers: this.headers(),
      data: { email, link },
    });
  },

  joinApproved(classId, email, fullName, password) {
    return axios({
      method: "post",
      url: `${this.url}classes/${classId}/join-class`,
      data: { email, fullName, password },
    });
  },

  registerUser(data) {
    return axios({
      method: "post",
      url: `${this.url}auth/signup`,
      headers: this.headers(),
      data,
    });
  },

  login(data) {
    return axios({
      method: "post",
      url: `${this.url}auth/login`,
      headers: this.headers(),
      data,
    });
  },

  resetPassword(data) {
    return axios({
      method: "get",
      url: `${this.url}auth/${data}/reset_password`,
      headers: this.headers(),
    });
  },

  updateProfile(data) {
    return axios({
      method: "patch",
      url: `${this.url}auth/profile-update`,
      headers: this.headers(),
      data,
    });
  },

  addRecentActivity(lessonId, type) {
    return axios({
      method: "post",
      url: `${this.url}recents/add-recent-activity`,
      headers: this.headers(),
      data: {
        lessonId,
        type,
      },
    });
  },

  addClass(courseId, name) {
    return axios({
      method: "post",
      url: `${this.url}classes/add-class`,
      headers: this.headers(),
      data: {
        courseId,
        name,
      },
    });
  },

  addSubjectProgress(classId, lessonId, subjectId, courseId, reason, type) {
    return axios({
      method: "post",
      url: `${this.url}courses/subject-progress`,
      headers: this.headers(),
      data: {
        classId,
        lessonId,
        subjectId,
        courseId,
        reason,
        type,
      },
    });
  },

  changePassword(data) {
    return axios({
      method: "post",
      url: `${this.url}auth/change_password`,
      headers: this.headers(),
      data,
    });
  },

  changePasswordDirectly(data) {
    return axios({
      method: "post",
      url: `${this.url}auth/change-password`,
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

  getSearchResults(searchQuery, data = null) {
    return axios({
      method: "post",
      url: `${this.url}lessons/search/${searchQuery}`,
      data,
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
  getClassBasicDetails(classId) {
    return axios({
      method: "get",
      url: `${this.url}classes/${classId}/basic-details`,
    });
  },
  getStudentsInClass(classId) {
    return axios({
      method: "get",
      url: `${this.url}classes/${classId}/students`,
    });
  },
  getSubjectsInClass(classId) {
    return axios({
      method: "get",
      url: `${this.url}classes/${classId}/subjects`,
    });
  },
  getPastQuestionsInClass(classId) {
    return axios({
      method: "get",
      url: `${this.url}classes/${classId}/past-questions`,
    });
  },
  getAnnouncementsInClass(classId) {
    return axios({
      method: "get",
      url: `${this.url}classes/${classId}/announcements`,
    });
  },
  getAssignedContentsInClass(classId) {
    return axios({
      method: "get",
      url: `${this.url}classes/${classId}/assigned-contents`,
    });
  },
  getAssignedContentsInClassForStudent(classId, userId) {
    return axios({
      method: "get",
      url: `${this.url}classes/${classId}/assigned-contents`,
      data: { userId },
    });
  },

  loadUser() {
    return axios({
      method: "get",
      url: `${this.url}auth/load-user`,
      headers: this.headers(),
    });
  },

  getPaymentPlans() {
    return axios({
      method: "get",
      url: `${this.url}payments/plans`,
      headers: this.headers(),
    });
  },

  verifyPayStackPayment(data) {
    return axios({
      method: "post",
      url: `${this.url}payments/verify-paystack-payment`,
      headers: this.headers(),
      data,
    });
  },

  makeAnnouncement(classId, text) {
    return axios({
      method: "post",
      url: `${this.url}classes/${classId}/announce`,
      headers: this.headers(),
      data: { text },
    });
  },

  addCommentToAnnouncement(announcementId, text) {
    return axios({
      method: "post",
      url: `${this.url}classes/${announcementId}/comment`,
      headers: this.headers(),
      data: { text },
    });
  },

  addCommentToAssignedContent(assignedContentId, text, student) {
    return axios({
      method: "post",
      url: `${this.url}classes/${assignedContentId}/comment-on-content`,
      headers: this.headers(),
      data: { text, student },
    });
  },

  sendClassRequest(classCode) {
    return axios({
      method: "post",
      url: `${this.url}classes/send-class-request`,
      headers: this.headers(),
      data: { classCode },
    });
  },

  assignContentToStudent(data, classId) {
    return axios({
      method: "post",
      url: `${this.url}classes/${classId}/assign-content`,
      headers: this.headers(),
      data,
    });
  },

  getAssignedContent(classworkId) {
    return axios({
      method: "get",
      url: `${this.url}classes/assigned-content/${classworkId}/`,
    });
  },

  deleteAssignedContent(classworkId) {
    return axios({
      method: "delete",
      url: `${this.url}classes/assigned-content/${classworkId}/`,
    });
  },

  populateDashboard(data) {
    return axios({
      method: "post",
      url: `${this.url}dashboard`,
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
      url: `${this.url}lessons/${lessonId}/save-test-results`,
      headers: this.headers(),
      data,
    });
  },

  getPerformance(courseId) {
    return axios({
      method: "post",
      url: `${this.url}courses/${courseId}/progress-and-performance`,
      headers: this.headers(),
    });
  },

  getPerformanceInClass(courseId, data) {
    return axios({
      method: "post",
      url: `${this.url}courses/${courseId}/progress-and-performance`,
      headers: this.headers(),
      data,
    });
  },
  async getSingleLesson(lessonId) {
    return axios({
      method: "get",
      url: `${this.url}lessons/${lessonId}`,
    });
  },

  async getCourseSubjects(courseId) {
    return axios({
      method: "get",
      url: `${this.url}courses/${courseId}/subjects`,
    });
  },

  async registerNewChild(data) {
    return axios({
      method: "post",
      url: `${this.url}parents/sign-up-for-a-child`,
      headers: this.headers(),
      data,
    });
  },

  getChildren() {
    return axios({
      method: "get",
      url: `${this.url}parents/children`,
      headers: this.headers(),
    });
  },
  linkChildAccount(data) {
    return axios({
      method: "post",
      url: `${this.url}/parents/add-user-as-child`,
      headers: this.headers(),
      data,
    });
  },
  unlinkChildAccount(data) {
    return axios({
      method: "patch",
      url: `${this.url}parents/unlink-child-account`,
      headers: this.headers(),
      data,
    });
  },
  unlinkChildrenAccounts(data) {
    return axios({
      method: "patch",
      url: `${this.url}parents/unlink-children-accounts`,
      headers: this.headers(),
      data,
    });
  },
  deleteChildAccount(data) {
    return axios({
      method: "delete",
      url: `${this.url}parents/delete-child-account`,
      headers: this.headers(),
      data,
    });
  },
  deleteChildrenAccounts(data) {
    return axios({
      method: "delete",
      url: `${this.url}parents/delete-children-accounts`,
      headers: this.headers(),
      data,
    });
  },
  uploadSchoolCoverPhoto(schoolId, data) {
    return axios({
      method: "patch",
      url: `${this.url}schools/update-cover-photo/${schoolId}`,
      headers: this.headers(),
      data,
    });
  },
  updateSchoolProfile(schoolId, data) {
    return axios({
      method: "patch",
      url: `${this.url}schools/update-profile/${schoolId}`,
      headers: this.headers(),
      data,
    });
  },
  uploadSchoollogo(schoolId, data) {
    return axios({
      method: "patch",
      url: `${this.url}schools/update-logo/${schoolId}`,
      headers: this.headers(),
      data,
    });
  },
  updateClassName(classId, name) {
    return axios({
      method: "patch",
      url: `${this.url}classes/${classId}/rename`,
      data: { name },
    });
  },
  getChildActivities(data) {
    return axios({
      method: "post",
      url: `${this.url}dashboard/recentActivities-by-time`,
      headers: this.headers(),
      data,
    });
  },
  acceptChildRequest(email, parentId) {
    return axios({
      method: "post",
      url: `${this.url}parents/accept-parent-request`,
      data: { email, parentId },
    });
  },
  acceptAdminRequest(email, schoolId, classId) {
    return axios({
      method: "post",
      url: `${this.url}schools/accept-admin-request`,
      data: { email, schoolId, classId },
    });
  },
  getSchoolCourses(schoolId) {
    return axios({
      method: "get",
      url: `${this.url}schools/${schoolId}/courses`,
    });
  },
  getSchoolProfile(schoolId) {
    return axios({
      method: "get",
      url: `${this.url}schools/${schoolId}`,
    });
  },
  acceptTeacherRequest(email, schoolId, classId) {
    return axios({
      method: "post",
      url: `${this.url}schools/accept-teacher-request`,
      data: { email, schoolId, classId },
    });
  },

  unLinkTeacherAccount(data) {
    return axios({
      method: "patch",
      url: `${this.url}schools/unlink-teacher-account`,
      headers: this.headers(),
      data,
    });
  },
  deleteTeacherAccount(data) {
    return axios({
      method: "delete",
      url: `${this.url}schools/delete-teacher-account`,
      headers: this.headers(),
      data,
    });
  },

  unLinkStudentAccount(data) {
    return axios({
      method: "patch",
      url: `${this.url}schools/unlink-student-account`,
      headers: this.headers(),
      data,
    });
  },
  deleteStudentAccount(data) {
    return axios({
      method: "delete",
      url: `${this.url}schools/delete-student-account`,
      headers: this.headers(),
      data,
    });
  },

  schoolAddExistingTeacher(email, schoolId, classId) {
    return axios({
      method: "post",
      url: `${this.url}schools/add-user-as-teacher`,
      data: { email, schoolId, classId },
    });
  },
  schoolSignUpForStudent(
    fullName,
    password,
    email,
    classId,
    schoolId,
    courseId
  ) {
    return axios({
      method: "post",
      url: `${this.url}schools/sign-up-for-student`,
      data: { fullName, password, email, classId, schoolId, courseId },
    });
  },
  getDashboardEnrolledCourse(data) {
    return axios({
      method: "post",
      url: `${this.url}/dashboard/web`,
      headers: this.headers(),
      data,
    });
  },
  getDashboardClassMembership(data) {
    return axios({
      method: "post",
      url: `${this.url}/dashboard/class-membership`,
      headers: this.headers(),
      data,
    });
  },
  getDashboardRecommendations(data) {
    return axios({
      method: "post",
      url: `${this.url}/dashboard/recommendations`,
      headers: this.headers(),
      data,
    });
  },
  getDashboardRecentActivites(data) {
    return axios({
      method: "post",
      url: `${this.url}/dashboard/recentActivities`,
      headers: this.headers(),
      data,
    });
  },
  getDashboardPerformanceSummary(data) {
    return axios({
      method: "post",
      url: `${this.url}/dashboard/student-performance-summary`,
      headers: this.headers(),
      data,
    });
  },
  getSubjectProgressPerformance(courseId, data) {
    return axios({
      method: "post",
      url: `${this.url}courses/${courseId}/progress`,
      headers: this.headers(),
      data,
    });
  },
  getSubjectQuizPerformance(courseId, data) {
    return axios({
      method: "post",
      url: `${this.url}courses/${courseId}/subject-performance`,
      headers: this.headers(),
      data,
    });
  },
  getSubjectPastQuestionsPerformance(courseId, data) {
    return axios({
      method: "post",
      url: `${this.url}courses/${courseId}/past-question-performance`,
      headers: this.headers(),
      data,
    });
  },
  storeUnFinishedVideos(data) {
    return axios({
      method: "post",
      url: `${this.url}lessons/storeUnFinishedVideos`,
      headers: this.headers(),
      data,
    });
  },
  clearUnFinishedVideos(data) {
    return axios({
      method: "delete",
      url: `${this.url}lessons/clearUnFinishedVideos`,
      headers: this.headers(),
      data,
    });
  },
  getDashboardUnFinishedVideos() {
    return axios({
      method: "get",
      url: `${this.url}dashboard/unfinishedVideos`,
      headers: this.headers(),
    });
  },
  getDashboardTopTen(data) {
    return axios({
      method: "post",
      url: `${this.url}dashboard/topTen`,
      headers: this.headers(),
      data,
    });
  },
  saveFavouriteVideo(data) {
    return axios({
      method: "post",
      url: `${this.url}lessons/saveFavouriteVideos`,
      headers: this.headers(),
      data,
    });
  },
  removeFavouriteVideo(data) {
    return axios({
      method: "delete",
      url: `${this.url}lessons/removeFavouriteVideos`,
      headers: this.headers(),
      data,
    });
  },
  getDashboardFavouriteVideo(data) {
    return axios({
      method: "post",
      url: `${this.url}dashboard/favourite`,
      headers: this.headers(),
      data,
    });
  },
  saveLikedVideo(data) {
    return axios({
      method: "post",
      url: `${this.url}lessons/saveLikedVideo`,
      headers: this.headers(),
      data,
    });
  },
  removeLikedVideo(data) {
    return axios({
      method: "delete",
      url: `${this.url}lessons/removeLikedVideo`,
      headers: this.headers(),
      data,
    });
  },
  getAfrilearnTopTen(data) {
    return axios({
      method: "get",
      url: `${this.url}dashboard/topTen`,
      headers: this.headers(),
    });
  },
  getLessonComments(lessonId, data) {
    return axios({
      method: "post",
      url: `${this.url}comments/${lessonId}`,
      headers: this.headers(),
      data,
    });
  },
  postLessonComment(data) {
    return axios({
      method: "post",
      url: `${this.url}comments/`,
      headers: this.headers(),
      data,
    });
  },
  likeLessonComment(data) {
    return axios({
      method: "post",
      url: `${this.url}comments/like-comment`,
      headers: this.headers(),
      data,
    });
  },
  unlikeLessonComment(data) {
    return axios({
      method: "delete",
      url: `${this.url}comments/unlike-comment`,
      headers: this.headers(),
      data,
    });
  },
  addLessonCommentReply(data) {
    return axios({
      method: "post",
      url: `${this.url}comments/reply/add`,
      headers: this.headers(),
      data,
    });
  },  
  deleteLessonComment(commentId) {
    return axios({
      method: "delete",
      url: `${this.url}comments/${commentId}`,
      headers: this.headers()       
    });
  },
  updateLessonComment(data, commentId) {
    return axios({
      method: "patch",
      url: `${this.url}comments/${commentId}`,
      headers: this.headers(),
      data       
    });
  },
};
