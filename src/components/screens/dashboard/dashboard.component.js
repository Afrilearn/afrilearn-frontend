import React, { useEffect, useRef, useState } from "react";
import "./css/style.css";
import Box from "./../../includes/subjectBadgeForSlick/subjectBox.component";
import PastQuestionsBox from "../../includes/pastQuestions/box.component";
import PerformanceBox from "../../includes/dashboard/performance.component";
import RecentActivitesBox from "../../includes/dashboard/recentActivityDashboard.component";
import ClassroomBox from "../../includes/dashboard/classroom.component";
import RecommendBox from "../../includes/dashboard/recommend.component";
import ResumeWatching from "../../includes/dashboard/resumeWatching.component";
import TopTen from "../../includes/dashboard/topTen.component";
import Favourite from "../../includes/dashboard/favourites.component";
import { PieChart } from "react-minimal-pie-chart";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  populateDashboard,
  inputChange,
  populateDashboardEnrolledCourses,
  populateDashboardClassMembership,
  populateDashboardRecommendations,
  populateDashboardRecentActivities,
  populateDashboardPerformanceSummary,
  populateDashboardUnfinishedVideos,
  populateDashboardTopTenVideos,
  populateDashboardFavouriteVideos,
} from "./../../../redux/actions/courseActions";
import { inputChange as authInputChange } from "./../../../redux/actions/authActions";
import { inputChange as pastQuestionInputChange } from "./../../../redux/actions/pastQuestionsActions";
import { sendClassRequest } from "./../../../redux/actions/classActions";
import { clearErrors } from "./../../../redux/actions/errorActions";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import "animate.css";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap_white.css";
import norecent from "../../../assets/img/norecent.png";
import norecommend from "../../../assets/img/norecommend.png";
import RecentActivityLoader from "../../includes/Loaders/recentActivitiesLoader.component";
import RecommendationLoader from "../../includes/Loaders/recommendationLoader.component";
import ClassesLoader from "../../includes/Loaders/classesLoader.component";
import SubjectLoader from "../../includes/Loaders/subjectListLoader.component";
import PastQuestionsLoader from "../../includes/Loaders/pastQuestionsBox.component";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import bullet from "../../../assets/img/circleBullet.png";
import logo from "../../../assets/img/logonew.png";
import { Helmet } from "react-helmet";

const Dashboard = (props) => {
  const [modal, setModal] = useState(true);
  const toggle = (e) => {
    e.preventDefault();
    setModal(!modal);
  };
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
    error,
    dashboardEnrolledCourse,
    dashboardClassMembership,
    classMembershipLoader,
    dashboardRecommendations,
    recommendationLoader,
    enrolledCourseLoader,
    dashboardRecentActivites,
    recentActivitiesLoader,
    performanceSummaryLoader,
    dashboardUnFinishedVideos,
    unFinishedVideoLoader,
    topTenVideoLoader,
    dashboardTopTenVideos,
    favouriteVideoLoader,
    dashboardFavouriteVideos,
  } = props;
  const mounted = useRef();

  useEffect(() => {
    mounted.current = true;
    window.scrollTo(0, 0);
    props.authInputChange("inClass", false);
    props.authInputChange("activeCoursePaidStatus", false);
    props.pastQuestionInputChange("nextLessonLocation", "");
    const data = {
      enrolledCourseId: activeEnrolledCourseId,
    };
    props.populateDashboardEnrolledCourses(
      activeEnrolledCourseId ? data : null
    );
    props.populateDashboardUnfinishedVideos();
    props.populateDashboardClassMembership(
      activeEnrolledCourseId ? data : null
    );
    props.populateDashboardTopTenVideos(activeEnrolledCourseId ? data : null);
    props.populateDashboardRecommendations(
      activeEnrolledCourseId ? data : null
    );
    props.populateDashboardRecentActivities(
      activeEnrolledCourseId ? data : null
    );
    props.populateDashboardPerformanceSummary(
      activeEnrolledCourseId ? data : null
    );
    props.populateDashboardFavouriteVideos(
      activeEnrolledCourseId ? data : null
    );
  }, [activeEnrolledCourseId]);

  const subjectList = () => {
    if (dashboardEnrolledCourse && dashboardEnrolledCourse.enrolledCourse) {
      let subjects =
        dashboardEnrolledCourse.enrolledCourse.courseId.relatedSubjects;
      return subjects.map((item) => {
        return (
          <Box
            image={item.mainSubjectId.imageUrl}
            singleClass={true}
            dashboard={true}
            lessons={item.relatedLessons}
            compiledNotes={item.relatedLessons.length}
            numOfUsers={dashboardEnrolledCourse.numOfUsers}
            subjectName={item.mainSubjectId.name}
            courseId={dashboardEnrolledCourse.enrolledCourse.courseId._id}
            introText={item.mainSubjectId.introText}
            courseName={dashboardEnrolledCourse.enrolledCourse.courseId.name}
            subjectId={item._id}
          />
        );
      });
    } else {
      return <h6>No subject list yet</h6>;
    }
  };

  const pastQuestionsList = () => {
    if (
      dashboardEnrolledCourse &&
      dashboardEnrolledCourse.enrolledCourse &&
      dashboardEnrolledCourse.enrolledCourse.courseId.relatedPastQuestions
        .length
    ) {
      let pastQuestions =
        dashboardEnrolledCourse.enrolledCourse.courseId.relatedPastQuestions;
      console.log(pastQuestions);
      return pastQuestions.map((item, index) => {
        return (
          <PastQuestionsBox
            title={item.pastQuestionTypes[0].name}
            other={index % 2 === 0 ? true : false}
            categoryId={item.pastQuestionTypes[0].categoryId}
            categoryName={item.pastQuestionTypes[0].name}
            image={item.pastQuestionTypes[0].imageUrl}
            description={item.pastQuestionTypes[0].description}
          />
        );
      });
    } else {
      return <h6> &nbsp;No past questions yet</h6>;
    }
  };

  const classList = () => {
    if (
      dashboardClassMembership &&
      dashboardClassMembership.classMembership &&
      dashboardClassMembership.classMembership.length
    ) {
      return dashboardClassMembership.classMembership.map((item, index) => {
        return (
          <ClassroomBox
            bullet2={index % 2 === 0 ? true : false}
            id={item._id}
            className={item?.classId?.name}
            classId={item?.classId?._id}
            classCode={item?.classId?.classCode}
            teacher={item?.classId?.userId && item?.classId?.userId.fullName}
            item={item}
          />
        );
      });
    } else {
      return (
        <div className="empty-class-state">
          <span className="pink-dot"></span>
          <p>You have not joined any classroom</p>
        </div>
      );
    }
  };

  const recommendationList = () => {
    if (
      dashboardRecommendations &&
      dashboardRecommendations.recommendation &&
      dashboardRecommendations.recommendation.length
    ) {
      let recommend = dashboardRecommendations.recommendation;
      // eslint-disable-next-line array-callback-return
      return recommend.map((item, index) => {
        if (index < 3 && item.recommended) {
          return (
            <RecommendBox
              pastQuestions={item.type === "lesson" ? false : true}
              title={item.reason && item.reason.title}
              recommend={item.recommended && item.recommended.title}
              recommended={item.recommended && item.recommended}
            />
          );
        }
      });
    } else {
      return (
        <div className="empty-class-state-2">
          <img src={norecommend} /> <p>Start learning to get recommendations</p>
        </div>
      );
    }
  };

  const recentActivitiesList = () => {
    if (
      dashboardRecentActivites &&
      dashboardRecentActivites.recentActivities &&
      dashboardRecentActivites.recentActivities.length
    ) {
      let activity = dashboardRecentActivites.recentActivities;
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
      return (
        <div className="empty-class-state-2">
          <img src={norecent} />{" "}
          <p>You currently do not have any recorded recent activities</p>
        </div>
      );
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
        if (counter < 6) {
          ++counter;
          return <ResumeWatching item={item} />;
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
    if (dashboardTopTenVideos.lessons && dashboardTopTenVideos.lessons.length) {
      // eslint-disable-next-line array-callback-return
      let counter = 0;
      return dashboardTopTenVideos.lessons.map((item, index) => {
        if (counter < 6) {
          ++counter;
          return <TopTen item={item} />;
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
    if (dashboardFavouriteVideos && dashboardFavouriteVideos.length) {
      let counter = 0;
      // eslint-disable-next-line array-callback-return
      return dashboardFavouriteVideos.map((item, index) => {
        if (counter < 6) {
          ++counter;
          return <Favourite item={item} />;
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

  if (
    error.id === "SEND_CLASS_REQUEST_SUCCESS" ||
    error.id === "SEND_CLASS_REQUEST_FAILURE"
  ) {
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

  const handleJoinClass = async (e) => {
    // e.preventDefault();
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
      // Swal.fire(
      //   "Your request to join the class will be sent to the class teacher for approval"
      // );
    }
  };

  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  return (
    <span id="classes" className="dashboard">
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {dashboardEnrolledCourse.enrolledCourse
            ? dashboardEnrolledCourse.enrolledCourse.courseId.name +
              " | Myafrilearn.com"
            : "Welcome"}
        </title>
        <meta name="description" content="Student Dashboard" />
      </Helmet>
      <div id="dashboardFirstSection" className="container-fluid relative">
        <div className="row">
          <div className="col-md-12">
            <h1>
              {enrolledCourseLoader
                ? "Welcome!"
                : // <img
                //   className="social"
                //   src={require("../../../assets/img/loading.gif")}
                //   alt="google"
                // />
                dashboardEnrolledCourse.enrolledCourse
                ? dashboardEnrolledCourse.enrolledCourse.courseId.name
                : "Welcome"}
            </h1>
          </div>
        </div>
        <div className="row push2 mobileCenter">
          <div className="col-md-12">
            <h2 className="boldFont">Welcome {fullName.toProperCase()}!</h2>
            <p>Explore the fun in learning💃</p>
          </div>
        </div>
        <div className="row push2"></div>
        <div className="row push2 push3">
          <div className="col-md-12">
            <a href="#subjects">My Subjects</a> &nbsp;|&nbsp;{" "}
            <a href="#pastQuestions">Past Questions</a> &nbsp;|&nbsp;{" "}
            <a href="#resumePlaying">Resume Watching</a> &nbsp;|&nbsp;{" "}
            <a href="#topTen">Top Ten Video</a> &nbsp;|&nbsp;{" "}
            <a href="#performance">Performance Summary</a> &nbsp;|&nbsp;{" "}
            <a href="#classroom">Classroom</a> &nbsp;|&nbsp;{" "}
            <a href="#favourite">My Favourite</a> &nbsp;|&nbsp;{" "}
            <a href="#recommendations">Recommendations</a>
            &nbsp;|&nbsp; <a href="#recentActivities">Recent Activities</a>
          </div>
        </div>
      </div>
      <div id="dashboardSecondSection" className="container-fluid relative">
        <a name="subjects"></a>
        <h4>My Subjects</h4>
        {activeEnrolledCourseId && enrolledCourseLoader ? (
          <SubjectLoader />
        ) : (
          <div className="row">{subjectList()}</div>
        )}
        <a name="pastQuestions"></a>
        <h4 className="push5">Past Questions</h4>
        {activeEnrolledCourseId && enrolledCourseLoader ? (
          <PastQuestionsLoader />
        ) : (
          <div className="row jj">{pastQuestionsList()}</div>
        )}
        <a name="resumePlaying"></a>
        <h4 className="push5 resumePlayingBox">Resume Watching</h4>
        <div className="row push10 resumePlaying resumePlayingDashboard">
          {unFinishedVideoLoader ? <SubjectLoader /> : unFinishedVideosList()}
        </div>

        <a name="topTen"></a>
        <h4 className="push5 resumePlayingBox">
          Top Ten Lessons{" "}
          <small className="showAll">
            <Link to="/more-info?section=topTen">Show all</Link>
          </small>
        </h4>
        <div className="row push10 resumePlaying myTopTen resumePlayingDashboard">
          {topTenVideoLoader ? <SubjectLoader /> : topTenList()}
        </div>

        <a name="performance"></a>
        <h4 className="push5">Performance Summary</h4>
        {activeEnrolledCourseId && performanceSummaryLoader ? (
          <RecentActivityLoader />
        ) : (
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
                  { title: "Excelling", value: excelling, color: "#84BB29 " },
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
        {classMembershipLoader ? <ClassesLoader /> : classList()}

        <a name="favourite"></a>
        <h4 className="push5 resumePlayingBox">
          My Fav{" "}
          <small className="showAll">
            <Link to="/more-info?section=favourites">Show all</Link>
          </small>
        </h4>
        <div className="row push10 resumePlaying myTopTen resumePlayingDashboard">
          {favouriteVideoLoader ? <SubjectLoader /> : favouriteList()}
        </div>

        <a name="recommendations"></a>
        <h4 className="push5">Recommendations</h4>
        {recommendationLoader ? <RecommendationLoader /> : recommendationList()}

        <a name="recentActivities"></a>
        <h4 className="push5">Recent Activities</h4>
        {recentActivitiesLoader ? (
          <RecentActivityLoader />
        ) : (
          recentActivitiesList()
        )}
      </div>
      {/* <Modal isOpen={modal} toggle={toggle} className="trendingModalClass">
        <ModalHeader toggle={toggle}>
          <img
            src={logo}
            alt="downloadMobileHeader"
            className="downloadMobileHeader"
          />
        </ModalHeader>
        <ModalBody>
          <div className="container downloadMobile">
            <div className="row">
              <div className="col-md-12 head1">
                Download the Afrilearn mobile App to enjoy more fun features
                such as:
              </div>
            </div>
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-8">
                <div className="row myRow">
                  <div className="col-1 desktopOnly">
                    <img src={bullet} alt="bullet" />
                  </div>
                  <div className="col-11">
                    <span>
                      Gamified learning challenge with friends to win weekly
                      cash prizes
                    </span>
                  </div>
                </div>
                <div className="row myRow">
                  <div className="col-1 desktopOnly">
                    <img src={bullet} alt="bullet" />
                  </div>
                  <div className="col-11">
                    <span>
                      Full access to 50,000+ practice tests & solutions with
                      instant results
                    </span>
                  </div>
                </div>
                <div className="row myRow">
                  <div className="col-1 desktopOnly">
                    <img src={bullet} alt="bullet" />
                  </div>
                  <div className="col-11">
                    <span>
                      Pass WAEC, JAMB-UTME, NECO, BECE & more in one sitting
                    </span>
                  </div>
                </div>
                <div className="row myRow">
                  <div className="col-1 desktopOnly">
                    <img src={bullet} alt="bullet" />
                  </div>
                  <div className="col-11">
                    <span>
                      Get online Homework Help with instant solutions from
                      expert tutors
                    </span>
                  </div>
                </div>
                <div className="row myRow">
                  <div className="col-1 desktopOnly">
                    <img src={bullet} alt="bullet" />
                  </div>
                  <div className="col-11">
                    <span>
                      Discover your areas of strength with real-time analytics
                      tools
                    </span>
                  </div>
                </div>
                <div className="row myRow">
                  <div className="col-1 desktopOnly">
                    <img src={bullet} alt="bullet" />
                  </div>
                  <div className="col-11">
                    <span>
                      Secure university admission and achieve unlimited success
                      in life
                    </span>
                  </div>
                </div>
                <div className="row myRow">
                  <div className="col-md-12">
                    <span className="myRow1">
                      Download the App for free to start winning now!
                    </span>
                  </div>
                </div>
                <div className="row myRow">
                  <div className="col-6">
                    <a
                      href="https://play.google.com/store/apps/details?id=com.afrilearn"
                      target="_blank"
                    >
                      <img
                        className=""
                        src={require("../../../assets/img/playstore.png")}
                        alt="playstore"
                      />
                    </a>
                  </div>
                  <div className="col-6">
                    <a  href="https://apps.apple.com/ng/app/afrilearn/id1587978653"
                      target="_blank">
                      {" "}
                      <img
                        className=""
                        src={require("../../../assets/img/applestore.png")}
                        alt="applestore"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>
        </ModalBody>
        </Modal> */}
      {/* <ModalFooter>
          <Button color="primary"> <Link to="/register">Register for Free</Link></Button>         
        </ModalFooter> */}
    </span>
  );
};

Dashboard.propTypes = {
  populateDashboard: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired,
  sendClassRequest: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  populateDashboardEnrolledCourses: PropTypes.func.isRequired,
  populateDashboardClassMembership: PropTypes.func.isRequired,
  populateDashboardRecommendations: PropTypes.func.isRequired,
  populateDashboardRecentActivities: PropTypes.func.isRequired,
  populateDashboardPerformanceSummary: PropTypes.func.isRequired,
  populateDashboardUnfinishedVideos: PropTypes.func.isRequired,
  populateDashboardTopTenVideos: PropTypes.func.isRequired,
  populateDashboardFavouriteVideos: PropTypes.func.isRequired,
  pastQuestionInputChange: PropTypes.func.isRequired,
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
  error: state.error,
  enrolledCourseLoader: state.course.enrolledCourseLoader,
  dashboardEnrolledCourse: state.course.dashboardEnrolledCourse,
  dashboardClassMembership: state.course.dashboardClassMembership,
  classMembershipLoader: state.course.classMembershipLoader,
  dashboardRecommendations: state.course.dashboardRecommendations,
  recommendationLoader: state.course.recommendationLoader,
  dashboardRecentActivites: state.course.dashboardRecentActivites,
  recentActivitiesLoader: state.course.recentActivitiesLoader,
  performanceSummaryLoader: state.course.performanceSummaryLoader,
  dashboardUnFinishedVideos: state.course.dashboardUnFinishedVideos,
  unFinishedVideoLoader: state.course.unFinishedVideoLoader,
  topTenVideoLoader: state.course.topTenVideoLoader,
  dashboardTopTenVideos: state.course.dashboardTopTenVideos,
  favouriteVideoLoader: state.course.favouriteVideoLoader,
  dashboardFavouriteVideos: state.course.dashboardFavouriteVideos,
});

export default connect(mapStateToProps, {
  populateDashboard,
  inputChange,
  sendClassRequest,
  authInputChange,
  clearErrors,
  populateDashboardEnrolledCourses,
  populateDashboardClassMembership,
  populateDashboardRecommendations,
  populateDashboardRecentActivities,
  populateDashboardPerformanceSummary,
  pastQuestionInputChange,
  populateDashboardUnfinishedVideos,
  populateDashboardTopTenVideos,
  populateDashboardFavouriteVideos,
})(Dashboard);
