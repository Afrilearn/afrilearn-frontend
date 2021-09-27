import {
  COURSE_INPUT_CHANGE,
  GET_ALL_COURSES_SUCCESS,
  GET_SINGLE_COURSE_SUCCESS,
  GET_PERFORMANCE_SUCCESS,
  GET_PERFORMANCE_IN_CLASS_SUCCESS,
  GET_USER_DASHBOARD_ENROLLED_COURSE_SUCCESS,
  GET_USER_DASHBOARD_CLASS_MEMBERSHIP_SUCCESS,
  GET_USER_DASHBOARD_RECOMMENDATIONS_SUCCESS,
  GET_USER_DASHBOARD_RECENT_ACTIVITIES_SUCCESS,
  GET_USER_DASHBOARD_PERFORMANCE_SUMMARY_SUCCESS,
  GET_SUBJECT_PROGRESS_PERFORMANCE_SUCCESS,
  GET_SUBJECT_QUIZ_PERFORMANCE_SUCCESS,
  GET_SUBJECT_PAST_QUESTIONS_PERFORMANCE_SUCCESS,
  GET_USER_DASHBOARD_UNFINISHED_VIDEOS_SUCCESS,
  GET_USER_DASHBOARD_TOPTEN_VIDEOS_SUCCESS,
  GET_USER_DASHBOARD_FAVOURITE_VIDEOS_SUCCESS,
  STORE_FAVOURITE_VIDEO_SUCCESS,
  REMOVE_FAVOURITE_VIDEO_SUCCESS,
  GET_AFRILEARN_TOPTEN_VIDEOS_SUCCESS,
  GET_COURSE_SUBJECTS_SUCCESS,
} from "../actions/types";

const initialState = {
  courses: [],
  course: {},
  classNoteCount: 0,
  videoLessonCount: 0,
  quizQuestionsCount: 0,
  subjectCount: 0,
  dashboardData: [],
  excelling: 0,
  average: 0,
  belowAverage: 0,
  noRating: 0,
  excellingText: "",
  averageText: "",
  belowAverageText: "",
  noRatingText: "",
  selectedCategory: "Unknown Category",
  performance: [],
  barChart: [],
  barChartTitles: [],
  overallPerformance: 0,
  overallProgress: 0,
  dashboardRoute: false,
  numOfUsers: 0,
  isLoading: false,
  enrolledCourseLoader: false,
  dashboardEnrolledCourse: [],
  dashboardClassMembership: [],
  classMembershipLoader: false,
  dashboardRecommendations: [],
  recommendationLoader: false,
  dashboardRecentActivites: [],
  recentActivitiesLoader: false,
  performanceSummaryLoader: false,
  populateSubjectProgressPerformanceLoader: false,
  populateSubjectQuizPerformanceLoader: false,
  quizPerformance: [],
  populateSubjectPastQuestionPerformanceLoader: false,
  pastQuestionPeformance: [],
  unFinishedVideoLoader: false,
  dashboardUnFinishedVideos: [],
  topTenVideoLoader: false,
  dashboardTopTenVideos: [],
  favouriteVideoLoader: false,
  dashboardFavouriteVideos: [],
  newlyAddedDashbaordFavouriteVideos: [],
  likedVideoLoader: false,
  favouriteVideoLoader: false,
  subjectAndRelatedLessonsLoader: false,
  afrilearnTopTenVideoLoader: false,
  afrilearnTopTenVideos: [],
  subjectsForSignUp: [],
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case COURSE_INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case GET_COURSE_SUBJECTS_SUCCESS:
      return {
        ...state,
        subjectsForSignUp: action.payload.subjects,
      };
    case GET_ALL_COURSES_SUCCESS:
      return {
        ...state,
        courses: action.payload.courses,
      };
    case GET_SINGLE_COURSE_SUCCESS:
      return {
        ...state,
        course: action.payload.course,
        classNoteCount: action.payload.classNoteCount,
        videoLessonCount: action.payload.videoLessonCount,
        quizQuestionsCount: action.payload.quizQuestionsCount,
        subjectCount: action.payload.subjectCount,
        numOfUsers: action.payload.numOfUsers,
      };
    case GET_USER_DASHBOARD_RECENT_ACTIVITIES_SUCCESS:
      return {
        ...state,
        dashboardRecentActivites: action.payload,
      };
    case GET_USER_DASHBOARD_ENROLLED_COURSE_SUCCESS:
      return {
        ...state,
        dashboardEnrolledCourse: action.payload,
      };
    case GET_USER_DASHBOARD_CLASS_MEMBERSHIP_SUCCESS:
      return {
        ...state,
        dashboardClassMembership: action.payload,
      };
    case GET_USER_DASHBOARD_RECOMMENDATIONS_SUCCESS:
      return {
        ...state,
        dashboardRecommendations: action.payload,
      };
    case GET_USER_DASHBOARD_PERFORMANCE_SUMMARY_SUCCESS:
      return {
        ...state,
        excelling: action.payload.excelling,
        average: action.payload.average,
        belowAverage: action.payload.belowAverage,
        noRating: action.payload.noRating,
        excellingText: action.payload.excellingText,
        averageText: action.payload.averageText,
        belowAverageText: action.payload.belowAverageText,
        noRatingText: action.payload.noRatingText,
      };
    case GET_SUBJECT_PROGRESS_PERFORMANCE_SUCCESS:
      return {
        ...state,
        performance: action.payload.data,
        barChart: action.payload.barChart,
        barChartTitles: action.payload.barChartTitles,
        overallPerformance: action.payload.overallPerformance,
        overallProgress: action.payload.overallProgress,
      };
    case GET_SUBJECT_QUIZ_PERFORMANCE_SUCCESS:
      return {
        ...state,
        quizPerformance: action.payload.data,
      };
    case GET_SUBJECT_PAST_QUESTIONS_PERFORMANCE_SUCCESS:
      return {
        ...state,
        pastQuestionPeformance: action.payload.data,
      };
    case GET_USER_DASHBOARD_FAVOURITE_VIDEOS_SUCCESS:
      return {
        ...state,
        dashboardFavouriteVideos: action.payload.data.favouriteVideos,
      };
    case STORE_FAVOURITE_VIDEO_SUCCESS:
      let newItem = state.newlyAddedDashbaordFavouriteVideos;
      newItem.push(action.payload);
      state.newlyAddedDashbaordFavouriteVideos = [...newItem];
      return {
        ...state,
      };

    case REMOVE_FAVOURITE_VIDEO_SUCCESS:
      let newlyAddedItems = state.newlyAddedDashbaordFavouriteVideos;
      newlyAddedItems = newlyAddedItems.filter(
        (item) => item.lessonId !== action.payload
      );
      state.newlyAddedDashbaordFavouriteVideos = [...newlyAddedItems];

      let favouriteItems = state.dashboardFavouriteVideos;
      favouriteItems = favouriteItems.filter(
        (item) => item.lessonId.id !== action.payload
      );
      state.dashboardFavouriteVideos = [...favouriteItems];

      return {
        ...state,
      };

    case GET_USER_DASHBOARD_UNFINISHED_VIDEOS_SUCCESS:
      return {
        ...state,
        dashboardUnFinishedVideos: action.payload,
      };
    case GET_USER_DASHBOARD_TOPTEN_VIDEOS_SUCCESS:
      return {
        ...state,
        dashboardTopTenVideos: action.payload,
      };
    case GET_AFRILEARN_TOPTEN_VIDEOS_SUCCESS:
      return {
        ...state,
        afrilearnTopTenVideos: action.payload,
      };
    case GET_PERFORMANCE_SUCCESS:
      return {
        ...state,
        performance: action.payload.data,
        barChart: action.payload.barChart,
        barChartTitles: action.payload.barChartTitles,
        overallPerformance: action.payload.overallPerformance,
        overallProgress: action.payload.overallProgress,
      };

    case GET_PERFORMANCE_IN_CLASS_SUCCESS:
      return {
        ...state,
        performance: action.payload.data,
        barChart: action.payload.barChart,
        barChartTitles: action.payload.barChartTitles,
        overallPerformance: action.payload.overallPerformance,
        overallProgress: action.payload.overallProgress,
      };
    default:
      return state;
  }
};
export default courseReducer;
