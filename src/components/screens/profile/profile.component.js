import React, { useEffect, useRef, useState } from "react";
import "./css/style.css";
import Ellipse from "../../../assets/img/Ellipse.png";
import woman from "../../../assets/img/woman.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarker,
  faEdit,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { ButtonToggle } from "reactstrap";
import { InputGroup, InputGroupAddon, Input, Button } from "reactstrap";
import { Col, Form, FormGroup, Label } from "reactstrap";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { inputChange } from "./../../../redux/actions/authActions";
import { populateDashboard } from "./../../../redux/actions/courseActions";
import { getClasses } from "./../../../redux/actions/classActions";
import PropTypes from "prop-types";
import moment from "moment";

const ProfilePage = (props) => {
  const {
    user,
    dashboardData,
    populateDashboard,
    activeEnrolledCourseId,
    getClasses,
    classes,
  } = props;

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      window.scrollTo(0, 0);
      props.inputChange("redirect", false);
      const data = {
        enrolledCourseId: activeEnrolledCourseId,
      };
      populateDashboard(activeEnrolledCourseId ? data : null);
      getClasses();
    } else {
      props.inputChange("redirect", false);
      // do componentDidUpdate logic
    }
  });
  const showEditPage = () => {
    const shownTab = document.getElementById("profilePageSectionTwo");
    const hiddenTab = document.getElementById("hiddenProfilePageSectionTwo");
    shownTab.style.display = "none";
    hiddenTab.style.display = "block";
  };
  const showDetailsPage = () => {
    const shownTab = document.getElementById("profilePageSectionTwo");
    const hiddenTab = document.getElementById("hiddenProfilePageSectionTwo");
    shownTab.style.display = "block";
    hiddenTab.style.display = "none";
  };

  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);
  const classListForStudents = () => {
    if (
      Object.keys(dashboardData).length &&
      dashboardData.classMembership.length
    ) {
      let classes = dashboardData.classMembership.filter(
        (el) => el.status === "approved"
      );
      return classes.map((item, index) => {
        return (
          <tr>
            <td>{item.classId.name}</td>
            <td>
              <ButtonToggle className="button" size="sm">
                Subscribed
              </ButtonToggle>
            </td>
          </tr>
        );
      });
    } else {
      return <h6>No class list yet</h6>;
    }
  };

  const classListForTeachers = () => {
    if (classes && classes.length) {
      let myClasses = classes.filter((element) => element.userId === user._id);
      return myClasses.map((item, index) => {
        return (
          <tr>
            <td>{item.name}</td>
            <td>
              <Link to={`/classes/teacher`} className="link-button" size="sm">
                Goto classroom
              </Link>
            </td>
          </tr>
        );
      });
    } else {
      return <h6>No class list yet</h6>;
    }
  };
  return (
    <React.Fragment>
      <div id="profilePageSectionOne"></div>
      <div id="profilePageSectionTwo">
        <div class="circle">
          <img className="image" src={woman} alt="check"></img>
          <img className="ellipse" src={Ellipse} alt="check"></img>
        </div>
        <div className="top-details">
          <div className="items">
            <div className="item">
              <h4>{user.fullName ? user.fullName : "N/A"}</h4>
              <p>{user.email ? user.email : "N/A"}</p>
            </div>
            <div className="item item-plus-icon">
              <FontAwesomeIcon
                icon={faMapMarker}
                style={{ marginRight: "15px", fontSize: "20px" }}
              />
              <p>
                {user.state ? user.state : "N/A"} State,{" "}
                {user.country ? user.country : "N/A"}
              </p>
            </div>
            <div className="item item-plus-icon" onClick={showEditPage}>
              <FontAwesomeIcon
                icon={faEdit}
                style={{ marginRight: "15px", fontSize: "20px" }}
              />
              <p>Edit Profile</p>
            </div>
          </div>
        </div>
        <div className="personal-details">
          <h3>Personal Details</h3>
          <div className="personal-details-list">
            <p>
              Phone Number: &nbsp; {user.phoneNumber ? user.phoneNumber : "N/A"}
            </p>
            <p>State: &nbsp; {user.state ? user.state : "N/A"}</p>
            <p>Gender: &nbsp; {user.gender ? user.gender : "N/A"}</p>
            <p>
              Age: &nbsp;{" "}
              {moment(user.dateOfBirth, "YYYYMMDD")
                .fromNow()
                .replace("years ago", "")}
            </p>
            <p>City: &nbsp; {user.state ? user.state : "N/A"}</p>
          </div>
        </div>
        <div className="classes">
          <table>
            <thead>
              <tr>
                <th>
                  <h3>Class(es)</h3>
                </th>
                <th>
                  <h3>Status</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              {user && user.role === "5fc8cc978e28fa50986ecac9"
                ? classListForTeachers()
                : classListForStudents()}
            </tbody>
          </table>
        </div>
        <div className="referral-code">
          <h3>Referral Code</h3>
          <p>
            Copy and share your referral code with friends and stand a chance to
            have access to free study materials
          </p>
          <InputGroup size="lg" className="input-50">
            <Input
              placeholder="ww.awfhrnfudf123485nftuekd/me.dfir9i9e00rigfgrr"
              className="input-two"
            />
            <InputGroupAddon addonType="append" color="success">
              <Button className="button-2">Copy Code</Button>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
      <div id="hiddenProfilePageSectionTwo">
        <div className="round-image">
          <img src={woman} alt="check out"></img>
          <FontAwesomeIcon icon={faPencilAlt} className="round-image-icon" />
        </div>
        <ButtonToggle
          className="save-changes"
          size="sm"
          onClick={showDetailsPage}
        >
          Save Changes
        </ButtonToggle>
        <div className="personal-details">
          <h3>Personal Details</h3>
          <div className="personal-details-form">
            <Form>
              <FormGroup row>
                <Label for="fullName" sm={2}>
                  Full Name:
                </Label>
                <Col sm={10}>
                  <Input
                    bsSize="lg"
                    className="custom-input"
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Feyikemi Alaka"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="email" sm={2}>
                  Email:
                </Label>
                <Col sm={10}>
                  <Input
                    bsSize="lg"
                    className="custom-input"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="feyikemi199@gmail.com"
                  />
                </Col>
              </FormGroup>
              <div className="phone-number">
                <div className="local">Phone Number:</div>
                <div className="input-column custom-input">
                  <span>
                    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                      <DropdownToggle className="button-2" size="sm" caret>
                        +234
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>+224</DropdownItem>
                        <DropdownItem disabled>+145</DropdownItem>
                        <DropdownItem>+233</DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>
                  </span>
                  <input />
                </div>
              </div>
              <div class="row justify-content-between">
                <div class="col-6">
                  <FormGroup row>
                    <Label for="age" sm={2}>
                      Age:
                    </Label>
                    <Col sm={2}></Col>
                    <Col sm={8}>
                      <Input
                        bsSize="lg"
                        className="custom-input"
                        type="select"
                        name="age"
                        id="age"
                      >
                        <option></option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Input>
                    </Col>
                  </FormGroup>
                </div>
                <div class="col-5">
                  <FormGroup row>
                    <Label for="gender" sm={2}>
                      Gender:
                    </Label>
                    <Col sm={1}></Col>
                    <Col sm={9}>
                      <Input
                        bsSize="lg"
                        className="custom-input"
                        type="select"
                        name="gender"
                        id="gender"
                      >
                        <option></option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Input>
                    </Col>
                  </FormGroup>
                </div>
              </div>
              <div class="row justify-content-between">
                <div class="col-6">
                  <FormGroup row>
                    <Label for="state" sm={2}>
                      State:
                    </Label>
                    <Col sm={2}></Col>
                    <Col sm={8}>
                      <Input
                        bsSize="lg"
                        className="custom-input"
                        type="select"
                        name="state"
                        id="state"
                      >
                        <option></option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Input>
                    </Col>
                  </FormGroup>
                </div>
                <div class="col-5">
                  <FormGroup row>
                    <Label for="city" sm={2}>
                      City:
                    </Label>
                    <Col sm={1}></Col>
                    <Col sm={9}>
                      <Input
                        bsSize="lg"
                        className="custom-input"
                        type="select"
                        name="city"
                        id="city"
                      >
                        <option></option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Input>
                    </Col>
                  </FormGroup>
                </div>
              </div>
            </Form>
          </div>
        </div>
        <div className="class-details">
          <h3>Class Details</h3>
          <div className="class-details-list">
            <span>Subscribed Class:</span>
            <div className="input-two">
              <span>JSS 1</span>
              <span>JSS 2</span>
            </div>
          </div>
        </div>
        <div className="security">
          <h3>Security</h3>
          <div className="security-form">
            <span>Subscribed Class:</span>
            <div className="custom-input">
              <input placeholder="*********" />
              <span>Reset</span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

ProfilePage.propTypes = {
  inputChange: PropTypes.func.isRequired,
  populateDashboard: PropTypes.func.isRequired,
  getClasses: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  activeEnrolledCourseId: state.auth.activeEnrolledCourseId,
  user: state.auth.user,
  dashboardData: state.course.dashboardData,
  classes: state.class.classes,
});
export default connect(mapStateToProps, {
  inputChange,
  populateDashboard,
  getClasses,
})(ProfilePage);
