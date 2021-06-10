import {
  GET_LESSON_COMMENTS_SUCCESS,
  COMMENT_INPUT_CHANGE,
  ADD_LESSON_COMMENT_SUCCESS,
  LIKE_LESSON_COMMENT_SUCCESS,
  UNLIKE_LESSON_COMMENT_SUCCESS,
  ADD_LESSON_COMMENT_REPLY_SUCCESS
} from "../actions/types";

const initialState = {
  getCommentLoader: false,
  comments: [],
  addCommentLoader: false,
  newComment: '',
  addCommentResponseLoader: false,
  newCommentReply:''
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENT_INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case GET_LESSON_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload,
      };

    case ADD_LESSON_COMMENT_SUCCESS:
      let newcomments = state.comments;
      newcomments.unshift(action.payload.comment)
      state.comments = [...newcomments]
      return {
        ...state,
        newComment: ''
      };

    case LIKE_LESSON_COMMENT_SUCCESS:
      let allComments = state.comments;
      allComments[action.payload.currentCommentIndex] = action.payload.data
      state.comments = [...allComments]
      return {
        ...state,
      };

    case UNLIKE_LESSON_COMMENT_SUCCESS:
      let lesssonComments = state.comments;
      let targetLesssonComment = lesssonComments[action.payload.currentCommentIndex];
      let targetLesssonCommentLikes = targetLesssonComment.likes;
      targetLesssonCommentLikes = targetLesssonCommentLikes.filter(item => item !== action.payload.userId)
      targetLesssonComment.likes = [...targetLesssonCommentLikes]
      lesssonComments[action.payload.currentCommentIndex] = {...targetLesssonComment}
      state.comments = [...lesssonComments]
      return {
        ...state,
      };
    
    case ADD_LESSON_COMMENT_REPLY_SUCCESS:
      let DlesssonComments = state.comments;
      let DtargetLesssonComment = DlesssonComments[action.payload.currentCommentIndex];
      let DtargetLesssonCommentReplies = DtargetLesssonComment.commentReplies; 
      DtargetLesssonCommentReplies.unshift({...action.payload.commentReply});
        
      return {
        ...state,
        newCommentReply: ''
      };


    default:
      return state;
  }
};
export default commentReducer;