import React, { useEffect, useRef } from "react";
import "./css/style.css";
import { useHistory } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  inputChange,
  getRoles,
  registerNewChild,
  loginUser,
} from "../../../redux/actions/authActions";
import { clearErrors } from "../../../redux/actions/errorActions";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import "animate.css";
import queryString from "query-string";
import {
  getSchoolProfile,
  schoolAddExistingTeacher,
} from "../../../redux/actions/schoolActions";
import { clearSuccess } from "../../../redux/actions/successActions";

const SchoolAddTeacherToClass = (props) => {
  const {
    role,
    classId,
    email,
    roles,
    className,
    error,
    success,
  } = props;
  const history = useHistory();
  const parsed = queryString.parse(props.location.search);
  const mounted = useRef();

  const school = useSelector((state) => state.school.school);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      if (parsed.classId) {
        dispatch(inputChange("formClassId", parsed.classId));
      }
      dispatch(getSchoolProfile(parsed.schoolId));
      mounted.current = true;
      window.scrollTo(0, 0);
      props.inputChange("redirect", false);
      if (!roles.length) {
        props.getRoles();
      }
    }
  });
  if (error.id === "SCHOOL_ADD_EXISTING_TEACHER_FAILURE") {
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
  if (success.id === "SCHOOL_ADD_EXISTING_TEACHER_SUCCESS") {
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
    if (!classId) {
      message = "Please select a class";
    } else if (!email) {
      message = "Please enter email";
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
      dispatch(schoolAddExistingTeacher(email, parsed.schoolId, classId));
    }
  };

  const classSet = () => {
    if (school && school.schoolClassesData && school.schoolClassesData.length) {
      return school.schoolClassesData.map((item) => (
        <option value={item._id} key={item._id}>
          {item.className}
        </option>
      ));
    }
  };
  return (
    <span id="school-add-teacher">
      {/* {redirect ? <Redirect to={authlocation} /> : null} */}
      <div id="school-add-teacher-first-section">
        <h2>Add New Teacher</h2>
      </div>
      <div id="school-add-teacher-second-section" className="container-fluid">
        <div className="d-flex justify-content-center">
          <div className="form-field">
            <div className="row">
              <form onSubmit={handleSubmit}>
                <div className="col-md-12">
                  <h3>Add New Teacher</h3>
                  <p>
                    Send invite to your teachers for them to access the virtual
                    classroom
                  </p>
                </div>
                <div className="col-md-12">
                  <select
                    className="general no-appearance"
                    name="role"
                    value="602f3ce39b146b3201c2dc1d"
                    disabled
                  >
                    <option disabled value="602f3ce39b146b3201c2dc1d">
                      Teacher
                    </option>
                  </select>
                </div>
                <div className="col-md-12">
                  <select
                    className={`general ${
                      parsed.classId ? "no-appearance" : ""
                    }`}
                    name="formClassId"
                    value={classId}
                    onChange={handleChange}
                    required
                  >
                    <option> {className || "Select class"} </option>
                    {classSet()}
                  </select>
                </div>
                {role === "602f3ce39b146b3201c2dc1d" ? (
                  <div className="col-md-12">
                    <input
                      type="text"
                      placeholder="Class Name"
                      className="general"
                      name="className"
                      required
                      value={className}
                      onChange={handleChange}
                    />
                  </div>
                ) : (
                  ""
                )}
                {/* <div className="col-md-12">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="general"
                    name="formFullName"
                    required
                    value={fullName}
                    onChange={handleChange}
                  />
                </div> */}
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
                <div className="col-md-12 mt-3">
                  <input
                    type="submit"
                    value="Send Invite"
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
