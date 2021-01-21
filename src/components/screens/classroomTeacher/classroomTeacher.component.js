import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import "./css/style.css";
import dots from "../../../assets/img/dots.png";
import event from "../../../assets/img/event.png";
import man from "../../../assets/img/man.png";
import woman from "../../../assets/img/woman.png";
import sendicon from "../../../assets/img/sendicon.png";
import addstudent from "../../../assets/img/addstudent.png";
import { connect } from "react-redux";
import { inputChange } from "../../../redux/actions/authActions";
import { getClass, createComment } from "./../../../redux/actions/classActions";
import PropTypes from "prop-types";
import Box from "./../../includes/subjectBadgeForSlick/subjectBox.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Popover, PopoverBody, Modal, ModalBody, Alert } from "reactstrap";
import { Link } from "react-router-dom";

const ClassroomTeacher = (props) => {
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);

  const { clazz, classMembers } = props;
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      window.scrollTo(0, 0);
      if (!classMembers.length) {
        props.getClass("5fc8f0fd5194183bf09b94fb");
      }
    } else {
      // do componentDidUpdate logic
    }
  });

  const copyToClipboard = (e) => {
    e.preventDefault();
    var textField = document.createElement("textarea");
    textField.innerText = `${clazz.classCode}`;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.classList.add("hide");
    setVisible(true);
  };

  const subjectList = () => {
    if (Object.keys(clazz) && clazz.relatedSubjects) {
      return clazz.relatedSubjects.map((item) => {
        return (
          <Box
            image={item.mainSubjectId.imageUrl}
            singleClass={true}
            dashboard={true}
            compiledNotes={item.relatedLessons.length}
            registeredUsers={50000}
            courseId={clazz.courseId._id}
            subjectId={item._id}
            key={item._id}
          />
        );
      });
    } else {
      return <h6>No Subject list yet</h6>;
    }
  };

  const classAnonouncements = () => {
    if (clazz.classAnnouncements) {
      return clazz.classAnnouncements.map((classAnnouncement) => {
        const sendComment = (e, id) => {
          e.preventDefault();
          const targetComment = document.getElementById(classAnnouncement._id)
            .value;
          if (targetComment !== "") {
            props.createComment(classAnnouncement._id, targetComment);
            document.getElementById("commentForm" + id).reset();
          }
        };
        return (
          <div className="chat-block" key={classAnnouncement._id}>
            <div className="sender">
              <div className="sender-head">
                <div className="pic-text-heading">
                  <img src={man} alt="sender" />
                  <div>
                    <p>{classAnnouncement.teacher.fullName} </p>
                    <small className="small-grey">
                      {moment(classAnnouncement.createdAt)
                        .startOf("hour")
                        .fromNow()}
                    </small>
                  </div>
                </div>
                <img src={dots} alt="see-more" />
              </div>
              <p className="sender-message">{classAnnouncement.text}</p>
            </div>
            <div className="comments">
              <small>
                {classAnnouncement.comments.length} class comment
                {classAnnouncement.comments.length > 0 ? "s" : ""}
              </small>
              {classAnnouncement.comments.map((comment) => (
                <div className="pic-text-heading" key={comment._id}>
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
                </div>
              ))}
            </div>
            <div className="send">
              <img src={woman} alt="sender" />
              <form
                className="send-input"
                id={`commentForm${classAnnouncement._id}`}
                onSubmit={(e) => sendComment(e, classAnnouncement._id)}
              >
                <input id={classAnnouncement._id} placeholder="To Everyone" />
                <img
                  src={sendicon}
                  alt="send"
                  onClick={(e) => sendComment(e, classAnnouncement._id)}
                />
              </form>
            </div>
          </div>
        );
      });
    } else {
      return <h6>No Announcement list yet</h6>;
    }
  };

  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={toggleModal}
        className="addStudentItemPopUp"
      >
        <ModalBody>
          <div class="popup-body">
            <FontAwesomeIcon
              icon={faTimes}
              style={{ position: "absolute", top: "5px", right: "10px" }}
              onClick={toggleModal}
            />
            <h4>Add students to your classroom</h4>
            <img src={addstudent} alt="mail" />
            <label for="username" class="form-label">
              Invite via email
            </label>
            <div class="input-group mb-3" id="username">
              <input
                type="text"
                class="form-control"
                placeholder="enail address"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              <button class="btn c-green-bg" type="button" id="button-addon2">
                Send Invite
              </button>
            </div>
            <label for="copyLink" class="form-label ">
              Copy link
            </label>
            <input
              type="text"
              id="copyLink"
              class="form-control"
              aria-describedby="copyLinkText"
              placeholder={clazz.classCode}
            />
            <small
              id="copyLinkText"
              class="form-text text-right c-green cursor-pointer"
              onClick={(e) => copyToClipboard(e)}
            >
              Copy link
            </small>
          </div>
        </ModalBody>
      </Modal>

      <div id="classroomTeacherSectionOne"></div>

      <div id="classroomTeacherSectionTwo">
        <img src={man} className="image" alt="user" />
        <div className="welcome">
          <h1 className="font2">Welcome {props.fullName}</h1>
          <p>
            <b>{clazz.courseId && clazz.courseId.name}</b>
          </p>
          <small>Class code {clazz.classCode && clazz.classCode}</small>
        </div>
        <div className="text">
          <FontAwesomeIcon
            icon={faLink}
            style={{ fontSize: "20px", marginRight: "10px" }}
          />
          <span className="copy-class-code">
            <u onClick={(e) => copyToClipboard(e)}>Copy Class Link</u>
          </span>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Popover
            placement="bottom"
            isOpen={popoverOpen}
            target="Popover1"
            toggle={toggle}
          >
            <PopoverBody>Add student to classroom</PopoverBody>
          </Popover>
          <span
            className="btn btn-success"
            id="Popover1"
            onMouseOver={() => setPopoverOpen("true")}
            onMouseLeave={toggle}
            onClick={toggleModal}
          >
            <FontAwesomeIcon icon={faPlus} />
          </span>
          <Alert
            color="info"
            isOpen={visible}
            toggle={onDismiss}
            style={{ zIndex: 22 }}
          >
            Classcode copied to Clipboard!
          </Alert>
        </div>

        <div className="content-section">
          <div id="classes" className="container-fluid relative subjects">
            <h4>My Subjects</h4>
            <div className="row">{subjectList()}</div>
          </div>

          <div className="announcements ">
            <main>
              <article>
                <div className="pic-text-heading">
                  <img src={man} alt="announce" />
                  <div>
                    <p>Announcements from teacher</p>
                  </div>
                </div>
              </article>
              <section>
                {classAnonouncements()}
                <Link
                  to={`/classes/${clazz._id}/${
                    clazz.teacherAssignedContents &&
                    clazz.teacherAssignedContents[0].subjectId._id
                  }/${
                    clazz.teacherAssignedContents &&
                    clazz.teacherAssignedContents[0]._id
                  }`}
                  className="notification-block"
                >
                  <div className="pic-text-heading">
                    <img src={event} alt="event" />
                    <div>
                      <p>
                        {clazz.teacherAssignedContents &&
                          clazz.teacherAssignedContents[0].description}
                      </p>
                      <p>
                        <small className="small-grey">
                          {clazz.teacherAssignedContents &&
                            moment(
                              clazz.teacherAssignedContents[0].createdAt
                            ).format("LL")}
                        </small>
                      </p>
                    </div>
                  </div>
                  <img src={dots} alt="see-more" />
                </Link>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

ClassroomTeacher.propTypes = {
  inputChange: PropTypes.func.isRequired,
  getClass: PropTypes.func.isRequired,
  createComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  clazz: state.class.class,
  classMembers: state.class.classMembers,
  fullName: state.auth.fullName,
  email: state.auth.email,
  userId: state.auth.userId,
  user: state.auth.user.role,
});

export default connect(mapStateToProps, {
  inputChange,
  getClass,
  createComment,
})(ClassroomTeacher);
