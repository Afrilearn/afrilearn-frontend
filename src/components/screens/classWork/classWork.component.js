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
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import slugify from "react-slugify";

const ClassWork = (props) => {
  const { role, classMembers, clazz } = props;
  const classWork = clazz.teacherAssignedContents.find(
    (work) => work._id === props.match.params.classworkId
  );

  const studentSendComment = (e, student) => {
    e.preventDefault();
    const targetComment = document.getElementById("commentForm").value;
    if (targetComment !== "") {
      props.createCommentForContent(classWork._id, targetComment, student);
      document.getElementById("commentForm").reset();
    }
  };
  const sendComment = (e, index, student) => {
    e.preventDefault();
    const targetComment = document.getElementById(index).value;
    if (targetComment !== "") {
      props.createCommentForContent(classWork._id, targetComment, student);
      document.getElementById("commentForm" + index).reset();
    }
  };

  const commentList = (studentId, index) => {
    const myComments = classWork.comments.filter(
      (comment) => comment.student === studentId
    );
    if (classWork && classWork.comments) {
      return (
        <div>
          <div className="comments">
            <small>
              {myComments.length} conversation
              {myComments.length > 0 ? "s" : ""}
            </small>
            {myComments.map((comment) => (
              <div className="pic-text-heading">
                <img src={man} alt="comment" />
                <div>
                  <p>
                    {comment.sender && comment.sender.fullName} &nbsp;
                    <span className="small-grey">
                      {moment(comment.createdAt).startOf("hour").fromNow()}
                    </span>
                  </p>
                  <p>{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="send">
            <img src={woman} alt="sender" />
            <form
              className="send-input"
              id={`commentForm${index}`}
              onSubmit={(e) => sendComment(e, index, studentId)}
            >
              <input id={index} placeholder="Private conversation" />
              <img
                src={sendicon}
                alt="send"
                onClick={(e) => sendComment(e, index, studentId)}
              />
            </form>
          </div>
        </div>
      );
    } else {
      return <h6>No Subject list yet</h6>;
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
              <Link
                to={`/classnote/${
                  classWork.subjectId.courseId &&
                  slugify(classWork.subjectId.courseId.name)
                }/${
                  classWork.subjectId.mainSubjectId &&
                  slugify(classWork.subjectId.mainSubjectId.name)
                }/${
                  classWork.lessonId && slugify(classWork.lessonId.title)
                }?courseId=${
                  classWork.subjectId &&
                  classWork.subjectId.courseId &&
                  classWork.subjectId.courseId &&
                  classWork.subjectId.courseId._id
                }&subjectId=${
                  classWork.subjectId && classWork.subjectId._id
                }&lessonId=${
                  classWork.lessonId && classWork.lessonId._id
                }&termId=${classWork.lessonId && classWork.lessonId.termId}`}
              >
                <span class="badge bg-secondary text-white my-1 text-truncate">
                  {classWork.lessonId && classWork.lessonId.title}
                  &nbsp;&nbsp;
                  <FontAwesomeIcon icon={faLink} size={15} />
                </span>
              </Link>
              <p className="small-grey">
                {classWork && classWork.teacher.fullName}{" "}
                {classWork &&
                  moment(classWork.createdAt).startOf("hour").fromNow()}
              </p>
              <p>Due {classWork && moment(classWork.dueDate).format("LL")}</p>
            </div>
          </div>
          {role && role !== "602f3ce39b146b3201c2dc1d" && (
            <div className="class-comment">
              <h6>Add replies</h6>
              <form
                className="comment-input"
                id="commentForm"
                onSubmit={(e) => studentSendComment(e, props.userId)}
              >
                <img className="user-image" src={woman} alt="user" />
                <div>
                  <input id={classWork._id} placeholder="Add class comment" />
                  <img
                    src={sendicon}
                    alt="send"
                    onClick={(e) => studentSendComment(e, props.userId)}
                  />
                </div>
              </form>
            </div>
          )}
        </main>

        <aside>
          {role && role === "602f3ce39b146b3201c2dc1d" ? (
            <div className="class-comment">
              <h6>Send comment to students</h6>
              <div class="accordion accordion-flush" id="accordionExample">
                {classMembers.map((member, index) => (
                  <div class="accordion-item">
                    <h2 class="accordion-header" id={`heading${index + 1}`}>
                      <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${index + 1}`}
                        aria-expanded="false"
                        aria-controls={`collapse${index + 1}`}
                      >
                        <div className="pic-text-heading">
                          <img src={man} alt="comment" />
                          <div>
                            <p>{member.userId.fullName}</p>
                          </div>
                        </div>
                      </button>
                    </h2>
                    <div
                      id={`collapse${index + 1}`}
                      class="accordion-collapse collapse show"
                      aria-labelledby={`heading${index + 1}`}
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        {commentList(member.userId._id, index)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="class-comment">
              <h6>Private comments</h6>
              {classWork.comments.map((comment) => (
                <div className="pic-text-heading">
                  <img src={man} alt="comment" />
                  <div>
                    <p>
                      {comment.sender.fullName}
                      <span className="small-grey">
                        {moment(comment.createdAt).startOf("hour").fromNow()}
                      </span>
                    </p>
                    <p>{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
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
  role: state.auth.user.role,
  userId: state.auth.user._id,
  classMembers: state.class.classMembers,
});

export default connect(mapStateToProps, { getClass, createCommentForContent })(
  ClassWork
);

/*<div className="pic-text-heading">
                <img src={man} alt="comment" />
                <div>
                  <p>
                    {comment.student.fullName} &nbsp;
                    <span className="small-grey">
                      {moment(comment.createdAt).startOf("hour").fromNow()}
                    </span>
                  </p>
                  <p>{comment.text}</p>
                </div>
              </div> */
