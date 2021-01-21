import React, { useEffect, useRef } from "react";
import "./css/style.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  inputChange,
  getRoles,
  registerUser,
  loginUser,
  checkUserExists,
} from "./../../../redux/actions/authActions";
import { joinClassApproved } from "./../../../redux/actions/classActions";
import { clearErrors } from "./../../../redux/actions/errorActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import "animate.css";
import queryString from "query-string";

const Signup = (props) => {
  const { role, fullName, email, password, passwordMode, error } = props;

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      window.scrollTo(0, 0);
      props.inputChange("redirect", false);
      props.checkUserExists(parsed.email, parsed.classId);
    } else {
      if (error.id === "CHECK_USER_AND_JOIN_CLASS_SUCCESS") {
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
          position: "top-end",
        });
        props.clearErrors();
      } else if (error.id === "USER_JOIN_THROUGH_INVITE_SUCCESS") {
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
          position: "top-end",
        });
        props.clearErrors();
      }
    }
  });

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    props.inputChange(name, value);
  };

  const handlePasswordMode = () => {
    if (passwordMode) {
      props.inputChange("passwordMode", false);
    } else {
      props.inputChange("passwordMode", true);
    }
  };

  const handleSubmit = () => {
    let message;
    if (!password) {
      message = "Please select a password";
    } else if (!fullName) {
      message = "Please enter full name";
    } else if (!email) {
      message = "Please enter email";
    }

    if (!fullName || !email || !password) {
      Swal.fire({
        title: message,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        timer: 1500,
        position: "top-end",
      });
    } else {
      props.joinClassApproved(parsed.classId, email, fullName, password);
    }
  };
  console.log(props);
  const parsed = queryString.parse(props.location.search);
  console.log(parsed);

  return (
    <span id="signup">
      {/* {redirect ? <Redirect to={location} /> : null} */}
      <div id="signupFirstSection" className="container-fluid relative">
        <div className="row fly">
          <div className="overlay overlayAuth"></div>
          <div className="col-md-12">
            <h3>Join A Class</h3>
          </div>
          <div className="col-md-12">
            <select className="general" name="role" value={role}>
              <option selected> JSS 1</option>
              onChange={handleChange}
            </select>
          </div>

          <div className="col-md-12">
            <input
              type="text"
              placeholder="Full Name"
              className="general"
              name="fullName"
              value={fullName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12">
            <input
              type="email"
              placeholder="Email"
              className="general"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12 relative">
            <input
              type={passwordMode ? "password" : "text"}
              placeholder="Password"
              className="general"
              name="password"
              value={password}
              onChange={handleChange}
            />
            <Link onClick={handlePasswordMode}>
              <FontAwesomeIcon icon={faEye} />
            </Link>
          </div>

          <div className="col-md-12">
            <input
              type="submit"
              value="Join"
              className="general"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </span>
  );
};

Signup.propTypes = {
  inputChange: PropTypes.func.isRequired,
  getRoles: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  checkUserExists: PropTypes.func.isRequired,
  joinClassApproved: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  redirect: state.auth.redirect,
  // location: state.auth.location,
  role: state.auth.role,
  courseId: state.auth.courseId,
  fullName: state.auth.fullName,
  email: state.auth.email,
  password: state.auth.password,
  confirmPassword: state.auth.confirmPassword,
  referralCode: state.auth.referralCode,
  roles: state.auth.roles,
  classes: state.auth.classes,
  passwordMode: state.auth.passwordMode,
  error: state.error,
});
export default connect(mapStateToProps, {
  inputChange,
  getRoles,
  registerUser,
  clearErrors,
  loginUser,
  checkUserExists,
  joinClassApproved,
})(Signup);
