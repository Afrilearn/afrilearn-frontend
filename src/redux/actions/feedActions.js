import API from "../../assets/js/api";
import { returnErrors } from "./errorActions";

import {
  FEED_INPUT_CHANGE,
  ADD_POST_TO_FEED_SUCCESS,
  ADD_POST_TO_FEED_FAILURE,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  DELETE_POST_FAILURE,
  COMMENT_TO_POST_SUCCESS,
  COMMENT_TO_POST_FAILURE,
  LIKE_A_POST_SUCCESS,
  LIKE_A_POST_FAILURE,
  UNLIKE_A_POST_SUCCESS,
  UNLIKE_A_POST_FAILURE,
  SEARCH_FOR_USERS_IN_FEED_SUCCESS,
  SEARCH_FOR_USERS_IN_FEED_FAILURE,
  SEARCH_FOR_POSTS_IN_FEED_SUCCESS,
  SEARCH_FOR_POSTS_IN_FEED_FAILURE,
  FOLLOW_A_USER_IN_FEED_FAILURE,
  FOLLOW_A_USER_IN_FEED_SUCCESS,
  GET_MY_FOLLOWINGS_IN_FEED_SUCCESS,
  GET_MY_FOLLOWINGS_IN_FEED_FAILURE,
  GET_MY_FOLLOWERS_IN_FEED_SUCCESS,
  GET_MY_FOLLOWERS_IN_FEED_FAILURE,
  GET_A_USER_PROFILE_IN_FEED_SUCCESS,
  GET_A_USER_PROFILE_IN_FEED_FAILURE,
  DELETE_POST_SUCCESS,
  GET_MY_POSTS_IN_FEED_SUCCESS,
  GET_MY_POSTS_IN_FEED_FAILURE,
  GET_USERS_IN_MY_FEED_SUCCESS,
  GET_USERS_IN_MY_FEED_FAILURE,
  GET_COURSES_AND_SUBJECTS_IN_FEED_SUCCESS,
  GET_COURSES_AND_SUBJECTS_IN_FEED_FAILURE,
  LIKE_A_POST_COMMENT_SUCCESS,
  LIKE_A_POST_COMMENT_FAILURE,
  UNLIKE_A_POST_COMMENT_SUCCESS,
  UNLIKE_A_POST_COMMENT_FAILURE,
} from "./types";

export const feedInputChange = (name, value) => async (dispatch) => {
  try {
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name,
        value,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const addAPostToFeed = (data) => async (dispatch) => {
  try {
    const result = await API.addAPostToFeed(data);
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "sendingPost",
        value: true,
      },
    });

    dispatch({
      type: ADD_POST_TO_FEED_SUCCESS,
      payload: result.data.data.post,
    });
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "sendingPost",
        value: false,
      },
    });
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "text",
        value: "",
      },
    });
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "image",
        value: null,
      },
    });
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "subjectId",
        value: "",
      },
    });
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "courseId",
        value: "",
      },
    });
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "lessonId",
        value: "",
      },
    });
  } catch (err) {
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "sendingPost",
        value: false,
      },
    });
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "ADD_POST_TO_FEED_FAILURE"
      )
    );
    dispatch({
      type: ADD_POST_TO_FEED_FAILURE,
    });
  }
};

export const updateAPostToFeed = (postId, data) => async (dispatch) => {
  try {
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "postLoading",
        value: true,
      },
    });
    const result = await API.updateAPost(postId, data);

    dispatch({
      type: UPDATE_POST_SUCCESS,
      payload: result.data.data.post,
    });
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "postLoading",
        value: false,
      },
    });
  } catch (err) {
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "postLoading",
        value: false,
      },
    });
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "UPDATE_POST_FAILURE"
      )
    );
    dispatch({
      type: UPDATE_POST_FAILURE,
    });
  }
};

export const deleteAPost = (postId) => async (dispatch) => {
  try {
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "postLoading",
        value: true,
      },
    });
    const result = await API.updateAPost(postId);

    dispatch({
      type: DELETE_POST_SUCCESS,
      payload: result.data.data.post,
    });
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "postLoading",
        value: false,
      },
    });
  } catch (err) {
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "postLoading",
        value: false,
      },
    });
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "DELETE_POST_FAILURE"
      )
    );
    dispatch({
      type: DELETE_POST_FAILURE,
    });
  }
};

export const commentToAPost = (postId, data) => async (dispatch) => {
  try {
    const result = await API.commentToAPost(postId, data);

    dispatch({
      type: COMMENT_TO_POST_SUCCESS,
      payload: result.data.data.comment,
    });
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "commentText",
        value: "",
      },
    });
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "commentImage",
        value: null,
      },
    });
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "COMMENT_TO_POST_FAILURE"
      )
    );
    dispatch({
      type: COMMENT_TO_POST_FAILURE,
    });
  }
};

export const likeAPost = (postId) => async (dispatch) => {
  try {
    const result = await API.likeAPost(postId);

    dispatch({
      type: LIKE_A_POST_SUCCESS,
      payload: result.data.data.selectedPost,
    });
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "LIKE_A_POST_FAILURE"
      )
    );
    dispatch({
      type: LIKE_A_POST_FAILURE,
    });
  }
};

export const unlikeAPost = (postId) => async (dispatch) => {
  try {
    const result = await API.unLikeAPost(postId);

    dispatch({
      type: UNLIKE_A_POST_SUCCESS,
      payload: result.data.data.selectedPost,
    });
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "UNLIKE_A_POST_FAILURE"
      )
    );
    dispatch({
      type: UNLIKE_A_POST_FAILURE,
    });
  }
};
export const likeAPostComment = (commentId) => async (dispatch) => {
  try {
    const result = await API.likeAComment(commentId);

    dispatch({
      type: LIKE_A_POST_COMMENT_SUCCESS,
      payload: result.data.data.selectedComment,
    });
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "LIKE_A_POST_COMMENT_FAILURE"
      )
    );
    dispatch({
      type: LIKE_A_POST_COMMENT_FAILURE,
    });
  }
};

export const unlikeAPostComment = (commentId) => async (dispatch) => {
  try {
    const result = await API.unLikeAComment(commentId);

    dispatch({
      type: UNLIKE_A_POST_COMMENT_SUCCESS,
      payload: result.data.data.selectedComment,
    });
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "UNLIKE_A_POST_COMMENT_FAILURE"
      )
    );
    dispatch({
      type: UNLIKE_A_POST_COMMENT_FAILURE,
    });
  }
};

export const seachUsersInFeed = (searchQuery) => async (dispatch) => {
  try {
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "usersInFeedLoading",
        value: true,
      },
    });
    const result = await API.searchForUsersInFeed(searchQuery);

    dispatch({
      type: SEARCH_FOR_USERS_IN_FEED_SUCCESS,
      payload: result.data.data.users,
    });
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "usersInFeedLoading",
        value: false,
      },
    });
  } catch (err) {
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "usersInFeedLoading",
        value: false,
      },
    });
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "SEARCH_FOR_USERS_IN_FEED_FAILURE"
      )
    );
    dispatch({
      type: SEARCH_FOR_USERS_IN_FEED_FAILURE,
    });
  }
};
export const getUsersInFeed = () => async (dispatch) => {
  try {
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "usersInFeedLoading",
        value: true,
      },
    });
    const result = await API.getUsersInMyFeed();

    dispatch({
      type: GET_USERS_IN_MY_FEED_SUCCESS,
      payload: result.data.data.users,
    });
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "usersInFeedLoading",
        value: false,
      },
    });
  } catch (err) {
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "usersInFeedLoading",
        value: false,
      },
    });
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "GET_USERS_IN_MY_FEED_FAILURE"
      )
    );
    dispatch({
      type: GET_USERS_IN_MY_FEED_FAILURE,
    });
  }
};

export const searchPostsInFeed = (searchQuery) => async (dispatch) => {
  try {
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "postsLoading",
        value: true,
      },
    });
    const result = await API.searchForPostsInFeed(searchQuery);

    dispatch({
      type: SEARCH_FOR_POSTS_IN_FEED_SUCCESS,
      payload: result.data.data.posts,
    });
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "postsLoading",
        value: false,
      },
    });
  } catch (err) {
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "postsLoading",
        value: false,
      },
    });
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "SEARCH_FOR_POSTS_IN_FEED_FAILURE"
      )
    );
    dispatch({
      type: SEARCH_FOR_POSTS_IN_FEED_FAILURE,
    });
  }
};

export const getPostsInFeed = () => async (dispatch) => {
  try {
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "postsLoading",
        value: true,
      },
    });
    const result = await API.getMyPostsInFeed();

    dispatch({
      type: GET_MY_POSTS_IN_FEED_SUCCESS,
      payload: result.data.data.posts,
    });
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "postsLoading",
        value: false,
      },
    });
  } catch (err) {
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "postsLoading",
        value: false,
      },
    });
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "GET_MY_POSTS_IN_FEED_FAILURE"
      )
    );
    dispatch({
      type: GET_MY_POSTS_IN_FEED_FAILURE,
    });
  }
};

export const followAUser = (userId) => async (dispatch) => {
  try {
    const result = await API.followAUserInFeed(userId);

    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "followUnfollowLoading",
        value: true,
      },
    });

    dispatch({
      type: FOLLOW_A_USER_IN_FEED_SUCCESS,
      payload: result.data.data,
    });
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "followUnfollowLoading",
        value: false,
      },
    });
  } catch (err) {
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "followUnfollowLoading",
        value: false,
      },
    });
    console.log("err", err);
    dispatch(
      returnErrors(
        err.response && err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "FOLLOW_A_USER_IN_FEED_FAILURE"
      )
    );
    dispatch({
      type: FOLLOW_A_USER_IN_FEED_FAILURE,
    });
  }
};

export const getMyFollowings = () => async (dispatch) => {
  try {
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "followingsLoading",
        value: true,
      },
    });
    const result = await API.getMyFollowingsInFeed();

    dispatch({
      type: GET_MY_FOLLOWINGS_IN_FEED_SUCCESS,
      payload: result.data.data.followings,
    });
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "followingsLoading",
        value: false,
      },
    });
  } catch (err) {
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "followingsLoading",
        value: false,
      },
    });
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "GET_MY_FOLLOWINGS_IN_FEED_FAILURE"
      )
    );
    dispatch({
      type: GET_MY_FOLLOWINGS_IN_FEED_FAILURE,
    });
  }
};

export const getMyFollowers = () => async (dispatch) => {
  try {
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "followersLoading",
        value: true,
      },
    });
    const result = await API.getMyFollowersInFeed();

    dispatch({
      type: GET_MY_FOLLOWERS_IN_FEED_SUCCESS,
      payload: result.data.data.followers,
    });
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "followersLoading",
        value: false,
      },
    });
  } catch (err) {
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "followersLoading",
        value: false,
      },
    });
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "GET_MY_FOLLOWERS_IN_FEED_FAILURE"
      )
    );
    dispatch({
      type: GET_MY_FOLLOWERS_IN_FEED_FAILURE,
    });
  }
};

export const getCourseAndRelatedSubjectsForFeed = () => async (dispatch) => {
  try {
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "coursesLoading",
        value: true,
      },
    });
    const result = await API.getCourseAndRelatedSubjectsForFeed();

    dispatch({
      type: GET_COURSES_AND_SUBJECTS_IN_FEED_SUCCESS,
      payload: result.data.data.courses,
    });
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "coursesLoading",
        value: false,
      },
    });
  } catch (err) {
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "coursesLoading",
        value: false,
      },
    });
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "GET_COURSES_AND_SUBJECTS_IN_FEED_FAILURE"
      )
    );
    dispatch({
      type: GET_COURSES_AND_SUBJECTS_IN_FEED_FAILURE,
    });
  }
};

export const getAUserProfile = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "profileLoading",
        value: true,
      },
    });
    const result = await API.getAUserProfileInFeed(userId);

    dispatch({
      type: GET_A_USER_PROFILE_IN_FEED_SUCCESS,
      payload: result.data.data.profile,
    });
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "profileLoading",
        value: false,
      },
    });
  } catch (err) {
    dispatch({
      type: FEED_INPUT_CHANGE,
      payload: {
        name: "profileLoading",
        value: false,
      },
    });
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "GET_A_USER_PROFILE_IN_FEED_FAILURE"
      )
    );
    dispatch({
      type: GET_A_USER_PROFILE_IN_FEED_FAILURE,
    });
  }
};
