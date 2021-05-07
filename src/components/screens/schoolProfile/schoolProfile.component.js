import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ReactComponent as Edit } from "../../../assets/img/edit.svg";
import { ReactComponent as Location } from "../../../assets/img/Location.svg";
import { ReactComponent as SchoolLogo } from "../../../assets/img/defaultSchoolLogo.svg";
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
  Dropdown,
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

import { clearErrors } from "./../../../redux/actions/errorActions";
import { populateDashboard } from "./../../../redux/actions/courseActions";
import { getClasses } from "./../../../redux/actions/classActions";

import Ellipse from "../../../assets/img/Ellipse.png";
import woman from "../../../assets/img/woman.png";
import Adeola from "../../../assets/img/Adeola.jpg";
import Avatar from "react-avatar";

import "./css/style.css";
import {
  getSchoolProfile,
  uploadSchoolCoverPhoto,
} from "../../../redux/actions/schoolActions";

const SchoolProfile = (props) => {
  const {
    user,
    dashboardData,
    populateDashboard,
    activeEnrolledCourseId,
    getClasses,
    classes,
    error,
    referralCode,
  } = props;

  const [newName, setNewName] = useState(null);
  const [newPhone, setNewPhone] = useState(null);
  const [newAge, setnewAge] = useState(null);
  const [newState, setnewState] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [newCountry, setnewCountry] = useState(null);
  const [newGender, setNewGender] = useState(null);

  const mounted = useRef();
  const school = useSelector((state) => state.school.school);
  const coverPhoto = useSelector((state) => state.school.coverPhoto);
  const logo = useSelector((state) => state.school.logo);
  console.log("school", school);
  const dispatch = useDispatch();
  useEffect(() => { 
    if (!mounted.current) {
      dispatch(getSchoolProfile(user.schoolId._id));

      // do componentDidMount logic
      mounted.current = true;
      window.scrollTo(0, 0);
      // props.inputChange("redirect", false);
      const data = {
        enrolledCourseId: activeEnrolledCourseId,
      };
      // populateDashboard(activeEnrolledCourseId ? data : null);
      // getClasses();
    }
    // } else if (error.id === "UPDATE_PROFILE_SUCCES") {
    //     const message =
    //         typeof error.msg === "object" ? error.msg.join("<br/>") : error.msg;
    //     Swal.fire({
    //         html: message,
    //         showClass: {
    //             popup: "animate__animated animate__fadeInDown",
    //         },
    //         hideClass: {
    //             popup: "animate__animated animate__fadeOutUp",
    //         },
    //         timer: 3500,
    //         // position: "top-end",
    //     });
    //     props.clearErrors();
    //     // do componentDidUpdate logic
    // } else if (error.id === "PASSWORD_CHANGE_FROM_PROFILE_SUCCESS") {
    //     const message =
    //         typeof error.msg === "object" ? error.msg.join("<br/>") : error.msg;
    //     Swal.fire({
    //         html: message,
    //         showClass: {
    //             popup: "animate__animated animate__fadeInDown",
    //         },
    //         hideClass: {
    //             popup: "animate__animated animate__fadeOutUp",
    //         },
    //         timer: 3500,
    //         // position: "top-end",
    //     });
    //     props.clearErrors();
    //     // do componentDidUpdate logic
    // } else {
    //     props.inputChange("redirect", false);
    // }
  });

  const showEditPage = () => {
    const shownTab = document.getElementById("profilePageSectionTwo");
    const hiddenTab = document.getElementById("hiddenProfilePageSectionTwo");
    shownTab.style.display = "none";
    hiddenTab.style.display = "block";
  };
  const showDetailsPage = () => {
    window.scrollTo(0, 0);
    if (
      !newName &&
      !newAge &&
      !newPhone &&
      !newState &&
      !newGender &&
      !newProfilePic
    ) {
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
      if (newProfilePic) {
        const data = new FormData();
        data.append("profilePhotoUrl", photoToUpload);
        props.updateProfilePicture(data);
      }
      props.updateProfile(userData);
    }

    const shownTab = document.getElementById("profilePageSectionTwo");
    const hiddenTab = document.getElementById("hiddenProfilePageSectionTwo");
    shownTab.style.display = "block";
    hiddenTab.style.display = "none";
  };

  const classListForSchool = () => {
    if (school && school.schoolClassesData && school.schoolClassesData.length) {
      return school.schoolClassesData.map((item, index) => {
        return <p>{item.className}</p>;
      });
    } else {
      return <p className="shiftClass">No class list yet</p>;
    }
  };
  // let myInitials = user.fullName.slice(0, 2);
  let myInitials;
  if (newName) {
    myInitials = newName.slice(0, 2);
  }

  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);
  const [editPicDropDownOpen, setEditPicDropDownOpen] = useState(false);
  const toggleEditDropDown = () => setEditPicDropDownOpen(!editPicDropDownOpen);

  const copyToClipboard = (e, item) => {
    e.preventDefault();
    var textField = document.createElement("textarea");
    textField.innerText = `${item}`;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.classList.add("hide");
    setVisible(true);
  };
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [photoToUpload, setPhotoToUpload] = useState(null);

  const referralLink = `https://myafrilearn.com/register?referralCode=${user._id}`;
  return (
    <React.Fragment>
      <div
        id="schoolProfilePageSectionOne"
        style={{
          backgroundImage: `linear-gradient(
            1.17deg,
            #000000 -14.82%,
            rgba(0, 0, 0, 0) 118.73%
          ),
          url(${coverPhoto})`,
        }}
      >
        {!coverPhoto && (
          <label>
            Upload cover photo
            <input
              type="file"
              onChange={(e) => {
                e.preventDefault();
                const data = new FormData();
                data.append("coverPhoto", e.target.files[0]);
                dispatch(uploadSchoolCoverPhoto(user.schoolId._id, data));
              }}
            />
          </label>
        )}
      </div>
      <div id="schoolProfilePageSectionTwo">
        <div class="circle" style={{ backgroundColor: "white" }}>
          {logo ? (
            <img className="ellipse" src={logo} alt="Profile"></img>
          ) : (
            <span>
              {school.profile &&
                school.profile.name &&
                school.profile.name.slice(0, 2)}
            </span>
          )}
        </div>
        <div className="top-details">
          <div className="items">
            <div className="item">
              <h4>{school.profile && school.profile.name}</h4>
              {/* <p>{user.email ? user.email : "Not Available"}</p> */}
              <p>{school.profile && school.profile.email}</p>
            </div>
            <div className="item item-plus-icon">
              <Location style={{ marginRight: "15px", width: "20px" }} />
              <p>
                {/* {newState ? newState : user.state ? user.state + " State," : ""}{" "}
                {newCountry ? newCountry : user.country ? user.country : ""} */}
                {(school.profile && school.profile.location) || "Not Available"}
              </p>
            </div>
          </div>
        </div>
        <div className="personal-details">
          <div
            className="d-flex justify-content-between flex-wrap"
            style={{
              borderBottom: "1px solid rgba(255, 255, 255, 0.25)",
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <h3>Personal Details</h3>
            <Link
              to={{
                pathname: "/edit/profile",
                state: { filterBy: "role", searchValue: "school" },
              }}
            >
              <div className="item item-plus-icon">
                <Edit style={{ marginRight: "15px", width: "20px" }} />
                <span>Edit Profile</span>
              </div>
            </Link>
          </div>
          <div className="personal-details-list">
            <p>
              Website : &nbsp;{" "}
              {(school.profile && school.profile.website) || "Not Available"}
            </p>
            <p>
              Phone Number: &nbsp;{" "}
              {(school.profile && school.profile.phone) || "Not Available"}
            </p>

            <p>Status: School</p>
          </div>
        </div>
        <div className="classes">
          <h3>Class(es)</h3>
          <div class="classes-list">{classListForSchool()}</div>
        </div>
        <div className="refer">
          <div style={{ paddingLeft: 20, paddingRight: 20 }} className="pb-3">
            Copy and share your referral code with friends and stand a chance to
            have access to free study materials
          </div>
          <div>
            <InputGroup
              size="lg"
              className="input-50"
              style={{ paddingRight: 20 }}
            >
              <Input placeholder={referralLink} className="input-two" />
              <InputGroupAddon addonType="append" color="success">
                <Button
                  className="button-2"
                  onClick={(e) => copyToClipboard(e, referralLink)}
                >
                  Copy Code
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
          {visible && (
            <div class="col-6">
              <div
                class="alert alert-success alert-dismissible fade show"
                role="alert"
              >
                <strong>Link Copied</strong>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

SchoolProfile.propTypes = {
  inputChange: PropTypes.func.isRequired,
  populateDashboard: PropTypes.func.isRequired,
  getClasses: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  changePasswordFromProfile: PropTypes.func.isRequired,
  updateProfilePicture: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  classOwnership: state.auth.user.classOwnership,
  referralCode: state.auth.referralCode,
  activeEnrolledCourseId: state.auth.activeEnrolledCourseId,
  user: state.auth.user,
  dashboardData: state.course.dashboardData,
  classes: state.class.classes,
  error: state.error,
});
export default connect(mapStateToProps, {
  populateDashboard,
  getClasses,
  clearErrors,
})(SchoolProfile);
