import React, { useEffect, useRef, useState } from "react";
import "./css/style.css";
import { useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
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
import { schoolSignUpForAdmin } from "../../../redux/actions/schoolActions";
import { clearSuccess } from "../../../redux/actions/successActions";

const SchoolAddAdmin = (props) => {
  const { error, success } = props;
  const history = useHistory();
  const parsed = queryString.parse(props.location.search);
  const mounted = useRef();

  const dispatch = useDispatch();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      window.scrollTo(0, 0);
      props.inputChange("redirect", false);
    }
  });
  if (error.id === "SCHOOL_SIGNUP_FOR_ADMIN_FAILURE") {
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
  if (success.id === "SCHOOL_SIGNUP_FOR_ADMIN_SUCCESS") {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      schoolSignUpForAdmin(
        fullName,
        password,
        confirmPassword,
        email,
        parsed.schoolId,
        roleDescription
      )
    );
  };

  return (
    <span id="school-add-teacher">
      {/* {redirect ? <Redirect to={authlocation} /> : null} */}
      <div id="school-add-teacher-first-section">
        <h2>Add New Admin</h2>
      </div>
      <div id="school-add-teacher-second-section" className="container-fluid">
        <div className="d-flex justify-content-center">
          <div className="form-field">
            <div className="row">
              <form onSubmit={handleSubmit}>
                <div className="col-md-12">
                  <h3>Add New Admin</h3>
                  <p>Sign Up for Admin to join your school</p>
                </div>

                <div className="col-md-12">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="general"
                    required
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="col-md-12">
                  <input
                    type="email"
                    placeholder="Email"
                    className="general"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="col-md-12">
                  <input
                    type="password"
                    placeholder="Password"
                    className="general"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="col-md-12">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="general"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="col-md-12">
                  <input
                    type="text"
                    placeholder="Role Description e.g Vice Principal"
                    className="general"
                    onChange={(e) => setRoleDescription(e.target.value)}
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

SchoolAddAdmin.propTypes = {
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
})(SchoolAddAdmin);
