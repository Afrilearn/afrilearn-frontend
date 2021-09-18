import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import "./css/style.css";
import dots from "../../../assets/img/dots.png";
import event from "../../../assets/img/event.png";
import man from "../../../assets/img/man.png";
import woman from "../../../assets/img/woman.png";
import sendicon from "../../../assets/img/sendicon.png";
import addstudent from "../../../assets/img/addstudent.png";
import { connect, useDispatch, useSelector } from "react-redux";
import { inputChange } from "../../../redux/actions/authActions";
import { clearErrors } from "./../../../redux/actions/errorActions";
import {
  getClass,
  createComment,
  sendClassInvitation,
  acceptRejectClassmember,
  makeAnnouncement,
  deleteAssignedContent,
  getClassSubjects,
  getClassPastQuestions,
  getClassAnnouncements,
  getClassAssignedContents,
  getMembersInClass,
  getClassBasicDetails,
  addNewAdminToClass,
} from "./../../../redux/actions/classActions";
import {  
  populateDashboardUnfinishedVideos,
  populateDashboardTopTenVideos,
  populateDashboardFavouriteVideos 
} from "./../../../redux/actions/courseActions";
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
import AnnouncementsLoader from "../../includes/Loaders/announcementsLoader.component";
import ClassWorksLoader from "../../includes/Loaders/classworksLoader.component";
import {Helmet} from "react-helmet";
import ResumeWatching from "../../includes/dashboard/resumeWatching.component";
import TopTen from "../../includes/dashboard/topTen.component";
import Favourite from "../../includes/dashboard/favourites.component";
import norecent from "../../../assets/img/norecent.png";
import SubjectLoader from "../../includes/Loaders/subjectListLoader.component";

const ClassroomTeacher = (props) => {
  const { 
    activeEnrolledCourseId,
    clazz,
    userData,
    error, 
    dashboardUnFinishedVideos,
    unFinishedVideoLoader,
    topTenVideoLoader,
    dashboardTopTenVideos,
    favouriteVideoLoader,
    dashboardFavouriteVideos,
    activeCourseId 
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
  const [newAdminEmail, setNewAdminEmail] = useState(null);
  const [newAdminFullName, setNewAdminFullName] = useState(null);
  const [newAdminPassword, setNewAdminPassword] = useState(null);
  const onDismiss = () => setVisible(false);

  const classMembers = useSelector((state) => state.class.classMembers);
  const classMembersLoading = useSelector(
    (state) => state.class.classMembersLoading
  );
  const admins = useSelector((state) => state.class.admins);
  const adminsLoading = useSelector((state) => state.class.adminsLoading);
  const teacherAssignedContents = useSelector(
    (state) => state.class.teacherAssignedContents
  );
  const teacherAssignedContentsLoading = useSelector(
    (state) => state.class.teacherAssignedContentsLoading
  );
  const classRelatedPastQuestions = useSelector(
    (state) => state.class.classRelatedPastQuestions
  );
  const classRelatedPastQuestionsLoading = useSelector(
    (state) => state.class.classRelatedPastQuestionsLoading
  );
  const classRelatedSubjects = useSelector(
    (state) => state.class.classRelatedSubjects
  );
  const classRelatedSubjectsLoading = useSelector(
    (state) => state.class.classRelatedSubjectsLoading
  );
  const classAnnouncements = useSelector(
    (state) => state.class.classAnnouncements
  );
  const classAnnouncementsLoading = useSelector(
    (state) => state.class.classAnnouncementsLoading
  );

  const subjects = [];
  classRelatedSubjects.forEach((subject) => {
    const assignedContent = teacherAssignedContents.filter(
      (content) => content.subjectId && content.subjectId._id === subject._id
    );
    subjects.push({
      _id: subject._id,
      name: subject.mainSubjectId.name,
      assignedContent,
    });
  });

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [modal2, setModal2] = useState(false);
  const toggleModal2 = () => setModal2(!modal2);

  const [announcementModal, setAnnouncementModal] = useState(false);
  const toggleAnnouncementModal = () =>
    setAnnouncementModal(!announcementModal);

  const [addTeacherModal, setAddTeacherModal] = useState(false);
  const toggleAddTeacherModal = () => setAddTeacherModal(!addTeacherModal);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverOpen2, setPopoverOpen2] = useState(false);
  // const [status, setStatus] = useState(null)

  const toggle = () => setPopoverOpen(!popoverOpen);
  const toggle2 = () => setPopoverOpen2(!popoverOpen2);

  const [newAnouncements, setNewAnouncements] = useState([]);
  const [newComments, setNewComments] = useState([]);
  const mounted = useRef();
  const invitationLink = `https://myafrilearn.com/join-class?email=${email}&classId=${activeEnrolledCourseId}`;

  useEffect(() => {
    const data = {
      enrolledCourseId: activeEnrolledCourseId,
    };
    const data1 = {
      enrolledCourseId: activeCourseId,
    };
    
    dispatch(getClassSubjects(activeEnrolledCourseId));
    dispatch(getMembersInClass(activeEnrolledCourseId));
    dispatch(getClassAssignedContents(activeEnrolledCourseId));
    dispatch(getClassAnnouncements(activeEnrolledCourseId));
    dispatch(getClassPastQuestions(activeEnrolledCourseId));
    dispatch(getClassBasicDetails(activeEnrolledCourseId));
    dispatch(populateDashboardUnfinishedVideos());
    dispatch(populateDashboardTopTenVideos(activeEnrolledCourseId ? data1 : null))
    dispatch(populateDashboardFavouriteVideos(activeEnrolledCourseId ? data : null));
  
    mounted.current = true;
    window.scrollTo(0, 0);
    props.inputChange("dashboardRoute", true);
    props.inputChange("inClass", true);
    props.inputChange("targetUser", null);

    toggleTab("1");    
  }, [activeEnrolledCourseId]);

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
  else if (error.id === "ADD_NEW_ADMIN_TO_CLASS_SUCCESS") {
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
  else if (error.id === "ADD_NEW_ADMIN_TO_CLASS_FAILURE") {
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
  // if (clazz) {
  //   props.inputChange("activeCourseId", clazz.courseId && clazz.courseId._id);
  // }
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
    if (classRelatedSubjects.length > 0) {
      return classRelatedSubjects.map((item) => {
        return (
          <Box
            image={item.mainSubjectId.imageUrl}
            singleClass={true}
            dashboard={true}
            compiledNotes={item.relatedLessons.length}
            registeredUsers={50000}
            courseId={clazz && clazz.courseId && clazz.courseId._id}
            subjectId={item._id}
            key={item._id}
            courseName={clazz && clazz.courseId && clazz.courseId.name}
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
    if (classAnnouncements.length > 0) {
      return classAnnouncements.map((classAnnouncement) => {
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
        <div class="card my-3 text-center py-2 bg-dark1">
          <h6>No Announcement list yet</h6>
        </div>
      );
    }
  };

  const classWorksList = () => {
    if (subjects && teacherAssignedContents.length > 0) {
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

  const adminsList = () => {
    if (admins.length > 0) {
      return admins.map((admin) => {
        return (
          <div className="pupil">
            <img src={man} height="50px" alt="pupil" />
            <p>{admin && admin.userId && admin.userId.fullName}</p>
          </div>
        );
      });
    } else {
      return <div className="container padding-30">No Admin yet</div>;
    }
  };

  const pastQuestionsList = () => {
    if (classRelatedPastQuestions.length > 0) {
      let pastQuestions = classRelatedPastQuestions;
      return pastQuestions.map((item, index) => {
        return (
          <PastQuestionsBox
            title={item.pastQuestionTypeId.name}
            other={index % 2 === 0 ? true : false}
            categoryId={item.pastQuestionTypeId.categoryId}
            categoryName={item.pastQuestionTypeId.name}
            image={item.pastQuestionTypeId.imageUrl}
            description={item.pastQuestionTypeId.description}
          />
        );
      });
    } else {
      return <h6>No past questions yet</h6>;
    }
  };

  const unFinishedVideosList = () => {
    if (
      dashboardUnFinishedVideos.unFinishedVideos &&     
      dashboardUnFinishedVideos.unFinishedVideos.length
    ) {      
      // eslint-disable-next-line array-callback-return
      let counter = 0;
      return dashboardUnFinishedVideos.unFinishedVideos.map((item, index) => {  
        if(counter<6){
          ++counter
          return (
            <ResumeWatching item= {item}/>
          );     
        } 
      });
    } else {
      return (
        <div className="empty-class-state-2">
          <img src={norecent} /> <p>You currently have 0 uncompleted Videos</p>
        </div>
      );
    }
  };

  const topTenList = () => {
    if (
      dashboardTopTenVideos.lessons &&     
      dashboardTopTenVideos.lessons.length
    ) {      
      // eslint-disable-next-line array-callback-return
      let counter = 0;
      return dashboardTopTenVideos.lessons.map((item, index) => {  
        if(counter<6){
          ++counter
          return (
            <TopTen item= {item}/>
          );     
        } 
      });
    } else {
      return (
        <div className="empty-class-state-2">
          <img src={norecent} /> <p>No top ten videos</p>
        </div>
      );
    }
  };
  
  const favouriteList = () => {
    if (
      dashboardFavouriteVideos &&     
      dashboardFavouriteVideos.length
    ) {      
      let counter = 0;
      // eslint-disable-next-line array-callback-return     
      return dashboardFavouriteVideos.map((item, index) => {
        if(counter<6){
          ++counter
          return (
            <Favourite item= {item}/>
          );
        }         
      });
    } else {
      return (
        <div className="empty-class-state-2">
          <img src={norecent} /> <p>No favourite videos yet</p>
        </div>
      );
    }
  };
 

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{clazz.courseId && clazz.courseId.name? clazz.courseId.name:''} | Future of learning</title>
        <meta name="description" content='Classroom | Teacher | Subjects' />
      </Helmet> 
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
        isOpen={modal2}
        toggle={toggleModal2}
        className="addStudentItemPopUp"
      >
        <ModalBody>
          <div class="popup-body">
            <FontAwesomeIcon
              icon={faTimes}
              style={{ position: "absolute", top: "5px", right: "10px" }}
              onClick={toggleModal2}
              className="cursor-pointer"
            />
            <h4>Add Admin to your classroom</h4>
            <img src={addstudent} alt="mail" />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                props.addNewAdminToClass(
                  newAdminFullName,
                  newAdminEmail,
                  newAdminPassword,
                  activeEnrolledCourseId
                );
              }}
            >
              <label for="username" class="form-label">
                Full Name
              </label>
              <input
                type="text"
                class="form-control"
                placeholder="Full Name"
                aria-label="Recipient's full name"
                aria-describedby="button-addon2"
                required
                onChange={(e) => {
                  e.preventDefault();
                  setNewAdminFullName(e.target.value);
                }}
              />
              <label for="username" class="form-label">
                Email Address
              </label>
              <input
                type="email"
                class="form-control"
                placeholder="Email address"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                required
                onChange={(e) => {
                  e.preventDefault();
                  setNewAdminEmail(e.target.value);
                }}
              />
              <label for="username" class="form-label">
                Password
              </label>
              <input
                type="password"
                security
                class="form-control"
                placeholder="Password"
                aria-label="Recipient's password"
                aria-describedby="button-addon2"
                required
                onChange={(e) => {
                  e.preventDefault();
                  setNewAdminPassword(e.target.value);
                }}
              />
              <button type="submit" className="btn dColor my-3">
                Add Admin
              </button>
            </form>

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
        <div
          className="image"
          style={{
            backgroundImage: `url(${
              userData.profilePhotoUrl ? userData.profilePhotoUrl : man
            })`,
          }}
        ></div>

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
          <span className="mx-2">
            <u>Add Student</u>
          </span>
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
          <span className="mx-2">
            <u>Add Admin</u>
          </span>

          <Popover
            placement="bottom"
            isOpen={popoverOpen2}
            target="Popover2"
            toggle={toggle2}
          >
            <PopoverBody>Add Admin to classroom</PopoverBody>
          </Popover>
          <span
            className="btn dColor"
            id="Popover2"
            onMouseOver={() => setPopoverOpen2("true")}
            onMouseLeave={toggle2}
            onClick={toggleModal2}
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
                  {classRelatedSubjectsLoading ? (
                    <SubjectBoxLoader />
                  ) : (
                    subjectList()
                  )}
                </div>
                <h4 className="push5 h4 past">Past Questions</h4>
                <div className="row jj">
                  {classRelatedPastQuestionsLoading ? (
                    <SubjectBoxLoader />
                  ) : (
                    pastQuestionsList()
                  )}
                </div>
                <a name="resumePlaying"></a>
                <h4 className="push5 resumePlayingBox">Resume Watching</h4>
                <div className="row push10 resumePlaying resumePlayingDashboard">      
                  { unFinishedVideoLoader ? (
                      <SubjectLoader />
                  ) : (
                    unFinishedVideosList()
                  )}
                      
                </div>
                <a name="topTen"></a>
                <h4 className="push5 resumePlayingBox topT">Top Ten Lessons <small className="showAll"><Link to="/more-info?section=topTen">Show all</Link></small></h4>
                <div className="row push10 resumePlaying myTopTen resumePlayingDashboard">      
                  { topTenVideoLoader ? (
                      <SubjectLoader />
                  ) : (
                    topTenList()
                  )}
                  
                </div>
                <a name="favourite"></a>
                <h4 className="push5 resumePlayingBox favT">My Fav <small className="showAll"><Link to="/more-info?section=favourites">Show all</Link></small></h4>
                <div className="row push10 resumePlaying myTopTen resumePlayingDashboard favU">      
                  { favouriteVideoLoader ? (
                      <SubjectLoader />
                  ) : (
                    favouriteList()
                  )}
                  
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

                  {classAnnouncements.length + newAnouncements.length > 0 && (
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
                    {classAnnouncementsLoading ? (
                      <AnnouncementsLoader />
                    ) : (
                      classAnonouncements()
                    )}
                    {teacherAssignedContentsLoading && <ClassWorksLoader />}
                    {teacherAssignedContents &&
                      teacherAssignedContents.length > 0 && (
                        <Link
                          to={`/classes/${clazz && clazz._id}/${
                            teacherAssignedContents &&
                            teacherAssignedContents.length &&
                            teacherAssignedContents[0].subjectId._id
                          }/${
                            teacherAssignedContents &&
                            teacherAssignedContents.length &&
                            teacherAssignedContents[0]._id
                          }`}
                          className="notification-block"
                        >
                          <div className="pic-text-heading">
                            <img src={event} alt="event" />
                            <div>
                              <p>
                                {teacherAssignedContents &&
                                teacherAssignedContents.length
                                  ? teacherAssignedContents[0].description
                                  : ""}
                              </p>
                              <p>
                                <small className="small-grey">
                                  {teacherAssignedContents &&
                                  teacherAssignedContents.length
                                    ? moment(
                                        teacherAssignedContents[0].createdAt
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
              <main>
                {teacherAssignedContentsLoading ? (
                  <ClassWorksLoader />
                ) : (
                  classWorksList()
                )}
              </main>
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
                  <h5>Teacher and Admins</h5>
                </div>
                {adminsList()}
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
  addNewAdminToClass: PropTypes.func.isRequired,
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
  userData: state.auth.user,
  error: state.error,
  dashboardUnFinishedVideos:state.course.dashboardUnFinishedVideos,
  unFinishedVideoLoader:state.course.unFinishedVideoLoader,
  topTenVideoLoader: state.course.topTenVideoLoader,
  dashboardTopTenVideos: state.course.dashboardTopTenVideos,
  favouriteVideoLoader: state.course.favouriteVideoLoader,
  dashboardFavouriteVideos: state.course.dashboardFavouriteVideos,
  activeCourseId: state.auth.activeCourseId
});

export default connect(mapStateToProps, {
  inputChange,
  getClass,
  createComment,
  addNewAdminToClass,
  sendClassInvitation,
  clearErrors,
  acceptRejectClassmember,
  makeAnnouncement,
  populateDashboardUnfinishedVideos,
  populateDashboardTopTenVideos,
  populateDashboardFavouriteVideos
})(ClassroomTeacher);
