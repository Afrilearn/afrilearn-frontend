import React, { useEffect, useRef, useState } from "react";
import event from "../../../assets/img/event.png";
import "./css/style.css";
import { getCourse } from "./../../../redux/actions/courseActions";
import { getClass, assignContent } from "./../../../redux/actions/classActions";
import { clearErrors } from "./../../../redux/actions/errorActions";
import { connect, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import queryString from "query-string";

const AssignContent = (props) => {
  const parsed = queryString.parse(props.location.search);
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      window.scrollTo(0, 0);
      if (!classMembers.length) {
        props.getClass(parsed.classId);
      }
    } else {
      // do componentDidUpdate logic
      if (error.id === "ASSIGN_CONTENT_TO_STUDENT_SUCCESS") {
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
      }
    }
  });
  const { clazz, error } = props;
  const classRelatedSubjects = useSelector(
    (state) => state.class.classRelatedSubjects
  );
  let subjectsToDisplay = classRelatedSubjects;
  if (clazz?.subjectIds && clazz.subjectIds.length > 0) {
    subjectsToDisplay = classRelatedSubjects.filter((subject) =>
      clazz.subjectIds.find((i) => i.subjectId == subject._id)
    );
  }
  const classMembers = useSelector((state) => state.class.classMembers);

  const terms = [];
  const termIds = [
    { id: "5fc8d1b20fae0a06bc22db5c", name: "First Term" },
    { id: "600047f67cabf80f88f61735", name: "Second Term" },
    { id: "600048197cabf80f88f61736", name: "Third Term" },
  ];
  const [selectedTerm, setSelectedTerm] = useState(termIds[0].id);
  const [selectedSubject, setSelectedSubject] = useState(null);
  let subjects = [];
  if (clazz) {
    subjects = clazz.relatedSubjects;
  }

  const subject =
    subjectsToDisplay &&
    subjectsToDisplay.find((su) => su._id === selectedSubject);
  const lessons =
    subject &&
    subject.relatedLessons &&
    subject.relatedLessons.filter(
      (lesson) =>
        lesson.termId === selectedTerm && lesson.subjectId === selectedSubject
    );

  const members = [];
  classMembers.forEach((member) => {
    member.status === "approved" &&
      members.push({ _id: member.userId._id, name: member.userId.fullName });
  });

  const [selectedStudent, setSelectedStudent] = useState(["all"]);
  const [selectedQuizOrLesson, setSelectedQuizOrLesson] = useState([]);
  const [assignedText, setAssignedText] = useState(null);
  const [date, setDate] = useState(null);

  const getLessonName = (id) => {
    const item = lessons && lessons.find((lesson) => lesson._id == id);
    return item && item.title;
  };
  const getStudentName = (id) => {
    const item = members && members.find((member) => member._id == id);
    return item ? item.name : id;
  };

  const handleSubmit = () => {
    let message;
    if (!assignedText) {
      message = "Please enter assignment description";
    } else if (!selectedStudent) {
      message = "Please select Students";
    } else if (!selectedQuizOrLesson) {
      message = "Please select lessons";
    } else if (!date) {
      message = "Please select date";
    }

    if (!selectedStudent || !selectedQuizOrLesson || !assignedText || !date) {
      Swal.fire({
        title: message,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        timer: 1500,
        // position: "top-end",
      });
    } else {
      const data = {};
      data.description = assignedText;
      data.lessonIds = selectedQuizOrLesson;
      data.subjectId = selectedSubject;
      data.dueDate = date;
      if (selectedStudent.includes("all")) {
        data.audience = "all";
      } else {
        data.userIds = selectedStudent;
      }
      const classId = clazz && clazz._id;
      props.assignContent(data, classId);
    }
  };
  return (
    <div id="assignContentPage">
      <div id="assignContentPageSectionOne">
        <h1 className="font2 text-bottom">Assign Study Content</h1>
        {/* <h4 className="font2">Basic Technology</h4> */}
      </div>
      <div id="assignContentPageSectionTwo">
        <div class="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="input-textarea">
                <div className="row">
                  <div className="col-1">
                    <img src={event} alt="input" />
                  </div>
                  <div className="col-11">
                    <textarea
                      rows="12"
                      placeholder="Input study description"
                      onChange={(e) => {
                        e.preventDefault();
                        setAssignedText(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <select
                class="form-select form-control form-control-lg form-select-lg mb-3"
                name="selectedQuizOrLesson"
                aria-label=".form-select-lg example"
                onChange={(e) => {
                  e.preventDefault();
                  setSelectedSubject(e.target.value);
                }}
              >
                <option selected>Select subject</option>
                {subjectsToDisplay &&
                  subjectsToDisplay.map((subject) => (
                    <option value={subject._id}>
                      {subject &&
                        subject.mainSubjectId &&
                        subject.mainSubjectId.name}
                    </option>
                  ))}
              </select>
              <select
                class="form-select form-control form-control-lg form-select-lg mb-3"
                name="selectedQuizOrLesson"
                aria-label=".form-select-lg example"
                onChange={(e) => {
                  e.preventDefault();
                  setSelectedTerm(e.target.value);
                }}
              >
                <option disabled>Select term</option>
                {termIds.map((term) => (
                  <option value={term.id}>{term.name}</option>
                ))}
              </select>
              <select
                class="form-select form-control form-control-lg form-select-lg mb-3"
                name="selectedQuizOrLesson"
                aria-label=".form-select-lg example"
                onChange={(e) => {
                  e.preventDefault();
                  const newList = [...selectedQuizOrLesson];
                  if (!newList.includes(e.target.value)) {
                    newList.push(e.target.value);
                  }
                  setSelectedQuizOrLesson(newList);
                }}
              >
                <option disabled selected>
                  Select lesson
                </option>
                {lessons &&
                  lessons.map((lesson) => (
                    <option value={lesson._id}>{lesson.title}</option>
                  ))}
              </select>
              <div className="card my-2 text-center p-2 black-bag">
                <p>Selected lessons</p>
                {selectedQuizOrLesson && selectedQuizOrLesson.length > 0 && (
                  <small>Click on lesson item to remove</small>
                )}
                <ul class="list-group">
                  {selectedQuizOrLesson &&
                    selectedQuizOrLesson.length > 0 &&
                    selectedQuizOrLesson.map((item) => (
                      <li
                        class="list-group-item"
                        onClick={() => {
                          const newList = selectedQuizOrLesson.filter(
                            (n) => n !== item
                          );

                          setSelectedQuizOrLesson(newList || []);
                        }}
                      >
                        {getLessonName(item)}
                      </li>
                    ))}
                </ul>
                {selectedQuizOrLesson && selectedQuizOrLesson.length === 0 && (
                  <div>
                    <p>Nothing Here</p>
                    <small>Your selected lessons will appear here</small>
                  </div>
                )}
              </div>

              <select
                class="form-select form-control form-control-lg form-select-lg mb-3"
                name="selectedStudent"
                aria-label=".form-select-lg example"
                onChange={(e) => {
                  e.preventDefault();
                  if (e.target.value === "all") {
                    setSelectedStudent(["all"]);
                  } else {
                    const newList = [...selectedStudent];
                    const removedAll = newList.filter((item) => item !== "all");
                    if (!removedAll.includes(e.target.value)) {
                      removedAll.push(e.target.value);
                    }
                    setSelectedStudent(removedAll);
                  }
                }}
              >
                <option value="all" selected>
                  All students
                </option>
                {members.map((member) => (
                  <option value={member._id}>{member.name}</option>
                ))}
              </select>
              <div className="card my-2 text-center p-2 black-bag">
                <p>Selected students</p>
                {selectedStudent && selectedStudent.length > 0 && (
                  <small>Click on student item to remove</small>
                )}
                <ul class="list-group">
                  {selectedStudent &&
                    selectedStudent.length > 0 &&
                    selectedStudent.map((item) => (
                      <li
                        class="list-group-item"
                        onClick={() => {
                          const newList = selectedStudent.filter(
                            (n) => n !== item
                          );
                          setSelectedStudent(newList || []);
                        }}
                      >
                        {getStudentName(item)}{" "}
                      </li>
                    ))}
                </ul>
                {selectedStudent && selectedStudent.length === 0 && (
                  <div>
                    <p>Nothing Here</p>
                    <small>Your selected students will appear here</small>
                  </div>
                )}
              </div>
              <div className="date">
                <p className="text-white">Due Date</p>
                <input
                  type="date"
                  onChange={(e) => {
                    e.preventDefault();
                    setDate(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <button
            disabled={
              assignedText === "" ||
              selectedQuizOrLesson === "" ||
              selectedStudent === "" ||
              date === ""
            }
            onClick={handleSubmit}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

AssignContent.propTypes = {
  getClass: PropTypes.func.isRequired,
  assignContent: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  role: state.auth.user.role,
  clazz: state.class.class,
  error: state.error,
});
export default connect(mapStateToProps, {
  getCourse,
  getClass,
  assignContent,
  clearErrors,
})(AssignContent);
