import React, { useEffect, useState } from "react";
import "./css/style.css";
import Downlaod from "../../../assets/img/Downlaod.svg";
import man from "../../../assets/img/man.png";
import menu from "../../../assets/img/menu.png";
import { Tooltip, Modal, Popover } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getSchoolProfile } from "../../../redux/actions/schoolActions";
import {
  getMembersInClass,
  schoolDeleteStudent,
  schoolDeleteTeacher,
  schoolUnlinkStudent,
  schoolUnlinkteacher,
} from "../../../redux/actions/classActions";
import Swal from "sweetalert2";
import "animate.css";
import { clearErrors } from "../../../redux/actions/errorActions";

const SchoolPeople = (props) => {
  const error = useSelector((state) => state.error);
  console.log("error", error);
  const user = useSelector((state) => state.auth.user);
  const school = useSelector((state) => state.school.school);
  const classMembers = useSelector((state) => state.class.classMembers);
  console.log("classMembers", classMembers);
  const admins = useSelector((state) => state.class.admins);
  console.log("admins", admins);
  console.log("school", school);
  const dispatch = useDispatch();

  const [teachersToDelete, setTeachersToDelete] = useState([]);
  const [studentsToDelete, setStudentsToDelete] = useState([]);
  const [selected, setSelected] = useState(
    school &&
      school.schoolClassesData &&
      school.schoolClassesData[0] &&
      school.schoolClassesData[0].classId
  );
  useEffect(() => {
    dispatch(getSchoolProfile(user.schoolId && user.schoolId._id));
    dispatch(getMembersInClass(selected));
  }, [selected]);

  if (
    error.id === "SCHOOL_DELETE_STUDENT_ACCOUNT_FAILURE" ||
    error.id === "SCHOOL_DELETE_TEACHER_ACCOUNT_FAILURE" ||
    error.id === "SCHOOL_UNLINK_TEACHER_ACCOUNT_FAILURE" ||
    error.id === "SCHOOL_UNLINK_STUDENT_ACCOUNT_FAILURE"
  ) {
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
    // props.clearErrors();
    dispatch(clearErrors());
  }
  console.log("selected", selected);
  const deleteMultiple = (list) => {
    console.log(list);
  };
  console.log("teachersToDelete", teachersToDelete);
  console.log("studentsToDelete", studentsToDelete);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [message, setMessage] = useState("");

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };
  return (
    <div id="schoolPeople">
      <Modal isOpen={showDeleteModal}>
        <div className="delete-modal">
          <h2>{message}</h2>
          <p>Do you want to delete All?</p>
          <button className="btn btn-primary" onClick={toggleDeleteModal}>
            Close
          </button>
          <button className="btn btn-danger">Delete</button>
        </div>
      </Modal>
      <section id="firstSection">
        <h2>People</h2>
      </section>
      <section id="secondSection">
        <div className="content">
          <div className="select-download">
            <select
              name="courses"
              id="courses"
              onChange={(e) => {
                e.preventDefault();
                setSelected(e.target.value);
              }}
            >
              {school &&
                school.schoolClassesData &&
                school.schoolClassesData.map((item) => (
                  <option value={item.classId}>{item.className}</option>
                ))}
            </select>
            <div>
              <img src={Downlaod} alt="Download Button" />
              <span>Download List</span>
            </div>
          </div>
          <div className="list-of-people">
            <head>
              <input
                type="checkbox"
                name="SelectAll"
                id="SelectAllTeachers"
                onChange={() => {
                  if (teachersToDelete.length === 0 && admins.length > 0) {
                    setTeachersToDelete(admins);
                    setMessage(`You have Selected ${admins.length} teacher(s)`);
                    toggleDeleteModal();
                  } else {
                    setTeachersToDelete([]);
                  }
                }}
              />
              <header>Teacher</header>
              <span>
                {admins.length} Teacher
                {admins.length && admins.length > 1 ? "s" : ""}
              </span>
            </head>
            {admins.map((item, index) => (
              <div className="list-of-people-item">
                <div>
                  <img src={man} alt="" height="100%" />
                  <span>{item && item.userId && item.userId.fullName}</span>
                </div>
                <span>{item && item.userId && item.userId.email}</span>
                <img
                  src={menu}
                  alt=""
                  className="cursor"
                  type="button"
                  id={`dropdownMenuButton1${index}`}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                />
                <ul
                  class="dropdown-menu"
                  aria-labelledby={`dropdownMenuButton1${index}`}
                >
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(
                          schoolDeleteTeacher(
                            item.userId._id,
                            user.schoolId && user.schoolId._id
                          )
                        );
                      }}
                    >
                      Delete
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(
                          schoolUnlinkteacher(
                            item.userId._id,
                            user.schoolId && user.schoolId._id
                          )
                        );
                      }}
                    >
                      Unlink
                    </a>
                  </li>
                </ul>
              </div>
            ))}

            <head>
              <input
                type="checkbox"
                name="SelectAll"
                id="SelectAllTeachers"
                onChange={() => {
                  if (
                    studentsToDelete.length === 0 &&
                    classMembers.length > 0
                  ) {
                    setStudentsToDelete(classMembers);
                    setMessage(
                      `You have Selected ${classMembers.length} student(s)`
                    );
                    toggleDeleteModal();
                  } else {
                    setStudentsToDelete([]);
                  }
                }}
              />
              <header>Student</header>
              <span>
                {classMembers.length} Pupil
                {classMembers.length && classMembers.length > 1 ? "s" : ""}
              </span>
            </head>
            {classMembers.map((item, index) => (
              <div className="list-of-people-item">
                <div>
                  <img src={man} alt="" height="100%" />
                  <span>{item && item.userId && item.userId.fullName}</span>
                </div>
                <span>{item && item.userId && item.userId.email}</span>
                <img
                  src={menu}
                  alt=""
                  className="cursor"
                  type="button"
                  id={`dropdownMenuButton1${index}`}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                />
                <ul
                  class="dropdown-menu"
                  aria-labelledby={`dropdownMenuButton1${index}`}
                >
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(
                          schoolDeleteStudent(
                            item.userId._id,
                            user.schoolId && user.schoolId._id
                          )
                        );
                      }}
                    >
                      Delete
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(
                          schoolUnlinkStudent(
                            item.userId._id,
                            user.schoolId && user.schoolId._id
                          )
                        );
                      }}
                    >
                      Unlink
                    </a>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SchoolPeople;
