import {
  GET_SUBJECT_AND_RELATED_LESSONS_SUCCESS,
  ADD_SUBJECT_PROGRESS_SUCCESS,
  ADD_RECENT_ACTIVITIES_SUCCESS,
  GET_SINGLE_LESSON_SUCCESS,
  ADD_LIKED_VIDEO_SUCCESS,
  REMOVE_LIKED_VIDEO_SUCCESS
} from "../actions/types";

const initialState = {
  subject: {},
  lessonSubjectName: "",
  lessonSubjectId: "",
  lessonCourseId: "",
  totalNumberOfLessons: 0,
  subjectProgresses: [],
  numOfUsers: 0,
  lesson: {},
  relatedLessons:[]  
};

const subjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUBJECT_AND_RELATED_LESSONS_SUCCESS:
      return {
        ...state,
        subject: action.payload.subject,
        relatedLessons: action.payload.subject.relatedLessons,
          lessonSubjectName: action.payload.subject.mainSubjectId.name,
          lessonSubjectId: action.payload.subject._id,
          lessonCourseId: action.payload.subject.courseId.id,
          numOfUsers: action.payload.numOfUsers
      };

    case ADD_SUBJECT_PROGRESS_SUCCESS:
      return {
        ...state,
      };

    case ADD_LIKED_VIDEO_SUCCESS:
      let relatedLessons = state.relatedLessons;
      relatedLessons[action.payload.currentLessonIndex] = action.payload.data
      state.relatedLessons = [...relatedLessons]

      return {
        ...state,
      };

    case REMOVE_LIKED_VIDEO_SUCCESS:
      let myRelatedLessons = state.relatedLessons;
      let targetLesson = myRelatedLessons[action.payload.currentLessonIndex];
      let targetLessonLikes = targetLesson.likes;
      targetLessonLikes = targetLessonLikes.filter(item => item !== action.payload.userId)
      targetLesson.likes = [...targetLessonLikes]
      myRelatedLessons[action.payload.currentLessonIndex] = targetLesson
      state.relatedLessons = [...myRelatedLessons]

      return {
        ...state,
      };
      
    case ADD_RECENT_ACTIVITIES_SUCCESS:
      return {
        ...state,
      };

    case GET_SINGLE_LESSON_SUCCESS:
      return {
        ...state,
        lesson: action.payload.lesson
      };


    default:
      return state;
  }
};
export default subjectReducer;