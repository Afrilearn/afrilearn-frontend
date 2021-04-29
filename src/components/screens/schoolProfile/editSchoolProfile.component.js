import React, { useState, useEffect, useRef } from 'react';
import school from "../../../assets/img/defaultSchoolLogo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputField from './inputField.component';
import {
    faMapMarker,
    faEdit,
    faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
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
import moment from "moment";
import Swal from "sweetalert2";
import {
    inputChange,
    updateProfile,
    changePasswordFromProfile,
    updateProfilePicture,
} from "./../../../redux/actions/authActions";
import { clearErrors } from "./../../../redux/actions/errorActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import './css/style.css'

const EditSchoolProfile = (props) => {
    const {
        user,
        // dashboardData,
        // populateDashboard,
        // activeEnrolledCourseId,
        // getClasses,
        // classes,
        error,
        // referralCode,
    } = props;
    const [newProfilePic, setNewProfilePic] = useState(null);
    const [photoToUpload, setPhotoToUpload] = useState(null);
    const [newName, setNewName] = useState(null);
    const [newPhone, setNewPhone] = useState(null);
    const [newAge, setnewAge] = useState(null);
    const [newState, setnewState] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [newCountry, setnewCountry] = useState(null);
    const [dropdownOpen, setOpen] = useState(false);

    const toggle = () => setOpen(!dropdownOpen);
    const [editPicDropDownOpen, setEditPicDropDownOpen] = useState(false);
    const toggleEditDropDown = () => setEditPicDropDownOpen(!editPicDropDownOpen);

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
            // do componentDidMount logic
            mounted.current = true;
            window.scrollTo(0, 0);
            props.inputChange("redirect", false);
            // const data = {
            //     enrolledCourseId: activeEnrolledCourseId,
            // };
            // populateDashboard(activeEnrolledCourseId ? data : null);
            // getClasses();
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

    return (
        <React.Fragment>
            <div id="schoolProfilePageSectionOne"></div>
            <div id="editSchoolProfile">
                <div
                    className="round-image dropdown-toggle"
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    {newProfilePic && (
                        <img src={newProfilePic} width="100%" alt="check out"></img>
                    )}
                    {!newProfilePic && <img src={school} alt="check out"></img>}
                    {!newProfilePic && (
                        <FontAwesomeIcon icon={faPencilAlt} className="round-image-icon" />
                    )}
                </div>

                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li>
                        <div className="input-group mb-3">
                            <label className="input-group-text" HtmlFor="inputGroupFile01">
                                Select image
              </label>
                            <input
                                type="file"
                                class="form-control"
                                id="inputGroupFile01"
                                onChange={(e) => {
                                    setNewProfilePic(URL.createObjectURL(e.target.files[0]));
                                    setPhotoToUpload(e.target.files[0]);
                                }}
                            />
                        </div>
                    </li>
                    {newProfilePic && (
                        <li>
                            <button
                                type="button"
                                class="btn btn-danger"
                                onClick={() => {
                                    setNewProfilePic(null);
                                }}
                            >
                                Discard
              </button>
                        </li>
                    )}
                </ul>
                <div class="row justify-content-between">
                    <div class="col">
                        <ButtonToggle
                            className="save-changes top"
                            size="sm"
                        // onClick={showDetailsPage}
                        >
                            Save Changes
                        </ButtonToggle>
                    </div>
                </div>
                <div className="personal-details">
                    <div>
                        <Form id='schoolProfileForm'>
                            <InputField
                                labelId='schoolName'
                                placeholderId='schoolNamePlaceholder'
                                placeholder={user && user.fullName}
                                value={user && user.fullName}
                                labelName='Name of School'
                                onChange={(e) => {
                                    e.preventDefault();
                                    setNewName(e.target.value);
                                }}
                                showLabel
                            />
                            <InputField
                                labelId='emailAddress'
                                placeholderId='emailAddressPlaceholder'
                                placeholder={user && user.email}
                                value={user && user.email}
                                labelName='Email Address'
                                showLabel
                            />
                            <InputField
                                labelId='phoneNumber'
                                placeholderId='schoolPhoneNumber'
                                placeholder={
                                    user && user.phoneNumber ? user.phoneNumber : ""
                                }
                                value={
                                    user && user.phoneNumber ? user.phoneNumber : ""
                                }
                                labelName='PhoneNumber'
                                onChange={(e) => {
                                    e.preventDefault();
                                    setNewPhone(e.target.value);
                                }}
                                showLabel
                            />
                            <InputField
                                labelId='websiteAddress'
                                placeholderId='schoolWebsiteAddress'
                                placeholder='Website Address'
                                labelName='Website Address'
                            />
                            <InputField
                                labelId='location'
                                placeholderId='schoolLocation'
                                placeholder='Location'
                                labelName='Location'
                            />
                        </Form>
                    </div>
                </div>
                <div >
                    <h3 style={{ borderBottom: '1px solid #26AA76', paddingLeft: 20 }}
                        className='pb-3 pt-3'>
                        Class Name
                    </h3>
                    <div>
                        <p style={{ width: '100%' }} className='d-flex justify-content-between pt-3 flex-wrap' >
                            <span className='font3' style={{color: 'white'}}>JSS1:</span>
                            <span style={{ width: '88%' }}>
                                <input type='text'
                                    value='Junior Secondary School One'
                                    style={{ color: '#828282' }}
                                ></input>
                            </span>
                        </p>
                        <p style={{ width: '100%' }} className='d-flex justify-content-between pt-3 flex-wrap' >
                            <span>JSS2:</span>
                            <span style={{ width: '88%' }}>
                                <input type='text'
                                    value='Junior Secondary School Two'
                                    style={{ color: '#828282' }}
                                ></input>
                            </span>
                        </p>
                        <p style={{ width: '100%' }} className='d-flex justify-content-between pt-3 flex-wrap' >
                            <span>JSS3:</span>
                            <span style={{ width: '88%' }}>
                                <input type='text'
                                    value='Junior Secondary School Three'
                                    style={{ color: '#828282' }}
                                ></input>
                            </span>
                        </p>
                        <p style={{ width: '100%' }} className='d-flex justify-content-between pt-3 flex-wrap' >
                            <span>SSS1:</span>
                            <span style={{ width: '88%' }}>
                                <input type='text'
                                    value='Senior Secondary School One'
                                    style={{ color: '#828282' }}
                                ></input>
                            </span>
                        </p>
                        <p style={{ width: '100%' }} className='d-flex justify-content-between pt-3 flex-wrap' >
                            <span>SSS2:</span>
                            <span style={{ width: '88%' }}>
                                <input type='text'
                                    value='Senior Secondary School Two'
                                    style={{ color: '#828282' }}
                                ></input>
                            </span>
                        </p>
                        <p style={{ width: '100%' }} className='d-flex justify-content-between pt-3 flex-wrap' >
                            <span>SSS3:</span>
                            <span style={{ width: '88%' }}>
                                <input type='text'
                                    value='Senior Secondary School Three'
                                    style={{ color: '#828282' }}
                                ></input>
                            </span>
                        </p>
                    </div>
                </div>
                <div>
                    <h3 style={{ borderBottom: '1px solid #26AA76', paddingLeft: 20 }}
                        className='pb-3 pt-5'>
                        Security
                    </h3>
                    <div className='security-form'>
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
                    <ButtonToggle
                            className="save-changes bottom"
                            size="sm"
                        // onClick={showDetailsPage}
                        >
                            Save Changes
                        </ButtonToggle>
                </div>
                
                
            </div>

        </React.Fragment>
    )
}

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
    // classOwnership: state.auth.user.classOwnership,
    // referralCode: state.auth.referralCode,
    // activeEnrolledCourseId: state.auth.activeEnrolledCourseId,
    user: state.auth.user,
    // dashboardData: state.course.dashboardData,
    // classes: state.class.classes,
    error: state.error,
});

export default connect(mapStateToProps, {
    inputChange,
    updateProfile,
    clearErrors,
    updateProfilePicture,
    changePasswordFromProfile,
})(EditSchoolProfile);