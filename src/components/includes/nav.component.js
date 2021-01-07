import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
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
import PastQuestions from "../screens/pastQuestions/pastQuestions.component";
import myStudents from "../screens/myStudents/myStudents.component";
import classroomTeacherComponent from "../screens/classroomTeacher/classroomTeacher.component";
import assignContent from "../screens/assignContent/assignContent.component";

const MyNav = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
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
          </Nav>
        </Collapse>
      </Navbar>
      <Switch>
        <Route exact path="/" component={homepage} />
        <Route path="/about" component={about} />
        <Route path="/partnership" component={partnership} />
        <Route path="/contact" component={contact} />
        <Route
          path="/category/:subjectId/instruction"
          exact
          component={pastQuestionsInstruction}
        />
        <Route
          path="/category/:subjectId/quiz"
          exact
          component={pastQuestionQuizPage}
        />
        <Route path="/category/:subjectId" exact component={PastQuestions} />
        <Route
          path="/classes/:classId/:subjectId/quiz"
          exact
          component={quizPage}
        />
        <Route
          path="/classes/:classId/:subjectId/:classworkId"
          component={classWork}
        />
        <Route
          path="/classes/:classId/:subjectId"
          component={classroomStudent}
        />
        <Route path="/classes/teacher" component={classroomTeacherComponent} />
        <Route path="/classes/:classId" component={classPage} />
        <Route path="/classes" component={classes} />
        <Route path="/content/:lessonId/assign-content" component={assignContent} />
        <Route path="/content/:lessonId" component={lessonPage} />
        <Route path="/content" component={content} />
        <Route path="/profile" component={profilePage} />
        <Route path="/register" component={register} />
        <Route path="/login" component={login} />
        <Route path="/reset_password" component={resetPassword} />
        <Route path="/change_password" component={changePassword} />
        <Route path="/instructions" component={instructions} />
        <Route path="/select-pay" component={selectPayment} />
        <Route path="/pay-with-card" component={cardPayment} />
        <Route path="/pay-in-bank" component={bankDeposit} />
        <Route path="/dashboard" component={dashboard} />
        <Route path="/my-students" component={myStudents} />
      </Switch>
      <Footer />
    </Router>
  );
};
export default MyNav;
