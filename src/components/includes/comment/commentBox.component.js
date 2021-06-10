import React from "react";
import { inputChange } from "./../../../redux/actions/authActions";
import { likeLessonComment, unlikeLessonComment, commentInputChange,addLessonCommentResponse } from "./../../../redux/actions/commentActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dummy from "../../../assets/img/profile.svg";
import submitButton from "../../../assets/img/Send.svg";
import chat from "../../../assets/img/Chat.png";
import Unlike from "../../../assets/img/like.svg";
import Like from "../../../assets/img/unlike.svg";
import './css/style.css';
import ReactTimeAgo from 'react-time-ago';
import ReplyBox from "./replyCommentBox.component";

const Box = (props) => {   
  const {newCommentReply, user, addCommentResponseLoader, isAuthenticated} = props;
  
  const handleReply = (id, e) =>{
    e.preventDefault() 
    const x = document.getElementsByClassName(id);   
    x[0].classList.toggle("off")
  } 

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  const likeComment = (e) => {
    e.preventDefault()
    const data = {
      userId:props.user.id,
      lessonCommentId:props.comment.id 
    }   
    props.likeLessonComment(data, props.currentCommentIndex) 
  };

  const unlikeComment = (e) => {
    e.preventDefault()
    const data = {
      userId:props.user.id,
      lessonCommentId:props.comment.id      
    }
    props.unlikeLessonComment(data, props.currentCommentIndex) 
  };

  const alreadyAddedToLike = () => {
    let result = [];
    
    if (props.comment.likes && props.comment.likes.length) { 
      result = props.comment.likes.filter(item => item === props.user.id)
    }      
    
    if(result.length){
      return true
    }else{
      return false
    }
  }

  const replyBoxList = () => {
      let comment = props.comment;
      if (comment.commentReplies && comment.commentReplies.length) {
          // eslint-disable-next-line array-callback-return           
          return comment.commentReplies.map((item, index) => {
              return <ReplyBox reply={item} />
          });
      } else {
          return <h6 className="center"> Be the first to respond💃 </h6>
      }
  };

  const handleChange = (e) => {
      const target = e.target;
      const name = target.name;
      const value = target.value;
      props.commentInputChange(name, value);
  };

  const handleSubmit = (e) => {
      e.preventDefault()
      const data = {
          userId:user.id,         
          text: newCommentReply,
          lessonCommentId: props.comment.id
      }    
      props.addLessonCommentResponse(data, props.currentCommentIndex)
  }

  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  return (
        <div className="row push">            
            <div className="col-2 paddingRightOff">
                <img src={props.comment.userId && props.comment.userId.profilePhotoUrl?props.comment.userId.profilePhotoUrl:dummy} alt="profile" className="profilePix"/>
            </div> 
            <div className="col-10  relative">
                <div className="row nameSection">
                    <div className="col-6">
                        {props.comment.userId && props.comment.userId.fullName?props.comment.userId.fullName:'Anonymous'}
                    </div>
                    <div className="col-6">
                        {props.comment.createdAt? <ReactTimeAgo date={props.comment.createdAt} locale='en-US' timeStyle="twitter" />:'Not Known'}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {props.comment.text? props.comment.text.toProperCase():'Anonymous text'}
                    </div>                       
                </div>
                <div className="row iconSection">
                    <div className="col-3">
                        <span> <Link onClick={alreadyAddedToLike()? unlikeComment:likeComment}><img src={alreadyAddedToLike()? Unlike:Like} alt="like" className="likeIcon1"/></Link> {props.comment.likes && props.comment.likes.length? numberWithCommas(props.comment.likes.length):0} </span>
                    </div>  
                    <div className="col-3">
                        <span> <Link onClick={handleReply.bind(null, props.id)}><img src={chat} alt="like" className="likeIcon1 "/></Link> {props.comment.commentReplies && props.comment.commentReplies.length? numberWithCommas(props.comment.commentReplies.length):0} </span>
                    </div>  
                    <div className="col-3 ourGreen">
                        <Link onClick={handleReply.bind(null, props.id)}>REPLY</Link>
                    </div>                  
                    <span className={`replyBox off ${props.id}`}>
                        {isAuthenticated? 
                        <form onSubmit={handleSubmit}>
                            <div className="row input2">                              
                                <div className="col-2">
                                    <img src={props.user.profilePhotoUrl?props.user.profilePhotoUrl:dummy} alt="profile" className="profilePix1"/>
                                </div> 
                                <div className="col-10 relative">
                                    <input type="text" placeholder="Type here..."  name="newCommentReply" value={newCommentReply} onChange={handleChange} required/>                    
                                    <button className="submitButton" type="submit" disabled={addCommentResponseLoader?true:false}><img src={submitButton} alt="profile" className=""/></button>
                                </div>  
                            </div>
                        </form> :''}                        
                      {replyBoxList()}
                    </span>            
                </div>
            </div> 
        </div>
  );
};

Box.propTypes = {
  inputChange: PropTypes.func.isRequired,
  likeLessonComment:PropTypes.func.isRequired,
  commentInputChange:PropTypes.func.isRequired,
  unlikeLessonComment:PropTypes.func.isRequired,
  addLessonCommentResponse:PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({   
    user: state.auth.user,
    newCommentReply: state.comment.newCommentReply,
    addCommentResponseLoader: state.comment.addCommentResponseLoader,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  inputChange,
  likeLessonComment,
  unlikeLessonComment,
  commentInputChange,
  addLessonCommentResponse
})(Box);
