import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import homepage from "../screens/homepage/homePage.component";
import about from "../screens/about/about.component";
import partnership from "../screens/partnership/partnership.component";
import contact from "../screens/contact/contact.component";
import classes from "../screens/classes/classes.component";
import classPage from "../screens/class/class.component";
import content from "../screens/content/content.component";
import lessonPage from "../screens/lessonPage/lessonPage.component";
import register from "../screens/signup/signup.component";
import login from "../screens/login/login.component";
import resetPassword from "../screens/resetPassword/resetPassword.component";
import changePassword from "../screens/changePassword/changePassword.component";
import profilePage from "../screens/profile/profile.component";
import classroomStudent from "../screens/classroomStudent/classroomStudent.component";
import classWork from "../screens/classWork/classWork.component";
import quizPage from "../screens/quizPage/quizPage.component";
import dashboard from "../screens/dashboard/dashboard.component";
import selectPayment from "../screens/selectPayment/selectPayment.component";
import pastQuestions from "../screens/pastQuestions/pastQuestions.component";
import pastQuestionsInstruction from "../screens/pastQuestions/instructions/instructions.component";
import pastQuestionsRemark from "../screens/pastQuestions/review/review.component";
import pastQuestionExamPage from "../screens/pastQuestions/exam/exam.component";
import myStudents from "../screens/myStudents/myStudents.component";
import classroomTeacherComponent from "../screens/classroomTeacher/classroomTeacher.component";
import assignContent from "../screens/assignContent/assignContent.component";
import performance from "../screens/performance/performance.component";
import socialLogin from "../screens/socialLogin/socialLogin.component";
import { inputChange, logout } from "./../../redux/actions/authActions";
import PropTypes from "prop-types";
import subject from "../screens/subject/subject.component";
import joinClassComponent from "../screens/joinClass/joinClass.component";
import SearchPage from "../screens/searchResult/searchResult.component";
import classNote from "../screens/classnote/classnote.component";
import SearchDetails from "../screens/search/search.component";
import PrivacyPolicy from "../screens/privacyPolicy/privacyPolicy";
import TextToSpeech from "../includes/textToSpeech/textToSpeech.component";
import ParentChildRegistration from "../screens/parentChildRegistration/parentChildRegistration.component";
import {
  searchInputChange,
  getSearchResults,
} from "./../../redux/actions/searchActions";
import { populateDashboard } from "./../../redux/actions/courseActions";
import faqPageComponent from "../screens/faqPage/faqPage.component";
import ChildrenList from "../screens/childrenList/childrenList.component";
import ParentDashboard from "../screens/parentDashboard/parentDashboard.component";
import SchoolDashboard from "../screens/schoolDashboard/schoolDashboard.component";
import ParentPerformance from "../screens/parentPerformance/parentPerformance.component";
import ParentTimedPerformance from "../screens/parentTimedPerformance/parentTimedPerformance.component";
import SchoolProfile from "../screens/schoolProfile/schoolProfile.component";
import EditSchoolProfile from "../screens/schoolProfile/editSchoolProfile.component";
import SchoolAddTeacher from "../screens/schoolAddTeacher/addTeacher.component";
import SchoolAddStudent from "../screens/schoolAddStudent/addStudent.component";
import AcceptRequests from "../screens/acceptRequests/acceptRequests.component";
import SchoolPeople from "../screens/schoolPeople/schoolPeople.component";
import Favourite from "../screens/favourite/favourite.component";
import schoolAddAdminComponent from "../screens/schoolAddAdmin/schoolAddAdmin.component";
import Feeds from "../screens/feeds/feeds.component";
import ProtectedRoute from "../includes/protectedRoute.component";
import Analytics from "../../analytics";
import Stories from "../screens/customerStories/customerStories.component";
import faculties from "../screens/faculties/faculties.component";
import ViewImpactStory from "../screens/customerStories/viewStory.component";
// import ExamLog from "../screens/examLog/examLog";
// import ExamResults from "../screens/ExamResults/ExamResults";
import ExamResult from "../screens/exam/ExamResult/ExamResult";
import AddExam from "../screens/exam/AddExam/AddExam";
import ExamResults from "../screens/exam/ExamResults/ExamResults";
import ExamLog from "../screens/exam/examLog/examLog";
import AddExamQuestion from "../screens/exam/AddExamQuestion/AddExamQuestion";

const MyNav = (props) => {
  const {
    user,
    role,
    inClass,
    keyword,
    isAuthenticated,
    isSearching,
    searchResults,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    props.logout();
    setIsOpen(false);
  };

  const updateactiveEnrolledCourseId = (
    id,
    courseId,
    courseName,
    paymentStatus
  ) => {
    props.inputChange("activeEnrolledCourseId", id);
    props.inputChange("activeCourseId", courseId);
    props.inputChange("activeCourseName", courseName);
    props.inputChange("paymentIsActive", paymentStatus);
  };

  const classList = () => {
    if (
      user &&
      user.enrolledCourses.length &&
      role === "5fd08fba50964811309722d5"
    ) {
      return user.enrolledCourses.map((item) => {
        return (
          <DropdownItem
            onClick={() => {
              updateactiveEnrolledCourseId.bind(
                null,
                item._id,
                item.courseId._id,
                item.courseId.name,
                item.paymentIsActive
              );
              props.inputChange("inClass", false);
              props.inputChange("activeEnrolledCourseId", item._id);
              setIsOpen(false);
            }}
            tag={Link}
            to="/dashboard"
          >
            <span>
              <img
                src={require("./../../assets/img/profile.svg")}
                alt="profile"
                className="dropDownIcon"
              />{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.courseId.name}
            </span>
          </DropdownItem>
        );
      });
    } else if (
      user &&
      user.classOwnership.length > 0 &&
      role === "602f3ce39b146b3201c2dc1d"
    ) {
      return user.classOwnership.map((item) => {
        return (
          <div>
            <DropdownItem
              onClick={() => {
                updateactiveEnrolledCourseId.bind(
                  null,
                  item._id,
                  item.enrolledCourse && item.enrolledCourse._id,
                  item.name,
                  item.enrolledCourse && item.enrolledCourse.paymentIsActive
                );
                props.inputChange("activeEnrolledCourseId", item._id);
                props.inputChange("activeCourseId", item.courseId);
                props.inputChange("activeCourseName", item.name);
                props.inputChange(
                  "paymentIsActive",
                  item &&
                    item.enrolledCourse &&
                    item.enrolledCourse.paymentIsActive
                );
                props.inputChange("inClass", true);
                setIsOpen(false);
              }}
              tag={Link}
              to="/classes/teacher"
            >
              <span>
                <img
                  src={require("./../../assets/img/profile.svg")}
                  alt="profile"
                  className="dropDownIcon"
                />{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.name}
              </span>
            </DropdownItem>
            {user &&
              user.adminRoles.length > 0 &&
              role === "602f3ce39b146b3201c2dc1d" &&
              user.adminRoles.map((item) => (
                <DropdownItem
                  onClick={() => {
                    updateactiveEnrolledCourseId.bind(
                      null,
                      item.classId && item.classId._id,
                      item.classId &&
                        item.classId.enrolledCourse &&
                        item.classId.enrolledCourse._id,
                      item.classId && item.classId.name,
                      item.classId &&
                        item.classId.enrolledCourse &&
                        item.classId.enrolledCourse.paymentIsActive
                    );
                    props.inputChange(
                      "activeEnrolledCourseId",
                      item.classId && item.classId._id
                    );
                    props.inputChange(
                      "activeCourseId",
                      item.classId && item.classId.courseId
                    );
                    props.inputChange(
                      "activeCourseName",
                      item.classId && item.classId.name
                    );
                    props.inputChange(
                      "paymentIsActive",
                      item.classId &&
                        item.classId.enrolledCourse &&
                        item.classId.enrolledCourse.paymentIsActive
                    );
                    props.inputChange("inClass", true);
                    setIsOpen(false);
                  }}
                  tag={Link}
                  to="/classes/teacher"
                >
                  <span>
                    <img
                      src={require("./../../assets/img/profile.svg")}
                      alt="profile"
                      className="dropDownIcon"
                    />{" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {item.classId && item.classId.name}
                  </span>
                </DropdownItem>
              ))}
          </div>
        );
      });
    } else {
      {
        user &&
          user.adminRoles.length > 0 &&
          role === "602f3ce39b146b3201c2dc1d" &&
          user.adminRoles.map((item) => (
            <DropdownItem
              onClick={() => {
                updateactiveEnrolledCourseId.bind(
                  item.classId &&
                    item.classId.enrolledCourse &&
                    item.classId.enrolledCourse._id,
                  item.classId &&
                    item.classId.enrolledCourse &&
                    item.classId.enrolledCourse.courseId,

                  item.classId && item.classId.name,
                  item.classId &&
                    item.classId.enrolledCourse &&
                    item.classId.enrolledCourse.paymentIsActive
                );
                props.inputChange("inClass", true);
                setIsOpen(false);
              }}
              tag={Link}
              to="/classes/teacher"
            >
              <span>
                <img
                  src={require("./../../assets/img/profile.svg")}
                  alt="profile"
                  className="dropDownIcon"
                />{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {item.classId && item.classId.name}
              </span>
            </DropdownItem>
          ));
      }
    }
  };

  const handleSearchClick = (title) => {
    setIsOpen(false);
    props.searchInputChange("keyword", "");
    props.searchInputChange("title", title);
    props.getSearchResults(title, true);
  };

  const sentenceCase = (str) => {
    let s = str.toLowerCase();
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const searchResult = () => {
    if (searchResults.length > 0) {
      return searchResults.map((item) => {
        return (
          <Link
            to="/search-details"
            onClick={handleSearchClick.bind(null, item.title)}
          >
            <li>
              <img
                className="searchIcon1"
                src={require("../../assets/img/search.png")}
                alt="Afrilearn Search"
              />
              {sentenceCase(item.title.substr(0, 30))}
              {item.title.length > 30 ? "..." : null}
            </li>
          </Link>
        );
      });
    } else {
      return <li>No result found</li>;
    }
  };

  const handleSearch = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    props.searchInputChange(name, value);
    if (keyword.length > 1) {
      props.getSearchResults(keyword);
    }
  };

  return (
    <Router>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={Link} to="/">
          <img
            className="logo"
            src={require("../../assets/img/logonew.png")}
            alt="Afrilearn Logo"
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {isAuthenticated ? (
              <>
                <NavItem>
                  <NavLink
                    tag={Link}
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                  >
                    My Dashboard
                  </NavLink>
                </NavItem>
                {user.role === "602f3ce39b146b3201c2dc1d" ? (
                  <NavItem>
                    <NavLink
                      tag={Link}
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                    >
                      Examination
                    </NavLink>
                  </NavItem>
                ) : null}

                {user.role !== "606ed82e70f40e18e029165e" ? (
                  <NavItem>
                    {user.role !== "602f3ce39b146b3201c2dc1d" &&
                      user.role !== "607ededa2712163504210684" &&
                      !inClass && (
                        <NavLink
                          tag={Link}
                          to="/performance"
                          onClick={() => setIsOpen(false)}
                        >
                          Performance Analysis
                        </NavLink>
                      )}
                  </NavItem>
                ) : (
                  <NavLink
                    tag={Link}
                    to="/register-child"
                    onClick={() => setIsOpen(false)}
                  >
                    Add My Child
                  </NavLink>
                )}
                <NavItem>
                  <NavLink
                    tag={Link}
                    to="/select-pay"
                    onClick={() => setIsOpen(false)}
                  >
                    Subscribe
                  </NavLink>
                </NavItem>
              </>
            ) : (
              ""
            )}
            <NavItem>
              <NavLink className="relative searchArea">
                <form>
                  <input
                    type="text"
                    placeholder="Search Topics"
                    className="searchBox"
                    value={keyword}
                    name="keyword"
                    onChange={handleSearch}
                  />
                  <img
                    className="searchIcon"
                    src={require("../../assets/img/search.png")}
                    alt="Afrilearn Search button"
                  />
                </form>
                {isSearching ? (
                  <img
                    className="searchLoader"
                    src={require("../../assets/img/loading.gif")}
                    alt="google"
                  />
                ) : keyword.length > 2 ? (
                  <ul>{searchResult()}</ul>
                ) : null}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/about" onClick={() => setIsOpen(false)}>
                About Us
              </NavLink>
            </NavItem>
            {isAuthenticated ? (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <img
                    src={require("./../../assets/img/profile.svg")}
                    alt="profile"
                    className="dropDownIcon dropDownIcon1"
                  />
                </DropdownToggle>
                <DropdownMenu right>
                  {user.role !== "606ed82e70f40e18e029165e" ? (
                    <>
                      {classList()}
                      <DropdownItem
                        tag={Link}
                        to="/select-pay"
                        onClick={() => setIsOpen(false)}
                      >
                        Add A New Class
                      </DropdownItem>
                    </>
                  ) : (
                    <>
                      <DropdownItem
                        tag={Link}
                        to="/children"
                        onClick={() => setIsOpen(false)}
                      >
                        View Child(ren)
                      </DropdownItem>
                    </>
                  )}
                  <DropdownItem
                    tag={Link}
                    to="/feeds"
                    onClick={() => setIsOpen(false)}
                  >
                    My Feeds <span className="badge badge-primary">New</span>
                  </DropdownItem>
                  <DropdownItem
                    tag={Link}
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                  >
                    Manage Profile
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <a
                      href="https://ppu1xtjahc2.typeform.com/to/I7DJS3Bd"
                      target="_blank"
                    >
                      Share your Feedback
                    </a>
                  </DropdownItem>

                  <DropdownItem tag={Link} to="/" onClick={handleLogout}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <>
                <NavItem>
                  <NavLink
                    tag={Link}
                    to="/login"
                    className="contact contact1"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={Link}
                    to="/register"
                    className="contact"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
      <Switch>
        <Route exact path="/" component={homepage} />
        <Route path="/about" component={about} />
        <Route path="/partnership" component={partnership} />
        <Route path="/privacy_policy" component={PrivacyPolicy} />
        <Route path="/accept-request" component={AcceptRequests} />
        <Route path="/faculty" component={faculties} />
        <Route path="/contact" component={contact} />
        <Route
          path="/past-questions/instructions"
          exact
          component={pastQuestionsInstruction}
        />
        <Route
          path="/lesson/quiz/instructions"
          exact
          component={pastQuestionsInstruction}
        />
        <Route
          path="/past-questions/remark"
          exact
          component={pastQuestionsRemark}
        />
        <Route
          path="/past-questions/exam"
          exact
          component={pastQuestionExamPage}
        />
        <Route path="/add-exam/:examId" component={AddExamQuestion} />
        <Route path="/add-exam" exact component={AddExam} />
        <Route path="/exams" exact component={ExamLog} />
        <Route path="/exams/:examId" exact component={ExamResults} />
        <Route path="/exams/:examId/:resultId" exact component={ExamResult} />
        <Route path="/past-questions/:categoryId" component={pastQuestions} />
        <Route
          path="/classes/:classId/:subjectId/quiz"
          exact
          component={quizPage}
        />
        <Route path="/text" component={TextToSpeech} />
        <Route
          path="/classes/:classId/:subjectId/:classworkId"
          component={classWork}
        />
        <Route path="/classroom/:classId" component={classroomStudent} />
        <Route path="/classes/teacher" component={classroomTeacherComponent} />
        <Route path="/classes/:classId" component={classPage} />
        <Route path="/classes" component={classes} />
        <Route path="/assign-content" component={assignContent} />
        <Route
          path="/content/:courseId/:subjectId/:lessonId/:videoId"
          component={lessonPage}
        />
        <Route path="/content/:courseId/:subjectId" component={content} />
        <Route
          path="/profile"
          component={
            user.role !== "607ededa2712163504210684"
              ? profilePage
              : SchoolProfile
          }
        />
        <Route path="/register" component={register} />
        <Route path="/join-class" component={joinClassComponent} />
        <Route path="/search/:lessonId" component={SearchPage} />
        <Route path="/login" component={login} />
        <Route path="/reset_password" component={resetPassword} />
        <Route path="/change_password" component={changePassword} />
        <Route
          path="/classnote/:courseId/:subjectId/:lessonId"
          component={classNote}
        />
        <Route path="/select-pay" component={selectPayment} />
        {/* <Route path='/dashboard' component={SchoolDashboard} /> */}
        <Route
          path="/dashboard"
          component={
            user.role === "5fd08fba50964811309722d5"
              ? dashboard
              : user.role === "606ed82e70f40e18e029165e"
              ? ParentDashboard
              : user.role === "607ededa2712163504210684"
              ? SchoolDashboard
              : user.role === "602f3ce39b146b3201c2dc1d"
              ? classroomTeacherComponent
              : null
          }
        />
        <Route path="/my-students" component={myStudents} />
        <Route path="/performance" component={performance} />
        <Route path="/social-login" component={socialLogin} />
        <Route path="/people" component={SchoolPeople} />
        <Route path="/subject" component={subject} />
        <Route path="/faq" component={faqPageComponent} />
        <Route path="/search-details" component={SearchDetails} />
        <Route path="/register-child" component={ParentChildRegistration} />
        <Route path="/children" component={ChildrenList} />
        <Route path="/child-performance" component={ParentPerformance} />
        <Route
          path="/child-timed-performance"
          component={ParentTimedPerformance}
        />
        <Route path="/edit/profile" component={EditSchoolProfile} />
        <Route path="/add-admin" component={schoolAddAdminComponent} />
        <Route path="/add-teacher" component={SchoolAddTeacher} />
        <Route path="/add-student" component={SchoolAddStudent} />
        <Route path="/more-info" component={Favourite} />
        <Route path="/feeds" component={Feeds} />
        <Route path="/impact-stories" component={Stories} />
        <Route path="/impact-story/:storyId" component={ViewImpactStory} />
      </Switch>
      <Analytics />
    </Router>
  );
};

MyNav.propTypes = {
  inputChange: PropTypes.func.isRequired,
  searchInputChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  inClass: state.auth.inClass,
  role: state.auth.role,
  keyword: state.search.keyword,
  isSearching: state.search.isSearching,
  searchResults: state.search.searchResults,
});

export default connect(mapStateToProps, {
  inputChange,
  searchInputChange,
  populateDashboard,
  logout,
  getSearchResults,
})(MyNav);
