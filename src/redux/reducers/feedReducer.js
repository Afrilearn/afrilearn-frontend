import { post } from "jquery";
import {
  ADD_POST_TO_FEED_SUCCESS,
  COMMENT_TO_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  FEED_INPUT_CHANGE,
  FOLLOW_A_USER_IN_FEED_SUCCESS,
  GET_A_USER_PROFILE_IN_FEED_SUCCESS,
  GET_COURSES_AND_SUBJECTS_IN_FEED_SUCCESS,
  GET_MY_FOLLOWERS_IN_FEED_SUCCESS,
  GET_MY_FOLLOWINGS_IN_FEED_SUCCESS,
  GET_MY_POSTS_IN_FEED_SUCCESS,
  GET_USERS_IN_MY_FEED_SUCCESS,
  LIKE_A_POST_COMMENT_SUCCESS,
  LIKE_A_POST_SUCCESS,
  SEARCH_FOR_POSTS_IN_FEED_SUCCESS,
  SEARCH_FOR_USERS_IN_FEED_SUCCESS,
  UNLIKE_A_POST_COMMENT_SUCCESS,
  UNLIKE_A_POST_SUCCESS,
  UPDATE_POST_SUCCESS,
} from "../actions/types";

const initialState = {
  lessons: [],
  subjects: [],
  courses: [],
  posts: [],
  followUnfollowLoading: false,
  coursesLoading: false,
  postLoading: false,
  postsLoading: false,
  followings: [],
  followingsLoading: false,
  followers: [],
  followersLoading: false,
  connections: [],
  connectionsLoading: false,
  usersInFeed: [],
  usersInFeedLoading: false,
  profile: {},
  profileLoading: false,
  text: "",
  image: null,
  commentText: "",
  commentImage: null,
  subjectId: "",
  courseId: "",
  lessonId: "",
  visibility: "public",
  sendingPost: false,
  sortBy: "",
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FEED_INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case ADD_POST_TO_FEED_SUCCESS:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case UPDATE_POST_SUCCESS:
      const updatedPost = state.posts.findIndex(
        (item) => item._id === action.payload._id
      );
      updatedPost = action.payload;
      return {
        ...state,
        posts: [...state.posts],
      };

    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload._id),
      };

    case COMMENT_TO_POST_SUCCESS:
      const commentedPost = state.posts.find(
        (item) => item._id === action.payload.postId
      );
      commentedPost.comments.push(action.payload);
      return {
        ...state,
        posts: [...state.posts, commentedPost],
      };

    case UPDATE_POST_SUCCESS:
      let targetPost = state.posts.findIndex(
        (item) => item._id === action.payload._id
      );
      targetPost = action.payload;
      return {
        ...state,
        posts: [...state.posts],
      };

    case SEARCH_FOR_USERS_IN_FEED_SUCCESS:
      return {
        ...state,
        usersInFeed: action.payload,
      };
    case GET_USERS_IN_MY_FEED_SUCCESS:
      return {
        ...state,
        connections: action.payload,
      };

    case SEARCH_FOR_POSTS_IN_FEED_SUCCESS:
      return {
        ...state,
        posts: action.payload,
      };
    case GET_MY_POSTS_IN_FEED_SUCCESS:
      return {
        ...state,
        posts: action.payload,
      };
    case FOLLOW_A_USER_IN_FEED_SUCCESS:
      const inFollowing = state.followings.findIndex(
        (following) => following._id === action.payload.followed._id
      );
      let currentFollowings = state.followings;
      if (inFollowing !== -1) {
        currentFollowings = state.followings.filter(
          (following) => following._id !== action.payload.followed._id
        );
      } else {
        state.followings.push(action.payload.followed);
      }
      return {
        ...state,
        followings: [...currentFollowings],
      };
    case GET_MY_FOLLOWINGS_IN_FEED_SUCCESS:
      return {
        ...state,
        followings: action.payload,
      };
    case GET_MY_FOLLOWERS_IN_FEED_SUCCESS:
      return {
        ...state,
        followers: action.payload,
      };
    case GET_A_USER_PROFILE_IN_FEED_SUCCESS:
      return {
        ...state,
        profile: action.payload,
      };
    case LIKE_A_POST_SUCCESS:
      const likedPost = state.posts.find(
        (post) => post._id === action.payload._id
      );
      likedPost.likes = action.payload.likes;
      return {
        ...state,
        posts: [...state.posts],
      };
    case UNLIKE_A_POST_SUCCESS:
      const unlikedPost = state.posts.find(
        (post) => post._id === action.payload._id
      );
      unlikedPost.likes = action.payload.likes;
      return {
        ...state,
        posts: [...state.posts],
      };
    case LIKE_A_POST_COMMENT_SUCCESS:
      const likedCommentPost = state.posts.find(
        (post) => post._id === action.payload.postId
      );
      const likedComment =
        likedCommentPost &&
        likedCommentPost.comments.find(
          (comment) => comment._id === action.payload._id
        );
      likedComment.likes = action.payload.likes;
      return {
        ...state,
        posts: [...state.posts],
      };
    case UNLIKE_A_POST_COMMENT_SUCCESS:
      const unlikedCommentPost = state.posts.find(
        (post) => post._id === action.payload.postId
      );
      const unlikedComment =
        unlikedCommentPost &&
        unlikedCommentPost.comments.find(
          (comment) => comment._id === action.payload._id
        );
      unlikedComment.likes = action.payload.likes;
      return {
        ...state,
        posts: [...state.posts],
      };
    case GET_COURSES_AND_SUBJECTS_IN_FEED_SUCCESS:
      return {
        ...state,
        courses: action.payload,
        subjects: action.payload[0] && action.payload[0].relatedSubjects,
        lessons:
          action.payload[0] &&
          action.payload[0].relatedSubjects &&
          action.payload[0].relatedSubjects[0] &&
          action.payload[0].relatedSubjects[0].relatedLessons,
      };

    default:
      return state;
  }
};
export default commentReducer;
