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
  DropdownItem
} from "reactstrap";
import { connect } from 'react-redux';
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

const MyNav = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const {authenticated} = props;
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
            {authenticated? 
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <img src={require('./../../assets/img/profile.png')} alt="profile" className="dropDownIcon dropDownIcon1"/>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={Link} to="/dashboard">
                  <span><img src={require('./../../assets/img/profile.png')} alt="profile" className="dropDownIcon"/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;JSS1</span>
                </DropdownItem>            
                <DropdownItem tag={Link} to="/classes/teacher">
                  <span><img src={require('./../../assets/img/profile.png')} alt="profile" className="dropDownIcon"/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;JSS2</span>
                </DropdownItem>            
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
                <DropdownItem tag={Link} to="/login">                 
                  Log in                   
                </DropdownItem>   
                <DropdownItem tag={Link} to="/register">                 
                  Register                 
                </DropdownItem>  
                <DropdownItem tag={Link} to="/change_password">                 
                  Change Password                 
                </DropdownItem>
                <DropdownItem tag={Link} to="/classes/teacher">                 
                  Teacher's Dashboard               
                </DropdownItem>
                <DropdownItem tag={Link} to="/">                 
                  Log Out                   
                </DropdownItem>             
              </DropdownMenu>
            </UncontrolledDropdown>
            :
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
            </>}            
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
        <Route path="/category/:subjectId" exact component={pastQuestions} />
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
        <Route path="/performance" component={performance} />
      </Switch>
      <Footer />
    </Router>
  );
};
const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated
});
export default connect(mapStateToProps, null)(MyNav);
