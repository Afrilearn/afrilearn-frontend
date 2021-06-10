import React, {useState} from "react";
import { commentInputChange, addLessonComment } from "./../../../redux/actions/commentActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import dummy from "../../../assets/img/profile.svg";
import submitButton from "../../../assets/img/Send.svg";
import DBox from "../comment/commentBox.component";
import LessonCommentsLoader from "../../includes/Loaders/getLessonCommentsLoader.component";

import './css/style.css'


const Box = (props) => { 
    const { comments, getCommentLoader, newComment, userId, addCommentLoader, isAuthenticated} = props;
    
    const [seeMore, setSeeMore] = useState(false);
    
    const toggle = (e) => {
        e.preventDefault() 
        setSeeMore(!seeMore);
    } 

    const handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        props.commentInputChange(name, value);
    };

    const handleSubmit = (e) =>{
        e.preventDefault()
        const data = {
            userId,
            lessonId:props.lessonId,
            text:newComment,
            commentSection:props.commentSection
        }        
        props.addLessonComment(data)
    }

    const commentList = () => {
        if (comments && comments.length) {
            // eslint-disable-next-line array-callback-return           
            return comments.map((item, index) => {
                if(seeMore){
                    return <DBox id={item.id} comment={item} lessonId={props.lessonId} currentCommentIndex={index}/>
                }else{
                    if(index<3){
                        return <DBox id={item.id} comment={item} lessonId={props.lessonId} currentCommentIndex={index}/>
                    }
                }               
            });
        } else {
          return <h3>Be the first to comment💃</h3>
        }
    };
    
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className="commentBox">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <h4 className="commentCount">{comments && comments.length? numberWithCommas(comments.length):0} Comments</h4>  
                    { isAuthenticated? 
                    <> 
                        <div className="col-2 paddingRightOff">
                            <img src={props.user.profilePhotoUrl?props.user.profilePhotoUrl:dummy} alt="profile" className="profilePix"/>
                        </div> 
                        <div className="col-10 paddingLeftOff relative">                
                            <input type="text" placeholder="Add a public comment..." name="newComment" value={newComment} onChange={handleChange} required/>                    
                            <button className="submitButton" type="submit" disabled={addCommentLoader?true:false}><img src={submitButton} alt="profile" className=""/></button>                
                        </div>  
                    </> :''}
                </div>
            </form> 
            <div className="row sectionB">         
                { getCommentLoader?   <LessonCommentsLoader/>:commentList()}
                { comments && comments.length && comments.length>3? 
                    <div className="row">
                        <div className="col-md-4">
                            <button type="submit" className="seeMore" onClick={toggle}>{seeMore?'See Less':'See More'}</button>
                        </div>
                    </div> 
                :''}                              
            </div> 
        </div>
    );
};

Box.propTypes = {
   commentInputChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({   
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    comments: state.comment.comments,
    getCommentLoader: state.comment.getCommentLoader,
    newComment: state.comment.newComment,
    userId: state.auth.userId,
    addCommentLoader: state.comment.addCommentLoader
});

export default connect(mapStateToProps, {
    commentInputChange,
    addLessonComment
})(Box);
