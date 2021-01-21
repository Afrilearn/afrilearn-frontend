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
import Footer from "../includes/footer/footer.component";
import contact from "../screens/contact/contact.component";
import classes from "../screens/classes/classes.component";
import classPage from "../screens/class/class.component";
import content from "../screens/content/content.component";
import lessonPage from "../screens/lessonPage/lessonPage.component";
import register from "../screens/signup/signup.component";
import login from "../screens/login/login.component";
import resetPassword from "../screens/resetPassword/resetPassword.component";
import changePassword from "../screens/changePassword/changePassword.component";
import instructions from "../screens/instructions/instructions.component";
import profilePage from "../screens/profile/profile.component";
import classroomStudent from "../screens/classroomStudent/classroomStudent.component";
import classWork from "../screens/classWork/classWork.component";
import quizPage from "../screens/quizPage/quizPage.component";
import dashboard from "../screens/dashboard/dashboard.component";
import selectPayment from "../screens/selectPayment/selectPayment.component";
import cardPayment from "../screens/cardPayment/cardPayment.component";
import bankDeposit from "../screens/bankDeposit/bankDeposit.component";
import pastQuestionsInstruction from "../screens/pastQuestionsInstruction/pastQuestionsInstruction.component";
import pastQuestionQuizPage from "../screens/pastQuestionQuizPage/pastQuestionQuizPage.component";
import pastQuestions from "../screens/pastQuestions/pastQuestions.component";
import myStudents from "../screens/myStudents/myStudents.component";
import classroomTeacherComponent from "../screens/classroomTeacher/classroomTeacher.component";
import assignContent from "../screens/assignContent/assignContent.component";
import performance from "../screens/performance/performance.component";
import socialLogin from "../screens/socialLogin/socialLogin.component";
import { inputChange } from "./../../redux/actions/authActions";
import ProtectedRoute from "./protectedRoute.component";
import PropTypes from "prop-types";
import subject from "../screens/subject/subject.component";

const MyNav = (props) => {
  const { user } = props;
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { isAuthenticated } = props;

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    props.inputChange("logout", true);
    props.inputChange("isAuthenticated", false);
  };

  const updateactiveEnrolledCourseId = (id, e) => {
    props.inputChange("activeEnrolledCourseId", id);
  };

  const classList = () => {
    if (user && user.enrolledCourses.length) {
      return user.enrolledCourses.map((item) => {
        return (
          <DropdownItem
            tag={Link}
            to="/dashboard"
            onClick={updateactiveEnrolledCourseId.bind(null, item._id)}
          >
            <span>
              <img
                src={require("./../../assets/img/profile.png")}
                alt="profile"
                className="dropDownIcon"
              />{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.courseId.name}
            </span>
          </DropdownItem>
        );
      });
    }
  };

  return (
    <Router>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={Link} to="/">
          <img
            className="logo"
            src={require("../../assets/img/logo.png")}
            alt="Afrilearn Logo"
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {isAuthenticated ? (
              <>
                <NavItem>
                  <NavLink tag={Link} to="/dashboard">
                    Dashboard
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/select-pay">
                    Subscribe
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/performance">
                    Performance Analysis
                  </NavLink>
                </NavItem>
              </>
            ) : (
              ""
            )}
            <NavItem>
              <NavLink tag={Link} className="relative searchArea">
                {/* <img className="searchIcon" src={require('../../assets/img/search.png')} alt="Afrilearn Search button"/> */}
                <input type="text" placeholder="Search" className="searchBox" />
                <img
                  className="searchIcon"
                  src={require("../../assets/img/search.png")}
                  alt="Afrilearn Search button"
                />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/classes">
                Classes
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/about">
                About Us
              </NavLink>
            </NavItem>
            {isAuthenticated ? (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <img
                    src={require("./../../assets/img/profile.png")}
                    alt="profile"
                    className="dropDownIcon dropDownIcon1"
                  />
                </DropdownToggle>
                <DropdownMenu right>
                  {classList()}
                  <DropdownItem tag={Link} to="/about">
                    Add A New Class
                  </DropdownItem>
                  <DropdownItem tag={Link} to="/profile">
                    Manage Profile
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem tag={Link} to="/select-pay">
                    Payment History
                  </DropdownItem>
                  <DropdownItem tag={Link} to="/profile">
                    Invite Your Friends
                  </DropdownItem>
                  <DropdownItem tag={Link} to="/classes/teacher">
                    Teacher's Dashboard
                  </DropdownItem>
                  <DropdownItem tag={Link} to="/" onClick={handleLogout}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <>
                <NavItem>
                  <NavLink tag={Link} to="/login" className="contact contact1">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/register" className="contact">
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
        <Route path="/contact" component={contact} />
        <ProtectedRoute
          path="/category/:subjectId/instruction"
          exact
          component={pastQuestionsInstruction}
        />
        <ProtectedRoute
          path="/category/:subjectId/quiz"
          exact
          component={pastQuestionQuizPage}
        />
        <ProtectedRoute
          path="/category/:subjectId"
          exact
          component={pastQuestions}
        />
        <ProtectedRoute
          path="/classes/:classId/:subjectId/quiz"
          exact
          component={quizPage}
        />
        <ProtectedRoute
          path="/classes/:classId/:subjectId/:classworkId"
          component={classWork}
        />
        <ProtectedRoute
          path="/classroom/:classId"
          component={classroomStudent}
        />
        <ProtectedRoute
          path="/classes/teacher"
          component={classroomTeacherComponent}
        />
        <Route path="/classes/:classId" component={classPage} />
        <Route path="/classes" component={classes} />
        <ProtectedRoute path="/assign-content" component={assignContent} />
        <ProtectedRoute
          path="/content/:courseId/:subjectId/:lessonId/:videoId"
          component={lessonPage}
        />
        <ProtectedRoute
          path="/content/:courseId/:subjectId"
          component={content}
        />
        <ProtectedRoute path="/profile" component={profilePage} />
        <Route path="/register" component={register} />
        <Route path="/login" component={login} />
        <Route path="/reset_password" component={resetPassword} />
        <Route path="/change_password" component={changePassword} />
        <ProtectedRoute path="/instructions" component={instructions} />
        <ProtectedRoute path="/select-pay" component={selectPayment} />
        <Route path="/pay-with-card" component={cardPayment} />
        <Route path="/pay-in-bank" component={bankDeposit} />
        <ProtectedRoute
          path="/dashboard"
          component={
            user.role !== "5fc8cc978e28fa50986ecac9"
              ? dashboard
              : classroomTeacherComponent
          }
        />
        <ProtectedRoute path="/my-students" component={myStudents} />
        <ProtectedRoute path="/performance" component={performance} />
        <Route path="/social-login" component={socialLogin} />
        <Route path="/subject" component={subject} />
      </Switch>
      <Footer />
    </Router>
  );
};

MyNav.propTypes = {
  inputChange: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});
export default connect(mapStateToProps, { inputChange })(MyNav);
