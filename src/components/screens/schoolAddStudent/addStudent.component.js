import React, { useEffect, useRef } from "react";
import "./css/style.css";
import { useHistory } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  inputChange,
  getRoles,
  registerNewChild,
  loginUser,
} from "./../../../redux/actions/authActions";
import { clearErrors } from "./../../../redux/actions/errorActions";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import "animate.css";
import queryString from "query-string";
import {
  getSchoolProfile,
  schoolSignUpForStudent,
} from "../../../redux/actions/schoolActions";
import { clearSuccess } from "../../../redux/actions/successActions";

const SchoolAddTeacherToClass = (props) => {
  const {
    courseId,
    fullName,
    email,
    password,
    roles,
    passwordMode,
    confirmPasswordMode,
    error,
    classId,
    success,
  } = props;
  const history = useHistory();
  const parsed = queryString.parse(props.location.search);
  const mounted = useRef();

  const school = useSelector((state) => state.school.school);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!mounted.current) {
      dispatch(getSchoolProfile(parsed.schoolId));
      // do componentDidMount logic
      mounted.current = true;
      window.scrollTo(0, 0);
      props.inputChange("redirect", false);
      if (!roles.length) {
        props.getRoles();
      }
    }
  });

  if (error.id === "SCHOOL_SIGNUP_FOR_STUDENT_FAILURE") {
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
  if (success.id === "SCHOOL_SIGNUP_FOR_STUDENT_SUCCESS") {
    Swal.fire({
      html: `<div>${success.msg}</div>`,
      icon: "success",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
      confirmButtonText: "Okay",
      didClose: () => {
        history.push("/dashboard");
      },
    });
    dispatch(clearSuccess());
  }

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    props.inputChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let message = "";
    if (!courseId) {
      message = "Please select a class";
    } else if (!fullName) {
      message = "Please enter full name";
    } else if (!email) {
      message = "Please enter email";
    } else if (!password) {
      message = "Please enter password";
    }

    if (message) {
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
      dispatch(
        schoolSignUpForStudent(
          fullName,
          password,
          email,
          classId,
          parsed.schoolId,
          courseId
        )
      );
    }
  };

  const classSet = () => {
    if (school && school.schoolClassesData && school.schoolClassesData.length) {
      return school.schoolClassesData.map((item) => (
        <option value={item.courseId} key={item.courseId}>
          {item.className}
        </option>
      ));
    }
  };

  const getClassIdRelated = (courseId) => {
    const target =
      school &&
      school.schoolClassesData &&
      school.schoolClassesData.find((item) => item.courseId === courseId);
    return target.classId;
  };
  return (
    <span id="school-add-student">
      {/* {redirect ? <Redirect to={authlocation} /> : null} */}
      <div id="school-add-student-first-section">
        <h2>Add New Student</h2>
      </div>
      <div id="school-add-student-second-section" className="container-fluid">
        <div className="d-flex justify-content-center">
          <div className="form-field">
            <div className="row">
              <form onSubmit={handleSubmit}>
                <div className="col-md-12">
                  <h3>Register</h3>
                  <p>
                    Register your student on Afrilearn to start enjoying
                    unlimited access to curriculum relevant classnotes and video
                    lessons
                  </p>
                </div>
                <div className="col-md-12">
                  <select
                    className="general no-appearance"
                    name="role"
                    value="5fd08fba50964811309722d5"
                    disabled
                  >
                    <option disabled value="5fd08fba50964811309722d5">
                      Student
                    </option>
                  </select>
                </div>
                <div className="col-md-12">
                  <select
                    className={`general ${
                      parsed.courseId ? "no-appearance" : ""
                    }`}
                    name="formCourseId"
                    value={parsed.courseId || courseId}
                    onChange={(e) => {
                      handleChange(e);
                      dispatch(
                        inputChange(
                          "formClassId",
                          getClassIdRelated(e.target.value)
                        )
                      );
                    }}
                    disabled={parsed.courseId}
                  >
                    <option>Select class</option>
                    {classSet()}
                  </select>
                </div>

                <div className="col-md-12">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="general"
                    name="formFullName"
                    value={fullName}
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12">
                  <input
                    type="email"
                    placeholder="Email"
                    className="general"
                    name="formEmail"
                    value={email}
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12">
                  <input
                    type="password"
                    placeholder="Password"
                    className="general"
                    name="formPassword"
                    value={password}
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12 mt-3">
                  <input
                    type="submit"
                    value="Register"
                    className="general authSubmit"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </span>
  );
};

SchoolAddTeacherToClass.propTypes = {
  inputChange: PropTypes.func.isRequired,
  getRoles: PropTypes.func.isRequired,
  registerNewChild: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  parent: state.auth.user,
  redirect: state.auth.redirect,
  authlocation: state.auth.location,
  role: state.auth.role,
  classId: state.auth.formClassId,
  courseId: state.auth.formCourseId,
  fullName: state.auth.formFullName,
  email: state.auth.formEmail,
  password: state.auth.formPassword,
  confirmPassword: state.auth.formConfirmPassword,
  referralCode: state.auth.referralCode,
  roles: state.auth.roles,
  classes: state.auth.classes,
  className: state.auth.className,
  passwordMode: state.auth.passwordMode,
  confirmPasswordMode: state.auth.confirmPasswordMode,
  error: state.error,
  success: state.success,
});
export default connect(mapStateToProps, {
  inputChange,
  getRoles,
  registerNewChild,
  clearErrors,
  loginUser,
})(SchoolAddTeacherToClass);
