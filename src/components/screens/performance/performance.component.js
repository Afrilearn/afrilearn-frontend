import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { PieChart } from "react-minimal-pie-chart";
import "./css/style.css";
import Chart from "r-chart";
import { connect } from "react-redux";
import { inputChange } from "./../../../redux/actions/authActions";
import {
  getPerformance,
  getPerformanceInClass,
  populateSubjectProgressPerformance,
  populateSubjectQuizPerformance,
  populateSubjectPastQuestionsPerformance
} from "./../../../redux/actions/courseActions";
import PropTypes from "prop-types";
import SubjectBox from "./../../includes/performance/subjectBox.component";
import PastQuestionBox from "./../../includes/performance/pastQuestions.component";
import SubjectProgressLoader from '../../includes/Loaders/subjectProgressLoader.component';

const Performance = (props) => {
  const {
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
    inClass,
    clazz,
    targetUser,
    populateSubjectProgressPerformanceLoader,
    quizPerformance,
    populateSubjectQuizPerformanceLoader,
    populateSubjectPastQuestionPerformanceLoader,
    pastQuestionPeformance,
  } = props;

  const mounted = useRef(); 
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      window.scrollTo(0, 0);

      // const data = { classId: clazz? clazz._id:null };
      const data = { };

      if (targetUser) {
        data.userId = targetUser._id;
      }
           
      props.populateSubjectProgressPerformance(activeCourseId, data)
      props.populateSubjectQuizPerformance(activeCourseId, data)
      props.populateSubjectPastQuestionsPerformance(activeCourseId, data)
      
      
    } else {
      // do componentDidUpdate logic
    }
  });

  const handleNavigation = (section, e) => {
    e.preventDefault();
    props.inputChange("chartSection", section);
  };

  const subjectList = () => {
    if (quizPerformance.subjectsList && quizPerformance.subjectsList.length) {
      let subjects = quizPerformance.subjectsList;
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
    if (pastQuestionPeformance.examsList && pastQuestionPeformance.examsList.length) {
      let exam = pastQuestionPeformance.examsList;
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

  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  return (
    <span id="performance">
      <div
        id="performanceFirstSection"
        className="container-fluid relative"
      ></div>
      <div id="performanceSecondSection" className="container-fluid">
        <div className="row">
          <div className="col-md-5">
            <div className="row">
              <div className="col-md-12">
                <img
                  className="ring"
                  src={require("../../../assets/img/profile circle.svg")}
                  alt="profilePix"
                />
                <img
                  className="ring ring1"
                  src={require("../../../assets/img/woman.png")}
                  alt="profilePix"
                />
              </div>
            </div>
            <span className="box">
              <div className="row">
                <div className="col-md-12">
                  <h3>
                    {targetUser
                      ? targetUser.fullName.toUpperCase()
                      : fullName.toProperCase()}
                  </h3>
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
                    <Link>Invite Your Friend</Link>
                  </small>
                </div>
              </div>
            </span>
            <span className="box box1">
              <div className="row">
                <div className="col-md-12">
                  <h3>Progress</h3>
                  <p>
                    <span className="orange">☢</span> Progress level per subject
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                 {populateSubjectProgressPerformanceLoader? <SubjectProgressLoader/>:
                  <>                    
                    <Chart
                      data={[
                        {
                          type: "bar",
                          title: "Subject Progress",
                          color: "#84BB29",
                          points: barChart,
                        },
                      ]}
                      keys={barChartTitles}
                    />                   
                  </>
                 }                  
                </div>
              </div>
            </span>
          </div>
          <div className="col-md-7">
            <div className="row">
              <div className="col-md-12">
                <h3>Performance Analysis</h3>
              </div>
            </div>
            <span className="box box1 box2">             
              <div className="row">
                <div className="col-md-12">
                  <ul>
                    <li
                      className={chartSection === "subject" ? "active" : null}
                    >
                      <Link onClick={handleNavigation.bind(null, "subject")}>
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
                        chartSection === "pastQuestions" ? "active" : null
                      }
                    >
                      <Link
                        onClick={handleNavigation.bind(null, "pastQuestions")}
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
                <>{populateSubjectQuizPerformanceLoader? <SubjectProgressLoader/>: subjectList()} </>
              ) : chartSection === "pastQuestions" ? (
                <>{populateSubjectPastQuestionPerformanceLoader? <SubjectProgressLoader/>: pastQuestionsList()} </>
              ) : null}
            </span>
          </div>
        </div>
      </div>
    </span>
  );
};

Performance.propTypes = {
  inputChange: PropTypes.func.isRequired,
  getPerformance: PropTypes.func.isRequired,
  getPerformanceInClass: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  chartSection: state.auth.chartSection,
  activeCourseId: state.auth.activeCourseId,
  fullName: state.auth.fullName,
  email: state.auth.email,
  targetUser: state.auth.targetUser,
  inClass: state.auth.inClass,
  clazz: state.class.class,
  activeCourseName: state.auth.activeCourseName,
  state: state.auth.state,
  barChart: state.course.barChart,
  barChartTitles: state.course.barChartTitles,
  performance: state.course.performance,
  overallPerformance: state.course.overallPerformance,
  overallProgress: state.course.overallProgress,
  populateSubjectProgressPerformanceLoader: state.course.populateSubjectProgressPerformanceLoader,
  quizPerformance: state.course.quizPerformance,
  populateSubjectQuizPerformanceLoader: state.course.populateSubjectQuizPerformanceLoader,
  populateSubjectPastQuestionPerformanceLoader: state.course.populateSubjectPastQuestionPerformanceLoader,
  pastQuestionPeformance: state.course.pastQuestionPeformance,
});
export default connect(mapStateToProps, {
  inputChange,
  getPerformance,
  getPerformanceInClass,
  populateSubjectProgressPerformance,
  populateSubjectQuizPerformance,
  populateSubjectPastQuestionsPerformance
})(Performance);
