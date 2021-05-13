import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import "./css/style.css";
import dots from "../../../assets/img/dots.png";
import event from "../../../assets/img/event.png";
import man from "../../../assets/img/man.png";
import woman from "../../../assets/img/woman.png";
import sendicon from "../../../assets/img/sendicon.png";
import addstudent from "../../../assets/img/addstudent.png";
import { connect, useDispatch } from "react-redux";
import { inputChange } from "../../../redux/actions/authActions";
import { clearErrors } from "./../../../redux/actions/errorActions";
import {
  getClass,
  createComment,
  sendClassInvitation,
  acceptRejectClassmember,
  makeAnnouncement,
  deleteAssignedContent,
} from "./../../../redux/actions/classActions";
import { populateDashboard } from "./../../../redux/actions/courseActions";
import PropTypes from "prop-types";
import Box from "./../../includes/subjectBadgeForSlick/subjectBox.component";
import PastQuestionsBox from "../../includes/pastQuestions/box.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Popover, PopoverBody, Modal, ModalBody, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { TabContent, TabPane } from "reactstrap";
import SubjectBoxLoader from "../../includes/Loaders/subjectBoxLoader.component";
import slugify from "react-slugify";

const ClassroomTeacher = (props) => {
  const {
    activeEnrolledCourseId,
    clazz,
    classMembers,
    error,
    isLoading,
  } = props;

  const [announcementText, setAnnouncementText] = useState(null);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("1");
  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
    const items = document.querySelectorAll(".main-tab-item");
    const item = document.querySelector(".main-tab-item-" + tab);
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      item.classList.remove("active");
    }
    item.classList.add("active");
  };
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState(null);
  const onDismiss = () => setVisible(false);

  const subjects = [];
  clazz &&
    clazz.relatedSubjects &&
    clazz.relatedSubjects.forEach((subject) => {
      const assignedContent =
        clazz.teacherAssignedContents &&
        clazz.teacherAssignedContents.filter(
          (content) =>
            content.subjectId && content.subjectId._id === subject._id
        );
      subjects.push({
        _id: subject._id,
        name: subject.mainSubjectId.name,
        assignedContent,
      });
    });

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const [announcementModal, setAnnouncementModal] = useState(false);
  const toggleAnnouncementModal = () =>
    setAnnouncementModal(!announcementModal);

  const [addTeacherModal, setAddTeacherModal] = useState(false);
  const toggleAddTeacherModal = () => setAddTeacherModal(!addTeacherModal);
  const [popoverOpen, setPopoverOpen] = useState(false);
  // const [status, setStatus] = useState(null)

  const toggle = () => setPopoverOpen(!popoverOpen);

  const [newAnouncements, setNewAnouncements] = useState([]);
  const [newComments, setNewComments] = useState([]);
  const mounted = useRef();
  const invitationLink = `https://myafrilearn.com/join-class?email=${email}&classId=${activeEnrolledCourseId}`;

  useEffect(() => {
    // if (!mounted.current) {
    // do componentDidMount logic
    mounted.current = true;
    window.scrollTo(0, 0);
    props.inputChange("dashboardRoute", true);
    props.inputChange("inClass", true);
    props.inputChange("targetUser", null);

    // const data = {
    //   enrolledCourseId: activeEnrolledCourseId,
    // };
    // props.populateDashboard(activeEnrolledCourseId ? data : null);
    toggleTab("1");
    props.getClass(activeEnrolledCourseId);

    // do componentDidUpdate logic
    if (error.id === "SEND_CLASS_INVITE_SUCCESS") {
      const message =
        typeof error.msg === "object" ? error.msg.join("<br/>") : error.msg;
      Swal.fire({
        html: message,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        timer: 3500,
        // position: "top-end",
      });
      props.clearErrors();
    } else if (error.id === "ACCEPT_REJECT_CLASSMEMBER_SUCCESS") {
      const message =
        typeof error.msg === "object" ? error.msg.join("<br/>") : error.msg;
      Swal.fire({
        html: message,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        timer: 3500,
        // position: "top-end",
      });
      props.clearErrors();
    } // do componentDidUpdate logic
    else if (error.id === "ADD_ANNOUNCEMENT_SUCCESS") {
      const message =
        typeof error.msg === "object" ? error.msg.join("<br/>") : error.msg;
      Swal.fire({
        html: message,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        timer: 3500,
        // position: "top-end",
      });
      props.clearErrors();
    }
  }, [activeEnrolledCourseId]);
  if (clazz) {
    props.inputChange("activeCourseId", clazz.courseId && clazz.courseId._id);
  }
  console.log("teacherAssignedContents", clazz.teacherAssignedContents);
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
    if (clazz && Object.keys(clazz) && clazz.relatedSubjects) {
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
            courseName={clazz.courseId.name}
            subjectId={item._id}
            subjectName={item.mainSubjectId.name}
          />
        );
      });
    } else {
      return <h6>No Subject list yet</h6>;
    }
  };

  const classAnonouncements = () => {
    if (
      clazz &&
      clazz.classAnnouncements &&
      clazz.classAnnouncements.length + newAnouncements.length > 0
    ) {
      return clazz.classAnnouncements.map((classAnnouncement) => {
        const sendComment = (e, id) => {
          e.preventDefault();
          const targetComment = document.getElementById(classAnnouncement._id)
            .value;
          if (targetComment !== "") {
            props.createComment(classAnnouncement._id, targetComment);
            document.getElementById("commentForm" + id).reset();
            const newData = [...newComments, targetComment];
            setNewComments(newData);
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
                      {moment(classAnnouncement.createdAt).fromNow()}
                    </small>
                  </div>
                </div>
                <img src={dots} alt="see-more" />
              </div>
              <p className="sender-message">{classAnnouncement.text}</p>
            </div>
            <div className="comments">
              <small>
                {classAnnouncement.comments.length + newComments.length} class
                comment
                {classAnnouncement.comments.length + newComments.length > 0
                  ? "s"
                  : ""}
              </small>
              {/* {newComments.map((comment) => (
                <div className="pic-text-heading">
                  <img src={man} alt="comment" />
                  <div>
                    <p>
                      {props.fullName && props.fullName} &nbsp;
                      <span className="small-grey">less than a minute ago</span>
                    </p>
                    <p>{comment}</p>
                  </div>
                </div>
              ))}
             */}
              {classAnnouncement.comments.map((comment) => (
                <div className="pic-text-heading" key={comment._id}>
                  <img src={man} alt="comment" />
                  <div>
                    <p>
                      {comment.student.fullName} &nbsp;
                      <span className="small-grey">
                        {moment(comment.createdAt).fromNow()}
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
                  onClick={(e) => {
                    sendComment(e, classAnnouncement._id);
                  }}
                />
              </form>
            </div>
          </div>
        );
      });
    } else {
      return (
        <div class="card my-3 text-center py-2 bg-dark">
          <h6>No Announcement list yet</h6>
        </div>
      ); 
    }
  };
  const newClassAnonouncementBox = () => {
    if (newAnouncements && newAnouncements.length > 0) {
      return newAnouncements.map((newAnouncement) => (
        <div className="chat-block">
          <div className="sender">
            <div className="sender-head">
              <div className="pic-text-heading">
                <img src={man} alt="sender" />
                <div>
                  <p>Me </p>
                  <small className="small-grey">Just now</small>
                </div>
              </div>
              <img src={dots} alt="see-more" />
            </div>
            <p className="sender-message">{newAnouncement}</p>
          </div>
          <div className="comments">
            <small>0 class comments</small>
          </div>
        </div>
      ));
    }
  };

  const classWorksList = () => {
    if (
      subjects &&
      clazz &&
      clazz.teacherAssignedContents &&
      clazz.teacherAssignedContents.length > 0
    ) {
      return subjects.map((item, index) => {
        return (
          item.assignedContent.length > 0 && (
            <div className="class-item accordion-item" key={item._id}>
              <h5 class="accordion-header" id={`heading${index + 1}`}>
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index + 1}`}
                  aria-expanded="true"
                  aria-controls={`collapse${index + 1}`}
                >
                  {item.name}
                </button>
              </h5>
              <div
                id={`collapse${index + 1}`}
                className="items accordion-collapse collapse"
                aria-labelledby={`heading${index + 1}`}
                data-bs-parent="#accordionExample"
              >
                {item.assignedContent.map((content) => (
                  <div className="item accordion-body">
                    <div className="pic-text-heading first-section">
                      <img src={event} alt="event" />
                      <div>
                        <p>
                          {content.description.length > 100
                            ? content.description.slice(0, 100) + "..."
                            : content.description}
                        </p>
                        <Link
                          to={`/classnote/${
                            content.subjectId.courseId &&
                            slugify(content.subjectId.courseId.name)
                          }/${
                            content.subjectId.mainSubjectId &&
                            slugify(content.subjectId.mainSubjectId.name)
                          }/${
                            content.lessonId && slugify(content.lessonId.title)
                          }?courseId=${
                            content.subjectId &&
                            content.subjectId.courseId &&
                            content.subjectId.courseId &&
                            content.subjectId.courseId._id
                          }&subjectId=${
                            content.subjectId && content.subjectId._id
                          }&lessonId=${
                            content.lessonId && content.lessonId._id
                          }&termId=${
                            content.lessonId && content.lessonId.termId
                          }`}
                        >
                          <span class="badge bg-secondary text-white my-1">
                            {content.lessonId && content.lessonId.title}
                            &nbsp;&nbsp;
                            <FontAwesomeIcon icon={faLink} size={15} />
                          </span>
                        </Link>
                        <p>
                          <span class="badge bg-secondary text-white my-1">
                            {content.userId && "for " + content.userId.fullName}
                          </span>
                        </p>
                        <small className="small-grey">
                          {moment(content.createdAt).fromNow()}
                        </small>
                      </div>
                    </div>
                    <p className="small-grey no-margin">
                      Due {moment(content.dueDate).format("LL")}
                    </p>
                    <div class="dropdown">
                      <img
                        className="more"
                        src={dots}
                        alt="see-more"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      />
                      <ul
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <a
                            class="dropdown-item"
                            href="#"
                            onClick={() => {
                              dispatch(deleteAssignedContent(content._id));
                            }}
                          >
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        );
      });
    } else {
      return <div className="container-fluid">No classworks yet</div>;
    }
  };

  const classMembersList = () => {
    if (classMembers && Object.keys(classMembers) && classMembers.length > 0) {
      return classMembers.map((classMember) => {
        return (
          <div className="pupil">
            <img src={man} height="50px" alt="pupil" />
            <div>
              <p>{classMember.userId && classMember.userId.fullName}</p>
              <Link
                to="/performance"
                class="badge bg-primary"
                onClick={() => {
                  props.inputChange("targetUser", classMember.userId);
                }}
              >
                See performance
              </Link>
            </div>
            <select
              onChange={(e) => {
                props.acceptRejectClassmember(
                  clazz._id,
                  classMember.userId._id,
                  e.target.value
                );
              }}
            >
              <option>{classMember.status}</option>
              {classMember.status !== "approved" && (
                <option value="approved">Approve</option>
              )}
              {classMember.status !== "rejected" && (
                <option value="rejected">Reject</option>
              )}
            </select>
          </div>
        );
      });
    } else {
      return <div className="container padding-30">No Members list yet</div>;
    }
  };

  const pastQuestionsList = () => {
    if (
      clazz &&
      clazz.relatedPastQuestions &&
      clazz.relatedPastQuestions.length > 0
    ) {
      let pastQuestions = clazz.relatedPastQuestions;
      return pastQuestions.map((item, index) => {
        return (
          <PastQuestionsBox
            title={item.pastQuestionTypeId.name}
            other={index % 2 === 0 ? true : false}
            categoryId={item.pastQuestionTypeId.categoryId}
            categoryName={item.pastQuestionTypeId.name}
          />
        );
      });
    } else {
      return <h6>No past questions yet</h6>;
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
              className="cursor-pointer"
            />
            <h4>Add students to your classroom</h4>
            <img src={addstudent} alt="mail" />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                props.sendClassInvitation(email, invitationLink);
              }}
            >
              <label for="username" class="form-label">
                Invite via email
              </label>
              <div class="input-group mb-3" id="username">
                <input
                  type="email"
                  class="form-control"
                  placeholder="email address"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  required
                  onChange={(e) => {
                    e.preventDefault();
                    setEmail(e.target.value);
                  }}
                />
                <button class="btn c-green-bg" type="submit" id="button-addon2">
                  Send Invite
                </button>
              </div>
            </form>
            <label for="copyLink" class="form-label ">
              Copy Code
            </label>
            <input
              type="text"
              id="copyLink"
              class="form-control"
              aria-describedby="copyLinkText"
              placeholder={clazz && clazz.classCode}
            />

            <small
              id="copyLinkText"
              class="form-text text-right c-green cursor-pointer"
              onClick={(e) => copyToClipboard(e)}
            >
              Copy Code
            </small>
          </div>
          <Alert
            color="info"
            isOpen={visible}
            toggle={onDismiss}
            style={{ zIndex: 22 }}
          >
            Classcode copied to Clipboard!
          </Alert>
        </ModalBody>
      </Modal>
      <Modal
        isOpen={announcementModal}
        toggle={toggleAnnouncementModal}
        className="addStudentItemPopUp"
      >
        <ModalBody>
          <div class="popup-body">
            <FontAwesomeIcon
              icon={faTimes}
              style={{ position: "absolute", top: "5px", right: "10px" }}
              onClick={toggleAnnouncementModal}
              className="cursor-pointer"
            />
            <h4>Make announcement to the class</h4>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                props.makeAnnouncement(clazz._id, announcementText);
                setNewAnouncements([...newAnouncements, announcementText]);
                toggleAnnouncementModal();
              }}
            >
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">
                  Enter message
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  onChange={(e) => {
                    e.preventDefault();
                    setAnnouncementText(e.target.value);
                  }}
                  required
                ></textarea>
              </div>
              <button type="submit" class="btn button-green">
                Submit
              </button>
            </form>
          </div>
        </ModalBody>
      </Modal>
      <Modal
        isOpen={addTeacherModal}
        toggle={toggleAddTeacherModal}
        className="addStudentItemPopUp"
      >
        <ModalBody>
          <div class="popup-body">
            <FontAwesomeIcon
              icon={faTimes}
              style={{ position: "absolute", top: "5px", right: "10px" }}
              onClick={toggleAddTeacherModal}
              className="cursor-pointer"
            />
            <h4>Add another to the class</h4>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                props.makeAnnouncement(clazz._id, announcementText);
                setNewAnouncements([...newAnouncements, announcementText]);
                toggleAddTeacherModal();
              }}
            >
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">
                  Enter message
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  onChange={(e) => {
                    e.preventDefault();
                    setAnnouncementText(e.target.value);
                  }}
                  required
                ></textarea>
              </div>
              <button type="submit" class="btn button-green">
                Submit
              </button>
            </form>
          </div>
        </ModalBody>
      </Modal>

      <div id="classroomTeacherSectionOne"></div>

      <div id="classroomTeacherSectionTwo">
        <img src={man} className="image" alt="user" />
        <div className="welcome">
          <h1 className="font2">Welcome {props.fullName}</h1>
          <p>
            <b>{clazz && clazz.name}</b>
          </p>
          <small>
            Class code {clazz && clazz.classCode && clazz.classCode}
          </small>
        </div>
        <div className="text">
          <span className="">
            <u>Add Student</u>
          </span>
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
            className="btn dColor"
            id="Popover1"
            onMouseOver={() => setPopoverOpen("true")}
            onMouseLeave={toggle}
            onClick={toggleModal}
          >
            <FontAwesomeIcon icon={faPlus} />
          </span>
        </div>
        <div className="main-tabs container ">
          {clazz &&
            clazz.enrolledCourse &&
            !clazz.enrolledCourse.paymentIsActive && (
              <Link
                to={`/select-pay?classId=${clazz._id}&courseId=${
                  clazz.enrolledCourse && clazz.enrolledCourse.courseId
                }`}
                className="pay-to-unlock"
              >
                Pay to unlock all content
              </Link>
            )}
          <div class="row row-cols-auto align-items-end justify-content-center">
            <div className="col">
              <div
                class="main-tab-item main-tab-item-1 cursor-pointer"
                onClick={() => {
                  toggleTab("1");
                }}
              >
                Home
              </div>
            </div>
            <div className="col">
              <div
                class="main-tab-item main-tab-item-2 cursor-pointer"
                onClick={() => {
                  toggleTab("2");
                }}
              >
                Classworks
              </div>
            </div>
            <div className="col">
              <div
                class="main-tab-item main-tab-item-3 cursor-pointer"
                onClick={() => {
                  toggleTab("3");
                }}
              >
                People
              </div>
            </div>
          </div>
        </div>

        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <div className="content-section">
              <div id="classes" className="container-fluid relative subjects">
                <h4 className="font2">My Subjects</h4>
                <div className="row">
                  {isLoading ? <SubjectBoxLoader /> : subjectList()}
                </div>
                <h4 className="push5 h4">Past Questions</h4>
                <div className="row jj">
                  {isLoading ? <SubjectBoxLoader /> : pastQuestionsList()}
                </div>
              </div>

              <div className="announcements ">
                <main>
                  <div class="row justify-content-between">
                    <div class="col-4">
                      <h4 className="font2">Announcements</h4>
                    </div>
                    <div class="col-4 text-end">
                      Add Announcement &nbsp;&nbsp;
                      <button
                        class="btn button-green text-white"
                        type="button"
                        onClick={toggleAnnouncementModal}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </div>

                  {clazz &&
                    clazz.classAnnouncements &&
                    clazz.classAnnouncements.length + newAnouncements.length >
                      0 && (
                      <article>
                        <div className="pic-text-heading">
                          <img src={man} alt="announce" />
                          <div>
                            <p>Announcements from teacher</p>
                          </div>
                        </div>
                      </article>
                    )}

                  <section>
                    {newClassAnonouncementBox()}
                    {classAnonouncements()}
                    {clazz &&
                      clazz.teacherAssignedContents &&
                      clazz.teacherAssignedContents.length > 0 && (
                        <Link
                          to={`/classes/${clazz && clazz._id}/${
                            clazz &&
                            clazz.teacherAssignedContents &&
                            clazz.teacherAssignedContents.length &&
                            clazz.teacherAssignedContents[0].subjectId._id
                          }/${
                            clazz.teacherAssignedContents &&
                            clazz.teacherAssignedContents.length &&
                            clazz.teacherAssignedContents[0]._id
                          }`}
                          className="notification-block"
                        >
                          <div className="pic-text-heading">
                            <img src={event} alt="event" />
                            <div>
                              <p>
                                {clazz.teacherAssignedContents &&
                                clazz.teacherAssignedContents.length
                                  ? clazz.teacherAssignedContents[0].description
                                  : ""}
                              </p>
                              <p>
                                <small className="small-grey">
                                  {clazz.teacherAssignedContents &&
                                  clazz.teacherAssignedContents.length
                                    ? moment(
                                        clazz.teacherAssignedContents[0]
                                          .createdAt
                                      ).format("LL")
                                    : ""}
                                </small>
                              </p>
                            </div>
                          </div>
                          <img src={dots} alt="see-more" />
                        </Link>
                      )}{" "}
                  </section>
                </main>
              </div>
            </div>
          </TabPane>
          <TabPane tabId="2">
            <div className="w-85 row justify-content-between">
              <Link class="col text-start" to="/assign-content">
                Add classwork &nbsp; &nbsp;
                <button
                  class="btn button-green text-white"
                  type="button"
                  onClick={toggleAnnouncementModal}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </Link>
            </div>
            <div className="classwork accordion" id="accordionExample">
              <main>{classWorksList()}</main>
            </div>
          </TabPane>
          <TabPane tabId="3">
            {/* <div className="w-85 row justify-content-between">
              <Link class="col text-start" to="/assign-content">
                Add another teacher &nbsp; &nbsp;
                <button
                  class="btn button-green text-white"
                  type="button"
                  onClick={toggleAnnouncementModal} 
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </Link>
            </div> */}
            <div className="people">
              <section>
                <div className="heading">
                  <h5>Teacher</h5>
                </div>
                <div className="pupil">
                  <img src={man} height="50px" alt="pupil" />
                  <p>{clazz && clazz.userId && clazz.userId.fullName}</p>
                </div>
              </section>
              <section>
                <div className="heading">
                  <h5>Classmates</h5>
                  <p>
                    {classMembers && classMembers.length} pupil
                    {classMembers && classMembers.length > 0 ? "s" : ""}
                  </p>
                </div>
                {classMembersList()}
              </section>
            </div>
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
};

ClassroomTeacher.propTypes = {
  inputChange: PropTypes.func.isRequired,
  getClass: PropTypes.func.isRequired,
  createComment: PropTypes.func.isRequired,
  sendClassInvitation: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  acceptRejectClassmember: PropTypes.func.isRequired,
  makeAnnouncement: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeEnrolledCourseId: state.auth.activeEnrolledCourseId,
  clazz: state.class.class,
  dashboardData: state.course.dashboardData,
  classMembers: state.class.classMembers,
  fullName: state.auth.fullName,
  email: state.auth.email,
  userId: state.auth.userId,
  user: state.auth.user.role,
  error: state.error,
  isLoading: state.class.isLoading,
});

export default connect(mapStateToProps, {
  inputChange,
  populateDashboard,
  getClass,
  createComment,
  sendClassInvitation,
  clearErrors,
  acceptRejectClassmember,
  makeAnnouncement,
})(ClassroomTeacher);
