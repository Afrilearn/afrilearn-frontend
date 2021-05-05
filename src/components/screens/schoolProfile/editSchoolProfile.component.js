import React, { useState, useEffect, useRef } from "react";
import Camera from "../../../assets/img/Camera.svg";
import InputField from "./inputField.component";
import { ButtonToggle, Form } from "reactstrap";
import Swal from "sweetalert2";
import {
  updateProfile,
  changePasswordFromProfile,
  updateProfilePicture,
} from "./../../../redux/actions/authActions";
import { clearErrors } from "./../../../redux/actions/errorActions";
import PropTypes from "prop-types";
import { connect, useDispatch, useSelector } from "react-redux";
import "./css/style.css";
import {
  getSchoolProfile,
  uploadSchoolCoverPhoto,
  uploadSchoolLogo,
  inputChange,
  uploadSchoolProfile,
  updateClassName,
} from "../../../redux/actions/schoolActions";
import { clearSuccess } from "../../../redux/actions/successActions";

const EditSchoolProfile = (props) => {
  const dispatch = useDispatch();
  const school = useSelector((state) => state.school.school);
  const coverPhoto = useSelector((state) => state.school.coverPhoto);
  const logo = useSelector((state) => state.school.logo);
  const name = useSelector((state) => state.school.name);
  const description = useSelector((state) => state.school.description);
  const regNumber = useSelector((state) => state.school.regNumber);
  const location = useSelector((state) => state.school.location);
  const phone = useSelector((state) => state.school.phone);
  const website = useSelector((state) => state.school.website);
  const { user, error } = props;

  const [newPassword, setNewPassword] = useState(null);

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

  const mounted = useRef();

  useEffect(() => {
    if (!mounted.current) {
      dispatch(getSchoolProfile(user.schoolId));
      mounted.current = true;
      window.scrollTo(0, 0);
    }
  });

  if (props.success.id === "UPLOAD_SCHOOL_PROFILE_SUCCESS") {
    const message =
      typeof props.success.msg === "object"
        ? props.success.msg.join("<br/>")
        : props.success.msg;
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
    dispatch(clearSuccess());
  }
  if (error.id === "PASSWORD_CHANGE_FROM_PROFILE_SUCCESS") {
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
  }
  const submitUpdate = () => {
    const data = {
      name,
      description,
      regNumber,
      location,
      phone,
      website,
    };
    console.log("data", data);
    dispatch(uploadSchoolProfile(user.schoolId, data));
  };
  return (
    <React.Fragment>
      <div
        id="schoolProfilePageSectionOne"
        style={{
          backgroundImage: `url(${coverPhoto})`,
        }}
      >
        <label>
          <img src={Camera} />
          <input
            type="file"
            onChange={(e) => {
              e.preventDefault();
              const data = new FormData();
              data.append("coverPhoto", e.target.files[0]);
              dispatch(uploadSchoolCoverPhoto(user.schoolId, data));
            }}
          />
        </label>
      </div>
      <div id="editSchoolProfile">
        <div
          className="round-image"
          style={{ backgroundImage: `url(${logo})` }}
        >
          <label>
            <img src={Camera} />
            <input
              type="file"
              onChange={(e) => {
                e.preventDefault();
                const data = new FormData();
                data.append("logo", e.target.files[0]);
                dispatch(uploadSchoolLogo(user.schoolId, data));
              }}
            />
          </label>
        </div>

        <div class="row justify-content-between">
          <div class="col">
            <ButtonToggle
              className="save-changes top"
              size="sm"
              onClick={() => submitUpdate()}
            >
              Save Changes
            </ButtonToggle>
          </div>
        </div>
        <div className="personal-details">
          <div>
            <Form id="schoolProfileForm">
              <InputField
                labelId="schoolName"
                placeholderId="schoolNamePlaceholder"
                placeholder={name}
                value={name}
                labelName="Name of School"
                onChange={(e) => {
                  e.preventDefault();
                  dispatch(inputChange("name", e.target.value));
                }}
                showLabel
              />
              <InputField
                labelId="schoolDescription"
                placeholderId="schoolNamePlaceholder"
                placeholder={description}
                value={description}
                labelName="Description of School"
                onChange={(e) => {
                  e.preventDefault();
                  dispatch(inputChange("description", e.target.value));
                }}
                showLabel
              />

              <InputField
                labelId="RegNumber"
                placeholderId="schoolRegNumber"
                placeholder={regNumber}
                value={regNumber}
                labelName="RegNumber"
                onChange={(e) => {
                  e.preventDefault();
                  dispatch(inputChange("regNumber", e.target.value));
                }}
                showLabel
              />
              <InputField
                labelId="phoneNumber"
                placeholderId="schoolPhoneNumber"
                placeholder={phone}
                value={phone}
                labelName="PhoneNumber"
                onChange={(e) => {
                  e.preventDefault();
                  dispatch(inputChange("phone", e.target.value));
                }}
                showLabel
              />
              <InputField
                labelId="websiteAddress"
                placeholderId="schoolWebsiteAddress"
                labelName="Website Address"
                placeholder={website}
                value={website}
                onChange={(e) => {
                  e.preventDefault();
                  dispatch(inputChange("website", e.target.value));
                }}
                showLabel
              />
              <InputField
                labelId="location"
                placeholderId="schoolLocation"
                placeholder="Location"
                labelName="Location"
                placeholder={location}
                value={location}
                showLabel
                onChange={(e) => {
                  e.preventDefault();
                  dispatch(inputChange("location", e.target.value));
                }}
              />
            </Form>
          </div>
        </div>
        <div>
          <h3
            style={{ borderBottom: "1px solid #26AA76", paddingLeft: 20 }}
            className="pb-3 pt-3"
          >
            Class Name
          </h3>
          <div>
            {school &&
              school.schoolClassesData &&
              school.schoolClassesData.map((item) => (
                <p
                  style={{ width: "100%" }}
                  className="d-flex justify-content-between pt-3 flex-wrap"
                >
                  <span className="font3" style={{ color: "white" }}>
                    {item.courseName}:
                  </span>

                  <span style={{ width: "88%" }}>
                    <input
                      type="text"
                      defaultValue={item.className}
                      style={{ color: "#828282" }}
                      onChange={(e) => {
                        e.preventDefault();
                        dispatch(updateClassName(item.classId, e.target.value));
                        console.log(item.classId, e.target.value);
                      }}
                    ></input>
                  </span>
                </p>
              ))}
          </div>
        </div>
        <div>
          <h3
            style={{ borderBottom: "1px solid #26AA76", paddingLeft: 20 }}
            className="pb-3 pt-5"
          >
            Security
          </h3>
          <div className="security-form">
            <span>Password:</span>
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
                Change Password
              </span>
            </form>
          </div>
          <ButtonToggle className="save-changes bottom" size="sm">
            Save Changes
          </ButtonToggle>
        </div>
      </div>
    </React.Fragment>
  );
};

EditSchoolProfile.propTypes = {
  inputChange: PropTypes.func.isRequired,
  populateDashboard: PropTypes.func.isRequired,
  getClasses: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  changePasswordFromProfile: PropTypes.func.isRequired,
  updateProfilePicture: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  error: state.error,
  success: state.success,
});

export default connect(mapStateToProps, {
  inputChange,
  updateProfile,
  clearErrors,
  updateProfilePicture,
  changePasswordFromProfile,
})(EditSchoolProfile);
