import React, { useEffect, useRef } from "react";
import "./css/style.css";
import Box from "./../../includes/subjectBadgeForSlick/subjectBox.component";
import PastQuestionsBox from "../../includes/pastQuestions/box.component";
import PerformanceBox from "../../includes/dashboard/performance.component";
import RecentActivitesBox from "../../includes/dashboard/recentActivities.component";
import ClassroomBox from "../../includes/dashboard/classroom.component";
import RecommendBox from "../../includes/dashboard/recommend.component";
import { PieChart } from "react-minimal-pie-chart";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  populateDashboard,
  inputChange,
} from "./../../../redux/actions/courseActions";
import { inputChange as authInputChange } from "./../../../redux/actions/authActions";
import { sendClassRequest } from "./../../../redux/actions/classActions";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import "animate.css";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap_white.css";

const Dashboard = (props) => {
  const {
    activeEnrolledCourseId,
    dashboardData,
    fullName,
    excelling,
    average,
    belowAverage,
    noRating,
    excellingText,
    averageText,
    belowAverageText,
    noRatingText,
    course,
    isLoading,
  } = props;
  const mounted = useRef();

  useEffect(() => {
    // if (!mounted.current) {
    // do componentDidMount logic
    mounted.current = true;
    window.scrollTo(0, 0);
    props.authInputChange("inClass", false);
    props.authInputChange("activeCoursePaidStatus", false);
    const data = {
      enrolledCourseId: activeEnrolledCourseId,
    };
    props.populateDashboard(activeEnrolledCourseId ? data : null);
    // } else {
    // do componentDidUpdate logic
    // }
  }, [activeEnrolledCourseId]);

  const subjectList = () => {
    if (
      Object.keys(dashboardData).length &&
      dashboardData.enrolledCourse &&
      Object.keys(dashboardData.enrolledCourse).length
    ) {
      let subjects = dashboardData.enrolledCourse.courseId.relatedSubjects;
      return subjects.map((item) => {
        return (
          <Box
            image={item.mainSubjectId.imageUrl}
            singleClass={true}
            dashboard={true}
            compiledNotes={item.relatedLessons.length}
            registeredUsers={50000}
            subjectName={item.mainSubjectId.name}
            courseId={dashboardData.enrolledCourse.courseId._id}
            introText={item.mainSubjectId.introText}
            courseName={dashboardData.enrolledCourse.courseId.name}
            subjectId={item._id}
          />
        );
      });
    } else {
      return <h6>No Subject list yet</h6>;
    }
  };

  const pastQuestionsList = () => {
    if (
      Object.keys(dashboardData).length &&
      dashboardData.enrolledCourse &&
      Object.keys(dashboardData.enrolledCourse.courseId.relatedPastQuestions)
        .length
    ) {
      let pastQuestions =
        dashboardData.enrolledCourse.courseId.relatedPastQuestions;
      return pastQuestions.map((item, index) => {
        return (
          <PastQuestionsBox
            title={item.pastQuestionTypes[0].name}
            other={index % 2 === 0 ? true : false}
            categoryId={item.pastQuestionTypes[0].categoryId}
            categoryName={item.pastQuestionTypes[0].name}
          />
        );
      });
    } else {
      return <h6>No past questions yet</h6>;
    }
  };

  const classList = () => {
    if (
      Object.keys(dashboardData).length &&
      dashboardData.classMembership.length
    ) {
      return dashboardData.classMembership.map((item, index) => {
        return (
          <ClassroomBox
            bullet2={index % 2 === 0 ? true : false}
            id={item._id}
            className={item.classId.name}
            classId={item.classId._id}
            classCode={item.classId.classCode}
            teacher={item.classId.userId && item.classId.userId.fullName}
            item={item}
          />
        );
      });
    } else {
      return (
        <h6>
          Enter your Class Code to attend a class and interact with top
          Educators.
        </h6>
      );
    }
  };

  const recommendationList = () => {
    if (
      Object.keys(dashboardData).length &&
      dashboardData.recommendation.length
    ) {
      let recommend = dashboardData.recommendation;
      // eslint-disable-next-line array-callback-return
      return recommend.map((item, index) => {
        if (index < 3) {
          return (
            <RecommendBox
              pastQuestions={item.type === "lesson" ? false : true}
              title={item.reason.title}
              recommend={item.recommended.title}
              recommended={item.recommended}
            />
          );
        }
      });
    } else {
      return <h6>No recommendations yet</h6>;
    }
  };

  const recentActivitiesList = () => {
    if (
      Object.keys(dashboardData).length &&
      dashboardData.recentActivities.length
    ) {
      let activity = dashboardData.recentActivities;
      // eslint-disable-next-line array-callback-return
      return activity.map((item, index) => {
        if (index < 3) {
          return (
            <RecentActivitesBox
              category={item.type}
              title={item.lessonId && item.lessonId.title}
              subject={
                item.lessonId && item.lessonId.subjectId.mainSubjectId.name
              }
              excel={index % 2 === 0 ? true : false}
              time={item.createdAt}
            />
          );
        }
      });
    } else {
      return <h6>No captured recent activities</h6>;
    }
  };

  const handleJoinClass = async (e) => {
    e.preventDefault();
    const { value: ipAddress } = await Swal.fire({
      title: "Enter the class code below",
      input: "text",
      inputLabel: "",
      inputValue: "",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Enter class code!";
        }
      },
    });

    if (ipAddress) {
      props.sendClassRequest(ipAddress);
      Swal.fire(
        "Your request to join the class will be sent to the class teacher for approval"
      );
    }
  };
  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
  return (
    <span id="classes" className="dashboard">
      <div id="dashboardFirstSection" className="container-fluid relative">
        <div className="row">
          <div className="col-md-12">
            <h1>
              {isLoading ? (
                <img
                  className="social"
                  src={require("../../../assets/img/loading.gif")}
                  alt="google"
                />
              ) : dashboardData.enrolledCourse ? (
                dashboardData.enrolledCourse.courseId.name
              ) : (
                "Welcome"
              )}
            </h1>
          </div>
        </div>
        <div className="row push2 mobileCenter">
          <div className="col-md-12">
            <h2 className="boldFont">Welcome {fullName.toProperCase()}</h2>
            <p>Explore the fun in learning!</p>
          </div>
        </div>
        <div className="row push2"></div>
        <div className="row push2 push3">
          <div className="col-md-12">
            <a href="#subjects">My Subjects</a> &nbsp;|&nbsp;{" "}
            <a href="#pastQuestions">Past Questions</a> &nbsp;|&nbsp;{" "}
            <a href="#performance">Performance Summary</a> &nbsp;|&nbsp;{" "}
            <a href="#classroom">Classroom</a> &nbsp;|&nbsp;{" "}
            <a href="#recommendations">Recommendations</a>
            &nbsp;|&nbsp; <a href="#recentActivities">Recent Activities</a>
          </div>
        </div>
      </div>
      <div id="dashboardSecondSection" className="container-fluid relative">
        {Object.keys(dashboardData).length && dashboardData.enrolledCourse ? (
          <>
            <a name="subjects"></a>
            <h4>My Subjects</h4>
            <div className="row">{subjectList()}</div>
            <a name="pastQuestions"></a>
            <h4 className="push5">Past Questions</h4>
            <div className="row jj">{pastQuestionsList()}</div>
            <a name="performance"></a>
            <h4 className="push5">Performance Summary</h4>
            <div className="row">
              <div className="col-md-4 myChart">
                <PieChart
                  data={[
                    {
                      title: "Below Average",
                      value: belowAverage,
                      color: "#FF5B5B",
                    },
                    { title: "Average", value: average, color: "#FDAD51" },
                    { title: "No Rating", value: noRating, color: "#908989" },
                    { title: "Excelling", value: excelling, color: "#1B7763" },
                  ]}
                  lineWidth={32}
                  rounded
                />
              </div>
              <div className="col-md-8 subjectList">
                <PerformanceBox
                  excel={true}
                  title="Excelling In"
                  data={excellingText}
                />
                <PerformanceBox
                  average={true}
                  title="Average In"
                  data={averageText}
                />
                <PerformanceBox
                  belowAverage={true}
                  title="Below Average In"
                  data={belowAverageText}
                />
                <PerformanceBox
                  noRating={true}
                  title="No rating"
                  data={noRatingText}
                />
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        <a name="classroom"></a>
        <h4 className="push5">Classroom</h4>
        <div className="row push8">
          <div className="col-md-12 right underline">
            <Tooltip
              placement="top"
              trigger={["hover"]}
              overlay={
                <span>
                  Enter your Class Code to attend a class and interact with top
                  Educators.
                </span>
              }
            >
              <Link onClick={handleJoinClass}>Join A Classroom</Link>
            </Tooltip>
          </div>
        </div>
        {isLoading ? (
          <img
            className="centerImage"
            src={require("../../../assets/img/loading.gif")}
            alt="google"
          />
        ) : (
          classList()
        )}
        <a name="recommendations"></a>
        <h4 className="push5">Recommendations</h4>
        {isLoading ? (
          <img
            className="centerImage"
            src={require("../../../assets/img/loading.gif")}
            alt="google"
          />
        ) : (
          recommendationList()
        )}
        <a name="recentActivities"></a>
        <h4 className="push5">Recent Activities</h4>
        {isLoading ? (
          <img
            className="centerImage"
            src={require("../../../assets/img/loading.gif")}
            alt="google"
          />
        ) : (
          recentActivitiesList()
        )}
      </div>
    </span>
  );
};

Dashboard.propTypes = {
  populateDashboard: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired,
  sendClassRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeEnrolledCourseId: state.auth.activeEnrolledCourseId,
  dashboardData: state.course.dashboardData,
  fullName: state.auth.fullName,
  excelling: state.course.excelling,
  average: state.course.average,
  belowAverage: state.course.belowAverage,
  noRating: state.course.noRating,
  excellingText: state.course.excellingText, 
  course: state.course.course,
  averageText: state.course.averageText,
  belowAverageText: state.course.belowAverageText,
  noRatingText: state.course.noRatingText,
  isLoading: state.course.isLoading,
});

export default connect(mapStateToProps, {
  populateDashboard,
  inputChange,
  sendClassRequest,
  authInputChange,
})(Dashboard);
