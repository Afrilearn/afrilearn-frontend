import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import "./css/style.css";
import dots from "../../../assets/img/dots.png";
import event from "../../../assets/img/event.png";
import man from "../../../assets/img/man.png";
import woman from "../../../assets/img/woman.png";
import ellipse from "../../../assets/img/Ellipse.png";
import sendicon from "../../../assets/img/sendicon.png";
import { connect } from "react-redux";
import { getClass, createComment } from "./../../../redux/actions/classActions";
import PropTypes from "prop-types";
import Box from "./../../includes/subjectBadgeForSlick/subjectBox.component";

import { TabContent, TabPane, Nav, NavItem, NavLink, Button } from "reactstrap";
import { Link } from "react-router-dom";

const ClassroomStudent = (props) => {
  const { classMembers, clazz, fullName } = props;
  const [newComment, setNewComment] = useState(null);

  const [activeTab, setActiveTab] = useState("1");
  // eslint-disable-next-line no-unused-vars
  const [activeVerticalTab, setActiveVerticalTab] = useState("1");
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      window.scrollTo(0, 0);

      if (!classMembers.length) {
        props.getClass(props.match.params.classId);
      }
    } else {
      // do componentDidUpdate logic
    }
  });

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
    const items = document.querySelectorAll(".tab-nav-item");
    const item = document.querySelector(".tab-nav-item-" + tab);
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      item.style.borderBottom = "none";
    }
    item.style.borderBottom = "4px solid #26AA76";
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
          />
        );
      });
    } else {
      return <h6>No Subject list yet</h6>;
    }
  };

  const classMembersList = () => {
    if (Object.keys(classMembers)) {
      return classMembers.map((classMember) => {
        return (
          <div className="pupil">
            <img src={man} height="50px" alt="pupil" />
            <p>{classMember.userId.fullName}</p>
          </div>
        );
      });
    } else {
      return <h6>No Members list yet</h6>;
    }
  };

  const classWorksList = () => {
    if (subjects) {
      return subjects.map((item, index) => {
        return (
          item.assignedContent.length > 0 && (
            <div className="class-item accordion-item" key={item._id}>
              <h5 class="accordion-header" id={`heading${index + 1}`}>
                <button
                  class="accordion-button"
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
                  <Link
                    to={`/classes/${clazz._id}/${item._id}/${content._id}`}
                    className="item accordion-body"
                  >
                    <div className="pic-text-heading first-section">
                      <img src={event} alt="event" />
                      <div>
                        <p>
                          {content.description.length > 100
                            ? content.description.slice(0, 100) + "..."
                            : content.description}
                        </p>
                        <small className="small-grey">
                          {moment(content.createdAt).startOf("hour").fromNow()}
                        </small>
                      </div>
                    </div>
                    <p className="small-grey no-margin">
                      Due {moment(content.dueDate).format("LL")}
                    </p>
                    <img className="more" src={dots} alt="see-more" />
                  </Link>
                ))}
              </div>
            </div>
          )
        );
      });
    } else {
      return <h6>No Members list yet</h6>;
    }
  };


  const classAnonouncements = () => {
    if (clazz.classAnnouncements) {
      return clazz.classAnnouncements.map((classAnnouncement) => {
        const sendComment = (e) => {
          e.preventDefault();
          const targetComment = document.getElementById(classAnnouncement._id)
            .value;
          if (targetComment !== "") {
            props.createComment(classAnnouncement._id, targetComment);
            setNewComment({
              student: { fullName },
              createdAt: Date.now(),
              text: targetComment,
              announcementId: classAnnouncement._id,
            });
            document.getElementById("commentForm").reset();
          }
        };
        return (
          <div className="chat-block">
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
                <div className="pic-text-heading">
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
              {newComment &&
                newComment.announcementId === classAnnouncement._id && (
                  <div className="pic-text-heading">
                    <img src={man} alt="comment" />
                    <div>
                      <p>
                        {newComment.student.fullName} &nbsp;
                        <span className="small-grey">
                          {moment(newComment.createdAt).fromNow()}
                        </span>
                      </p>
                      <p>{newComment.text}</p>
                    </div>
                  </div>
                )}
            </div>
            <div className="send">
              <img src={woman} alt="sender" />
              <form
                className="send-input"
                id="commentForm"
                onSubmit={(e) => sendComment(e)}
              >
                <input id={classAnnouncement._id} placeholder="To Everyone" />
                <img
                  src={sendicon}
                  alt="send"
                  onClick={(e) => sendComment(e)}
                  className="cursor-pointer"
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

  const subjects = [];
  clazz.relatedSubjects &&
    clazz.relatedSubjects.forEach((subject) => {
      const assignedContent = clazz.teacherAssignedContents.filter(
        (content) => content.subjectId && content.subjectId._id === subject._id
      );
      subjects.push({
        _id: subject._id,
        name: subject.mainSubjectId.name,
        assignedContent,
      });
    });

  
  return (
    <div>
      <div id="classroomStudentSectionOne"></div>
      <div id="classroomStudentSectionTwo">
        <div className="circle">
          <img className="ellipse" src={ellipse} alt="ellipse"></img>
          <img className="woman" src={woman} alt="user"></img>
        </div>
        <div className="tab">
          <Nav tabs>
            <NavItem className=" tab-nav-item tab-nav-item-1">
              <NavLink
                onClick={() => {
                  toggle("1");
                }}
              >
                Announcements
              </NavLink>
            </NavItem>
            <NavItem className="tab-nav-item tab-nav-item-2">
              <NavLink
                onClick={() => {
                  toggle("2");
                }}
              >
                Materials
              </NavLink>
            </NavItem>
            <NavItem className="tab-nav-item tab-nav-item-3">
              <NavLink
                onClick={() => {
                  toggle("3");
                }}
              >
                Classwork
              </NavLink>
            </NavItem>
            <NavItem className="tab-nav-item tab-nav-item-4">
              <NavLink
                onClick={() => {
                  toggle("4");
                }}
              >
                People
              </NavLink>
            </NavItem>
            <NavItem className="tab-nav-item tab-nav-item-5">
              <NavLink
                onClick={() => {
                  toggle("5");
                }}
              >
                Class Performance
              </NavLink>
            </NavItem>
          </Nav>
        </div>
        <div className="content-section">
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <div className="announcements">
                <aside>
                  <div className="student-details">
                    <h2>{props.fullName && props.fullName}</h2>
                    <p>{props.email && props.email}</p>
                    <Button className="button-green button-p-20" size="sm">
                      {clazz.courseId && clazz.courseId.alias}
                    </Button>
                  </div>
                  <div className="upcoming-events">
                    <h4>Upcoming</h4>
                    <div className="item">
                      <img src={event} alt="event"></img>
                      <div>
                        <p>
                          Posted:&nbsp;
                          {clazz.teacherAssignedContents &&
                            moment(
                              clazz.teacherAssignedContents[0].createdAt
                            ).format("LL")}
                        </p>
                        <p>
                          Due Date:&nbsp;
                          {clazz.teacherAssignedContents &&
                            moment(
                              clazz.teacherAssignedContents[0].dueDate
                            ).format("LL")}
                        </p>
                      </div>
                    </div>
                    <a
                      href="/"
                      onClick={(e) => {
                        e.preventDefault();
                        toggle("3");
                      }}
                    >
                      View All
                    </a>
                  </div>
                </aside>
                <main className="container-fluid">
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
                        clazz.teacherAssignedContents[0].subjectId
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
            </TabPane>
            <TabPane tabId="2">
              <div id="classes">
                <div
                  className="container-fluid relative classes"
                  style={{ display: "flex", padding: "50px 107px 150px 107px" }}
                >
                  <div className="row">{subjectList()}</div>
                </div>
              </div>
            </TabPane>
            <TabPane tabId="3">
              <div className="classwork">
                <main>{classWorksList()}</main>
              </div>
            </TabPane>
            <TabPane tabId="4">
              <div className="people">
                <section>
                  <div className="heading">
                    <h5>Teacher</h5>
                  </div>
                  <div className="pupil">
                    <img src={man} height="50px" alt="pupil" />
                    <p>{clazz.userId && clazz.userId.fullName}</p>
                  </div>
                </section>
                <section>
                  <div className="heading">
                    <h5>Classmates</h5>
                    <p>
                      {classMembers.length} pupil
                      {classMembers.length > 0 ? "s" : ""}
                    </p>
                  </div>
                  {classMembersList()}
                </section>
              </div>
            </TabPane>
            <TabPane tabId="5">5</TabPane>
          </TabContent>
        </div>
      </div>
    </div>
  );
};

ClassroomStudent.propTypes = {
  getClass: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  clazz: state.class.class,
  classMembers: state.class.classMembers,
  fullName: state.auth.fullName,
  email: state.auth.email,
  userId: state.auth.userId,
});

export default connect(mapStateToProps, { getClass, createComment })(
  ClassroomStudent
);
