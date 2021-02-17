import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  ButtonToggle,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  Col,
  Form,
  FormGroup,
  Label,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import PropTypes from "prop-types";
import moment from "moment";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarker,
  faEdit,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";

import {
  inputChange,
  updateProfile,
  changePasswordFromProfile,
} from "./../../../redux/actions/authActions";
import { clearErrors } from "./../../../redux/actions/errorActions";
import { populateDashboard } from "./../../../redux/actions/courseActions";
import { getClasses } from "./../../../redux/actions/classActions";

import Ellipse from "../../../assets/img/Ellipse.png";
import woman from "../../../assets/img/woman.png";

import "./css/style.css";

const ProfilePage = (props) => {
  const {
    user,
    dashboardData,
    populateDashboard,
    activeEnrolledCourseId,
    getClasses,
    classes,
    error,
  } = props;

  const [newName, setNewName] = useState(null);
  const [newPhone, setNewPhone] = useState(null);
  const [newAge, setnewAge] = useState(null);
  const [newState, setnewState] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [newCountry, setnewCountry] = useState(null);
  const [newGender, setNewGender] = useState(null);

  const statesInNigeria = [
    { id: 1, name: "Abia" },
    { id: 2, name: "Adamawa" },
    { id: 3, name: "Akwa Ibom" },
    {
      id: 4,
      name: "Anambra",
    },
    { id: 5, name: "Bauchi" },
    { id: 6, name: "Bayelsa" },
    { id: 7, name: "Benue" },
    { id: 8, name: "Borno" },
    { id: 10, name: "Cross River" },
    { id: 11, name: "Delta" },
    { id: 12, name: "Ebonyi" },
    { id: 13, name: "Edo" },
    { id: 14, name: "Ekiti" },
    { id: 15, name: "Enugu" },
    { id: 16, name: "Gombe" },
    { id: 17, name: "Imo" },
    { id: 18, name: "Jigawa" },
    { id: 19, name: "Kaduna" },
    { id: 20, name: "Kano" },
    { id: 21, name: "Katsina" },
    { id: 22, name: "Kebbi" },
    { id: 23, name: "Kogi" },
    { id: 24, name: "Kwara" },

    { id: 25, name: "Lagos" },
    { id: 26, name: "Nasarawa" },
    { id: 27, name: "Niger" },
    { id: 28, name: "Ogun" },
    { id: 29, name: "Ondo" },
    { id: 30, name: "Osun" },
    { id: 31, name: "Oyo" },
    { id: 32, name: "Plateau" },
    {
      id: 33,
      name: "Rivers",
    },
    { id: 34, name: "Sokoto" },
    { id: 35, name: "Taraba" },
    { id: 36, name: "Yobe" },
    { id: 37, name: "Zamfara" },
  ];

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
    } else if (error.id === "UPDATE_PROFILE_SUCCES") {
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
      // do componentDidUpdate logic
    } else if (error.id === "PASSWORD_CHANGE_FROM_PROFILE_SUCCESS") {
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
      // do componentDidUpdate logic
    } else {
      props.inputChange("redirect", false);
    }
  });

  const showEditPage = () => {
    const shownTab = document.getElementById("profilePageSectionTwo");
    const hiddenTab = document.getElementById("hiddenProfilePageSectionTwo");
    shownTab.style.display = "none";
    hiddenTab.style.display = "block";
  };
  const showDetailsPage = () => {
    window.scrollTo(0, 0);
    if (!newName && !newAge && !newPhone && !newState && !newGender) {
      Swal.fire({
        html: `No changes made`,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        timer: 3500,
        // position: "top-end",
      });
    } else {
      const userData = {};
      if (newName) {
        userData.fullName = newName;
      }
      if (newAge) {
        userData.dateOfBirth = newAge;
      }
      if (newPhone) {
        userData.phoneNumber = newPhone;
      }
      if (newState) {
        userData.state = newState;
      }
      props.updateProfile(userData);
    }

    const shownTab = document.getElementById("profilePageSectionTwo");
    const hiddenTab = document.getElementById("hiddenProfilePageSectionTwo");
    shownTab.style.display = "block";
    hiddenTab.style.display = "none";
  };

  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  const classListForStudents = () => {
    if (
      dashboardData &&
      dashboardData.classMembership &&
      Object.keys(dashboardData).length &&
      dashboardData.classMembership.length
    ) {
      return dashboardData.classMembership.map((item, index) => {
        return (
          <tr>
            <td>{item.classId.name}</td>
            <td>
              <ButtonToggle className="button" size="sm">
                {item.status.toUpperCase()}
              </ButtonToggle>
            </td>
          </tr>
        );
      });
    } else {
      return <p className="shiftClass">No class list yet</p>;
    }
  };

  const classListForStudentsOne = () => {
    if (
      dashboardData &&
      dashboardData.classMembership &&
      Object.keys(dashboardData).length &&
      dashboardData.classMembership.length
    ) {
      return dashboardData.classMembership.map((item, index) => {
        return <span>{item.classId.name}</span>;
      });
    } else {
      return <p className="shiftClass">No class list yet</p>;
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
      return <p className="shiftClass">No class list yet</p>;
    }
  };

  const classListForTeachersOne = () => {
    if (classes && classes.length) {
      let myClasses = classes.filter((element) => element.userId === user._id);
      return myClasses.map((item, index) => {
        return <span>{item.name}</span>;
      });
    } else {
      return <p className="shiftClass">No class list yet</p>;
    }
  };

  const handlePasswordChange = () => {
    if (!newPassword) {
      Swal.fire({
        html: "Password is empty",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        timer: 3500,
        // position: "top-end",
      });
    } else {
      props.changePasswordFromProfile({
        email: user.email,
        password: newPassword,
      });
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
              <h4>
                {newName
                  ? newName
                  : user.fullName
                  ? user.fullName
                  : "Not Available"}
              </h4>
              <p>{user.email ? user.email : "Not Available"}</p>
            </div>
            <div className="item item-plus-icon">
              <FontAwesomeIcon
                icon={faMapMarker}
                style={{ marginRight: "15px", fontSize: "20px" }}
              />
              <p>
                {newState ? newState : user.state ? user.state + " State," : ""}{" "}
                {newCountry ? newCountry : user.country ? user.country : ""}
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
              Phone Number: &nbsp;{" "}
              {newPhone
                ? newPhone
                : user.phoneNumber
                ? user.phoneNumber
                : "Not Available"}
            </p>
            <p>
              State: &nbsp;{" "}
              {newState ? newState : user.state ? user.state : "Not Available"}
            </p>
            <p>
              Gender: &nbsp;{" "}
              {newGender
                ? newGender
                : user.gender
                ? user.gender
                : "Not Available"}
            </p>
            <p>
              Age: &nbsp;{" "}
              {moment(newAge ? newAge : user.dateOfBirth, "YYYYMMDD")
                .fromNow()
                .replace("years ago", "")}
            </p>
            <p>
              City: &nbsp;{" "}
              {newState ? newState : user.state ? user.state : "Not Available"}
            </p>
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
        <div className="row refer">
            <div className="col-md-7">
              <InputGroup size="lg" className="input-50">
                <Input
                  placeholder="ww.awfhrnfudf123485nftuekd/me.dfir9i9e00rigfgrr"
                  className="input-two"
                />
                <InputGroupAddon addonType="append" color="success">
                  <Button className="button-2">Copy Referral Code</Button>
                </InputGroupAddon>
              </InputGroup>
            </div>
            <div className="col-md-5">
              Share your referral code with friends to Earn Money or Free Subscription 
            </div>
        </div>        
      </div>
      <div id="hiddenProfilePageSectionTwo">
        <div className="round-image">
          <img src={woman} alt="check out"></img>
          <FontAwesomeIcon icon={faPencilAlt} className="round-image-icon" />
        </div>      
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
                    placeholder={user && user.fullName}
                    onChange={(e) => {
                      e.preventDefault();
                      setNewName(e.target.value);
                    }}
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
                    className="custom-input "
                    type="email"
                    name="email"
                    id="email"
                    placeholder={user && user.email}
                    readOnly
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
                  <input
                    placeholder={
                      user && user.phoneNumber ? user.phoneNumber : ""
                    }
                    onChange={(e) => {
                      e.preventDefault();
                      setNewPhone(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div class="row justify-content-between">
                <div class="col-6">
                  <FormGroup row>
                    <Label for="age" sm={3}>
                      Date Of Birth:
                    </Label>
                    <Col sm={1}></Col>
                    <Col sm={8}>
                      <Input
                        bsSize="lg"
                        className="custom-input"
                        type="date"
                        name="age"
                        id="age"
                        placeholder={moment(user.dateOfBirth, "YYYYMMDD")
                          .fromNow()
                          .replace("years ago", "")}
                        onChange={(e) => {
                          e.preventDefault();
                          setnewAge(e.target.value);
                        }}
                      ></Input>
                    </Col>
                  </FormGroup>
                </div>
                <div class="col-6">
                  {/* <FormGroup row>
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
                  </FormGroup> */}
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
                        onChange={(e) => {
                          e.preventDefault();
                          setnewState(e.target.value);
                        }}
                      >
                        <option>{user && user.state}</option>
                        {statesInNigeria.map((state) => (
                          <option key={state.id}>{state.name}</option>
                        ))}
                      </Input>
                    </Col>
                  </FormGroup>
                </div>
                <div class="col-6">
                  {/* <FormGroup row>
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
                  </FormGroup> */}
                </div>
              </div>
              <div class="row justify-content-between">
                <div class="col-6">
                  <FormGroup row>
                    <Label for="state" sm={2}>
                      Gender:
                    </Label>
                    <Col sm={2}></Col>
                    <Col sm={8}>
                      <Input
                        bsSize="lg"
                        className="custom-input"
                        type="select"
                        name="gender"
                        id="gender"
                        onChange={(e) => {
                          e.preventDefault();
                          setNewGender(e.target.value);
                        }}
                      >
                        <option>
                          {user && user.gender ? user.gender : "Select Gender"}
                        </option>
                        <option>Male</option>
                        <option>Female</option>
                      </Input>
                    </Col>
                  </FormGroup>
                </div>
                <div class="col-6">
                  {/* <FormGroup row>
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
                  </FormGroup> */}
                </div>
              </div>
            </Form>
          </div>
        </div>
        <div className="class-details">
          <h3>Class Details</h3>
          <div className="class-details-list">
            <span>Subscribed Class:</span>
            <div className="input-like-box">
              {user && user.role === "5fc8cc978e28fa50986ecac9"
                ? classListForTeachersOne()
                : classListForStudentsOne()}
            </div>
          </div>
        </div>
        <div className="security">
          <h3>Security</h3>
          <div className="security-form">
            <span>Password::</span>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlePasswordChange();
              }}
              className="custom-input"
            >
              <input
                placeholder="Enter new password"
                type="text"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
              <span className="cursor-pointer" onClick={handlePasswordChange}>
                Reset
              </span>
            </form>
          </div>
          <ButtonToggle
          className="save-changes"
          size="sm"
          onClick={showDetailsPage}
        >
          Save Changes
        </ButtonToggle>
        </div>
       
      </div>
    </React.Fragment>
  );
};

ProfilePage.propTypes = {
  inputChange: PropTypes.func.isRequired,
  populateDashboard: PropTypes.func.isRequired,
  getClasses: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  changePasswordFromProfile: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  classOwnership: state.auth.user.classOwnership,
  activeEnrolledCourseId: state.auth.activeEnrolledCourseId,
  user: state.auth.user,
  dashboardData: state.course.dashboardData,
  classes: state.class.classes,
  error: state.error,
});
export default connect(mapStateToProps, {
  inputChange,
  populateDashboard,
  getClasses,
  updateProfile,
  clearErrors,
  changePasswordFromProfile,
})(ProfilePage);
