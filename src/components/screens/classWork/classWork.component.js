import React from "react";
import moment from "moment";
import "./css/style.css";
import dots from "../../../assets/img/dots.png";
import event from "../../../assets/img/event.png";
import sendicon from "../../../assets/img/sendicon.png";
import woman from "../../../assets/img/woman.png";
import man from "../../../assets/img/man.png";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getClass,
  createCommentForContent,
} from "./../../../redux/actions/classActions";

const ClassWork = (props) => {
  console.log(props.clazz);
  const classWork = props.clazz.teacherAssignedContents.find(
    (work) => work._id === props.match.params.classworkId
  );
  const sendComment = (e) => {
    e.preventDefault();
    const targetComment = document.getElementById(classWork._id).value;
    if (targetComment !== "") {
      props.createCommentForContent(classWork._id, targetComment);
      document.getElementById("commentForm").reset();
    }
  };
  return (
    <div>
      <div id="classroomWorkSectionOne"></div>
      <div id="classroomWorkSectionTwo">
        <main>
          <img src={dots} className="more" alt="see more" />
          <div className="question">
            <img src={event} alt="event" />
            <div>
              <p>{classWork && classWork.description}</p>
              <p className="small-grey">
                {classWork && classWork.teacher.fullName}{" "}
                {classWork &&
                  moment(classWork.createdAt).startOf("hour").fromNow()}
              </p>
              <p>Due {classWork && moment(classWork.dueDate).format("LL")}</p>
            </div>
          </div>
          <div className="class-comment">
            <h6>Add replies</h6>
            <form
              className="comment-input"
              id="commentForm"
              onSubmit={(e) => sendComment(e)}
            >
              <img className="user-image" src={woman} alt="user" />
              <div>
                <input id={classWork._id} placeholder="Add class comment" />
                <img
                  src={sendicon}
                  alt="send"
                  onClick={(e) => sendComment(e)}
                />
              </div>
            </form>
          </div>
        </main>
        <aside>
          <div className="class-comment">
            <h6>Private comments</h6>
            {classWork.comments.map((comment) => (
              <div className="pic-text-heading">
                <img src={man} alt="comment" />
                <div>
                  <p>
                    {/* {comment.student.fullName} &nbsp; */}
                    Ayobami Usman
                    <span className="small-grey">
                      {moment(comment.createdAt).startOf("hour").fromNow()}
                    </span>
                  </p>
                  <p>{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

ClassWork.propTypes = {
  getClass: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  clazz: state.class.class,
});

export default connect(mapStateToProps, { getClass, createCommentForContent })(
  ClassWork
);
