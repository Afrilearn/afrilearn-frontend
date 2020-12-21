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
            {/* <NavItem>
              <NavLink tag={Link} to="/content">
                Content
              </NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink tag={Link} to="/about">
                About Us
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/login" className="contact">
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
        <Route path="/classes/:classId" component={classPage} />
        <Route path="/classes" component={classes} />
        <Route path="/content/:lessonId" component={lessonPage} />
        <Route path="/content" component={content} />
		<Route path="/register" component={register} />
		<Route path="/login" component={login} />
		<Route path="/reset_password" component={resetPassword} />
		<Route path="/change_password" component={changePassword} />
      </Switch>
      <Footer />
    </Router>
  );
};
export default MyNav;
