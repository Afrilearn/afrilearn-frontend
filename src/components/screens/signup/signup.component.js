import React, { useEffect, useRef } from "react";
import "./css/style.css";
import { Link, Redirect } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  inputChange,
  getRoles,
  registerUser,
  loginUser,
} from "./../../../redux/actions/authActions";
import { clearErrors } from "./../../../redux/actions/errorActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import "animate.css";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import queryString from "query-string";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import { getCourseSubjects } from "../../../redux/actions/courseActions";
import Select from "react-select";

const Signup = (props) => {
  const dispatch = useDispatch();
  const subjectsForSignUp = useSelector(
    (state) => state.course.subjectsForSignUp
  );

  const {
    role,
    subjectId,
    courseId,
    fullName,
    email,
    password,
    roles,
    classes,
    redirect,
    authlocation,
    passwordMode,
    className,
    error,
    referralCode,
    schoolName,
    courseCategoryId,
    phoneNumber,
  } = props;

  const parsed = queryString.parse(props.location.search);
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      window.scrollTo(0, 0);
      props.inputChange("redirect", false);
      if (parsed.referralCode) {
        props.inputChange("referralCode", parsed.referralCode);
      }

      if (!roles.length) {
        props.getRoles();
      }
    } else {
      if (error.id === "REGISTER_FAILURE") {
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
          // position: 'top-end',,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    let message;
    if (!role) {
      message = "Please select a role";
    } else if (
      role !== "606ed82e70f40e18e029165e" &&
      role !== "607ededa2712163504210684" &&
      !courseId
    ) {
      message = "Please select a class";
    } else if (!subjectId && role === "602f3ce39b146b3201c2dc1d") {
      message = "Please select a subject";
    } else if (!fullName) {
      message = "Please enter full name";
    } else if (!email) {
      message = "Please enter email";
    } else if (!phoneNumber) {
      message = "Please enter Phone Number";
    } else if (!password) {
      message = "Please enter password";
    } else if (!className && role === "602f3ce39b146b3201c2dc1d") {
      message = "Please enter class name";
    } else if (role === "607ededa2712163504210684" && !schoolName) {
      message = "Please enter school name";
    }

    if (
      !role ||
      (role !== "606ed82e70f40e18e029165e" &&
        role !== "607ededa2712163504210684" &&
        !courseId) ||
      !fullName ||
      !phoneNumber ||
      !email ||
      !password ||
      (!className && role === "602f3ce39b146b3201c2dc1d") ||
      (!subjectId && role === "602f3ce39b146b3201c2dc1d")
    ) {
      Swal.fire({
        title: message,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        timer: 1500,
        // position: 'top-end',,
      });
    } else {
      const user = {
        role,
        courseId,
        fullName,
        email,
        password,
        confirmPassword: password,
        className,
        phoneNumber,
        channel: "web",
      };
      if (subjectId) {
        user.subjectIds = [subjectId];
      }
      if (courseCategoryId) {
        user.courseCategoryId = courseCategoryId;
      }
      if (schoolName) {
        user.schoolName = schoolName;
      }
      if (referralCode) {
        user.referralCode = referralCode;
      }
      console.log(
        "!subjectId && role === '602f3ce39b146b3201c2dc1d'",
        !subjectId && role === "602f3ce39b146b3201c2dc1d"
      );
      console.log("subjectId", !subjectId);
      console.log("user", user);
      props.registerUser(user);
      ReactGA.event({
        category: "User Signup",
        action: "User Clicked on the signup button",
      });
    }
  };

  const roleSet = () => {
    if (roles.length) {
      return roles.map((item) => {
        return <option value={item._id}>{item.name}</option>;
      });
    }
  };

  const classCategories = [
    { _id: "605b21868636bc00158b4ad6", name: "Primary" },
    { _id: "605b218f8636bc00158b4ad7", name: "Secondary" },
  ];
  const classSet = () => {
    if (classes.length) {
      return classes.map((item) => {
        return <option value={item._id}>{item.name}</option>;
      });
    }
  };
  const classCategorySet = () => {
    if (classCategories.length) {
      return classCategories.map((item) => {
        return <option value={item._id}>{item.name}</option>;
      });
    }
  };

  const onFailure = (error) => {
    console.log(error);
  };

  const googleLoginResponse = (googleUser) => {
    let token = googleUser.tokenId;
    const data = {
      token,
    };
    props.loginUser(data, true);
    ReactGA.event({
      category: "User Signup",
      action: "User Clicked on the signup button",
    });
  };

  const facebookLoginResponse = (response) => {
    let token = response.accessToken;

    const data = {
      token,
    };
    props.loginUser(data, false, true);
  };
  return (
    <span id="signup">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register | Myafrilearn.com</title>
        <meta name="description" content="Register on Afrilearn" />
      </Helmet>
      {redirect ? <Redirect to={authlocation} /> : null}
      <div id="signupFirstSection" className="container-fluid relative">
        <div className="row fly">
          <div className="overlay overlayAuth"></div>
          <form onSubmit={handleSubmit}>
            <div className="col-md-12">
              <h3>Register</h3>
            </div>
            <div className="col-md-12">
              <select
                className="general"
                name="role"
                value={role}
                onChange={(e) => {
                  handleChange(e);
                  props.inputChange("courseId", "");
                  props.inputChange("subjectId", "");
                }}
              >
                <option>Select a role</option>
                {roleSet()}
              </select>
            </div>
            {role !== "606ed82e70f40e18e029165e" &&
              role !== "607ededa2712163504210684" && (
                <div className="col-md-12">
                  <select
                    className="general"
                    name="courseId"
                    value={courseId}
                    onChange={(e) => {
                      handleChange(e);
                      dispatch(getCourseSubjects(e.target.value));
                    }}
                  >
                    <option>Select class</option>
                    {classSet()}
                  </select>
                </div>
              )}
            {role === "602f3ce39b146b3201c2dc1d" && (
              <div className="col-md-12">
                <select
                  className="general"
                  name="subjectId"
                  value={subjectId}
                  onChange={handleChange}
                >
                  <option>Select Subject</option>
                  {subjectsForSignUp.map((i, index) => (
                    <option key={index} value={i._id}>
                      {i.mainSubjectId.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {role === "602f3ce39b146b3201c2dc1d" ? (
              <div className="col-md-12">
                <input
                  type="text"
                  placeholder="Class Name"
                  className="general"
                  name="className"
                  value={className}
                  onChange={handleChange}
                />
              </div>
            ) : (
              ""
            )}

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
            {role === "607ededa2712163504210684" && (
              <div className="col-md-12">
                <input
                  type="text"
                  placeholder="School Name"
                  className="general"
                  name="schoolName"
                  value={schoolName}
                  onChange={handleChange}
                />
              </div>
            )}
            {role === "607ededa2712163504210684" && (
              <div className="col-md-12">
                <select
                  className="general"
                  name="courseCategoryId"
                  value={courseCategoryId}
                  onChange={handleChange}
                >
                  <option>Select class category</option>
                  {classCategorySet()}
                </select>
              </div>
            )}
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
            <div className="col-md-12">
              <input
                type="tel"
                placeholder="Phone Number"
                className="general"
                name="phoneNumber"
                value={phoneNumber}
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
            <div className="col-md-12 relative">
              <input
                type="text"
                placeholder={parsed.referralCode || "Referral Code"}
                className="general"
                name="referralCode"
                value={parsed.referralCode}
                onChange={handleChange}
                defaultValue={parsed.referralCode}
              />
              <p className="optional">
                <i>Optional</i>
              </p>
            </div>
            <div className="col-md-12 push">
              <p className="text-white1">
                By Signing Up for Afrilearn, you agree to our{" "}
                <Link to="/privacy_policy" className="underline">
                  Terms of use
                </Link>{" "}
                and{" "}
                <Link to="/privacy_policy" className="underline">
                  Privacy policy
                </Link>{" "}
              </p>
            </div>

            <div className="col-md-12">
              <input
                type="submit"
                value="Register"
                className="general authSubmit"
              />
            </div>
          </form>
          <div className="col-md-12">
            <div className="row push">
              <div className="col-md-6 social google">
                <GoogleLogin
                  clientId="910724713990-2ucr6telcqf9h2hnor2afd8vinmkldl5.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <span className="socialText">
                        <img
                          className="social"
                          src={require("../../../assets/img/google.png")}
                          alt="google"
                        />{" "}
                        Signup with Google
                      </span>
                    </button>
                  )}
                  buttonText="Login"
                  onSuccess={googleLoginResponse}
                  onFailure={onFailure}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
              <div className="col-md-6 push7 social facebook">
                {/* <FacebookLogin
                  appId="264373944539555"
                  autoLoad={false}
                  fields="name,email,picture"
                  isMobile={false}
                  redirectUri="https://www.exambly.com/"
                  callback={facebookLoginResponse}
                  render={(renderProps) => (
                    <button onClick={renderProps.onClick}>
                      <span className="socialText">
                        <img
                          className="social"
                          src={require("../../../assets/img/facebook.png")}
                          alt="facebook"
                        />{" "}
                        Signup with Facebook
                      </span>
                    </button>
                  )}
                /> */}
              </div>
            </div>
          </div>
          <div className="col-md-12 socialText push ">
            Already have an account?{" "}
            <b className="white">
              &nbsp; <Link to="/login">Log in</Link>
            </b>
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
};

const mapStateToProps = (state) => ({
  redirect: state.auth.redirect,
  authlocation: state.auth.location,
  role: state.auth.role,
  subjectId: state.auth.subjectId,
  courseId: state.auth.courseId,
  fullName: state.auth.fullName,
  phoneNumber: state.auth.phoneNumber,
  email: state.auth.email,
  password: state.auth.password,
  confirmPassword: state.auth.confirmPassword,
  referralCode: state.auth.referralCode,
  roles: state.auth.roles,
  classes: state.auth.classes,
  className: state.auth.className,
  courseCategoryId: state.auth.courseCategoryId,
  schoolName: state.auth.schoolName,
  passwordMode: state.auth.passwordMode,
  error: state.error,
});
export default connect(mapStateToProps, {
  inputChange,
  getRoles,
  registerUser,
  clearErrors,
  loginUser,
})(Signup);
