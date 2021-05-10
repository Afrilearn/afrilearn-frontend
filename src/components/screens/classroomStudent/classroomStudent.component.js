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
import { getPerformanceInClass } from "./../../../redux/actions/courseActions";
import PropTypes from "prop-types";
import Box from "./../../includes/subjectBadgeForSlick/subjectBox.component";
import { PieChart } from "react-minimal-pie-chart";
import Chart from "r-chart";
import { inputChange } from "./../../../redux/actions/authActions";
import SubjectBox from "./../../includes/performance/subjectBox.component";
import PastQuestionBox from "./../../includes/performance/pastQuestions.component";

import { TabContent, TabPane, Nav, NavItem, NavLink, Button } from "reactstrap";
import { Link } from "react-router-dom";

const ClassroomStudent = (props) => {
  const {
    classMembers,
    clazz,
    chartSection,
    activeCourseId,
    fullName,
    email,
    activeCourseName,
    state,
    barChart,
    barChartTitles,
    performance,
    overallPerformance,
    overallProgress,
  } = props;

  const [newComment, setNewComment] = useState(null);

  const [activeTab, setActiveTab] = useState("1");

  // eslint-disable-next-line no-unused-vars
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      window.scrollTo(0, 0);

      props.getClass(props.match.params.classId);
    } else {
      // do componentDidUpdate logic
    }
  });

  const handleNavigation = (section, e) => {
    e.preventDefault();
    props.inputChange("chartSection", section);
  };

  const performanceSubjectList = () => {
    if (performance.subjectsList && performance.subjectsList.length) {
      let subjects = performance.subjectsList;
      return subjects.map((item) => {
        return (
          <SubjectBox
            subject={item.subject}
            performance={item.performance}
            correctAnswers={`${item.totalQuestionsCorrect}/${item.totalQuestions}`}
            textAttempted={`${item.numberOfTests}/${item.totalTests}`}
            time={
              item.averageTimePerTest === null
                ? "No Rating"
                : item.averageTimePerTest
            }
          />
        );
      });
    } else {
      return <h6>Performance loading...</h6>;
    }
  };

  const pastQuestionsList = () => {
    if (performance.examsList && performance.examsList.length) {
      let exam = performance.examsList;
      return exam.map((item) => {
        return (
          <PastQuestionBox
            subject={item.name}
            performance={item.performance}
            subjectAttempted={`${item.subjectsAttempted}/${item.totalSubjectsCount}`}
            time={
              item.averageTimePerSubject === null
                ? "No Rating"
                : item.averageTimePerSubject
            }
            subjects={item.perSubjectResults}
          />
        );
      });
    } else {
      return <h6>Performance loading...</h6>;
    }
  };

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
    const items = document.querySelectorAll(".tab-nav-item");
    const item = document.querySelector(".tab-nav-item-" + tab);
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      item.style.borderBottom = "none";
    }
    item.style.borderBottom = "4px solid #84BB29";
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
  const classMembersList = () => {
    if (classMembers && classMembers.length > 0) {
      return classMembers.map((classMember) => (
        <div className="pupil">
          <img src={man} height="50px" alt="pupil" />
          <p>
            {classMember && classMember.userId && classMember.userId.fullName}
          </p>
        </div>
      ));
    } else {
      return <div className="container padding-30">No Members list yet</div>;
    }
  };

  const myContents =
    clazz.teacherAssignedContents &&
    clazz.teacherAssignedContents.length > 0 &&
    clazz.teacherAssignedContents.filter(
      (item) => item.userId === props.userId
    );

  const classWorksList = () => {
    if (subjects && myContents && myContents.length > 0) {
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
      return <div className="container padding-30">No Classwork yet</div>;
    }
  };
  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
  const classAnonouncements = () => {
    if (clazz.classAnnouncements && clazz.classAnnouncements.length > 0) {
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
                    <p>
                      {classAnnouncement.teacher &&
                        classAnnouncement.teacher.fullName}{" "}
                    </p>
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
                      {comment.student && comment.student.fullName} &nbsp;
                      <span className="small-grey">
                        {moment(comment.createdAt).fromNow()}
                      </span>
                    </p>
                    <p>{comment.text}</p>
                  </div>
                </div>
              ))}
              
              {/* {newComment &&
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
                )} */}
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
  const handlePerformance = () => {
    const data = { classId: props.match.params.classId };
    props.getPerformanceInClass(activeCourseId, data);
  };
  const subjects = [];
  clazz.relatedSubjects &&
    clazz.relatedSubjects.forEach((subject) => {
      const assignedContent = clazz.teacherAssignedContents.filter(
        (content) =>
          content.subjectId &&
          content.subjectId._id === subject._id &&
          content.userId === props.userId
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
        {clazz && clazz.schoolId && clazz.schoolId.logo ? (
          <div className="circle">
            <div
              class="logo"
              style={{
                backgroundImage: `url(${
                  clazz && clazz.schoolId && clazz.schoolId.logo
                })`,
              }}
            ></div>
          </div>
        ) : (
          <div className="circle">
            <img className="ellipse" src={ellipse} alt="ellipse"></img>
            <img className="woman" src={woman} alt="user"></img>
          </div>
        )}
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
                Resources
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
                  handlePerformance();
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
                    {clazz && clazz.schoolId && (
                      <div className="school-details">
                        <div
                          class="img"
                          style={{
                            backgroundImage: `url(${
                              clazz && clazz.schoolId && clazz.schoolId.logo
                            })`,
                          }}
                        ></div>
                        <h2>
                          {clazz && clazz.schoolId && clazz.schoolId.name}{" "}
                        </h2>
                      </div>
                    )}
                    <h2>{props.fullName && props.fullName}</h2>
                    <p>{props.email && props.email}</p>
                    <Button className="button-green button-p-20" size="sm">
                      {clazz.courseId && clazz.courseId.alias}
                    </Button>
                  </div>
                  <div className="upcoming-events">
                    <h4>Upcoming</h4>
                    {clazz.teacherAssignedContents &&
                    clazz.teacherAssignedContents.length ? (
                      <>
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
                      </>
                    ) : (
                      "Oh oh! No work due soon!"
                    )}
                  </div>
                </aside>
                <main className="container-fluid">
                  {clazz.classAnnouncements &&
                    clazz.classAnnouncements.length > 0 && (
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
                    {classAnonouncements()}
                    {clazz &&
                      clazz.teacherAssignedContents &&
                      clazz.teacherAssignedContents.length > 0 && (
                        <Link
                          to={`/classes/${clazz._id}/${
                            clazz.teacherAssignedContents &&
                            clazz.teacherAssignedContents.length
                              ? clazz.teacherAssignedContents[0].subjectId._id
                              : ""
                          }/${
                            clazz.teacherAssignedContents &&
                            clazz.teacherAssignedContents.length
                              ? clazz.teacherAssignedContents[0]._id
                              : ""
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
                      )}
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
            <TabPane tabId="5">
              <span id="performance">
                <div
                  id="performanceSecondSection"
                  className="classPer container-fluid"
                >
                  <div className="row">
                    <div className="col-md-5">
                      <span className="box">
                        <div className="row">
                          <div className="col-md-12">
                            {clazz && clazz.schoolId && (
                              <div className="school-details">
                                <div
                                  class="img"
                                  style={{
                                    backgroundImage: `url(${
                                      clazz &&
                                      clazz.schoolId &&
                                      clazz.schoolId.logo
                                    })`,
                                  }}
                                ></div>
                                <h2>
                                  {clazz &&
                                    clazz.schoolId &&
                                    clazz.schoolId.name}{" "}
                                </h2>
                              </div>
                            )}
                            <h3>{fullName.toProperCase()}</h3>
                            <p>{email}</p>
                            <span className="myBadge">{activeCourseName}</span>
                            <span className="location">
                              <img
                                src={require("../../../assets/img/location.png")}
                                alt="location"
                              />
                              &nbsp;&nbsp; {state}{" "}
                            </span>
                            <small className="underline invite">
                              {/* <Link>Invite Your Friend</Link> */}
                            </small>
                          </div>
                        </div>
                      </span>
                      <span className="box box1">
                        <div className="row">
                          <div className="col-md-12">
                            <h3>Progress</h3>
                            <p>
                              <span className="orange">☢</span> Progress level
                              per subject
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            {barChartTitles && barChartTitles.length ? (
                              <Chart
                                data={[
                                  {
                                    type: "bar",
                                    title: "Subject Progress",
                                    color: "#84BB29",
                                    points: barChart,
                                  },
                                ]}
                                keys={
                                  barChartTitles && barChartTitles.length
                                    ? barChartTitles
                                    : null
                                }
                              />
                            ) : (
                              "Loading Chart..."
                            )}
                          </div>
                        </div>
                      </span>
                    </div>
                    <div className="col-md-7">
                      <div className="row">
                        <div className="col-md-12">
                          <h3>Class Performance</h3>
                        </div>
                      </div>
                      <span className="box box1 box2">
                        <div className="row">
                          <div className="col-md-12">Overrall</div>
                        </div>
                        <div className="row bottomBorder">
                          <div className="col-md-7">
                            {overallProgress === 0 &&
                            overallPerformance === 0 ? (
                              <PieChart
                                data={[
                                  { title: "One", value: 50, color: "#50E55A" },
                                  // { title: 'Two', value: 15, color: '#FDAD51' },
                                  {
                                    title: "Three",
                                    value: 50,
                                    color: "#FF5B5B",
                                  },
                                ]}
                                lineWidth={40}
                              />
                            ) : (
                              <PieChart
                                data={[
                                  {
                                    title: "One",
                                    value: overallProgress,
                                    color: "#50E55A",
                                  },
                                  // { title: 'Two', value: 15, color: '#FDAD51' },
                                  {
                                    title: "Three",
                                    value: overallPerformance,
                                    color: "#FF5B5B",
                                  },
                                ]}
                                lineWidth={40}
                              />
                            )}
                          </div>
                          <div className="col-md-5">
                            <div className="row push2">
                              <div className="col-md-12 push1">
                                <span className="legend commitment"></span>
                                &nbsp;&nbsp; Progress:{" "}
                                {overallProgress.toFixed(2)}%
                              </div>
                              <div className="col-md-12 push1">
                                <span className="legend speed"></span>
                                &nbsp;&nbsp; Performance:{" "}
                                {overallPerformance.toFixed(2)}%
                              </div>
                              {/* <div className="col-md-12 push1">
                                 <span className="legend comprehension"></span>&nbsp;&nbsp; Comprehension: 50%
                              </div> */}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <ul>
                              <li
                                className={
                                  chartSection === "subject" ? "active" : null
                                }
                              >
                                <Link
                                  onClick={handleNavigation.bind(
                                    null,
                                    "subject"
                                  )}
                                >
                                  Subject
                                </Link>{" "}
                                {chartSection === "subject" ? (
                                  <span>
                                    <br />
                                    <hr />
                                  </span>
                                ) : null}
                              </li>
                              <li
                                className={
                                  chartSection === "pastQuestions"
                                    ? "active"
                                    : null
                                }
                              >
                                <Link
                                  onClick={handleNavigation.bind(
                                    null,
                                    "pastQuestions"
                                  )}
                                >
                                  Past Questions
                                </Link>
                                {chartSection === "pastQuestions" ? (
                                  <span>
                                    <br />
                                    <hr />
                                  </span>
                                ) : null}
                              </li>
                            </ul>
                          </div>
                        </div>
                        {chartSection === "subject" ? (
                          <>{performanceSubjectList()}</>
                        ) : chartSection === "pastQuestions" ? (
                          <>{pastQuestionsList()}</>
                        ) : null}
                      </span>
                    </div>
                  </div>
                </div>
              </span>
            </TabPane>
          </TabContent>
        </div>
      </div>
    </div>
  );
};

ClassroomStudent.propTypes = {
  getClass: PropTypes.func.isRequired,
  createComment: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired,
  getPerformanceInClass: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  clazz: state.class.class,
  classMembers: state.class.classMembers,
  userId: state.auth.userId,
  chartSection: state.auth.chartSection,
  activeCourseId: state.auth.activeCourseId,
  fullName: state.auth.fullName,
  email: state.auth.email,
  activeCourseName: state.auth.activeCourseName,
  state: state.auth.state,
  barChart: state.course.barChart,
  barChartTitles: state.course.barChartTitles,
  performance: state.course.performance,
  overallPerformance: state.course.overallPerformance,
  overallProgress: state.course.overallProgress,
});

export default connect(mapStateToProps, {
  getClass,
  createComment,
  inputChange,
  getPerformanceInClass,
})(ClassroomStudent);
