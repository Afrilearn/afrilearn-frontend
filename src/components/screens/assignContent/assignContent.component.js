import React, { useEffect, useRef, useState } from "react";
import event from "../../../assets/img/event.png";
import "./css/style.css";
import { getCourse } from "./../../../redux/actions/courseActions";
import { getClass, assignContent } from "./../../../redux/actions/classActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AssignContent = (props) => {
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      window.scrollTo(0, 0);
      if (!classMembers.length) {
        props.getClass("5fc8f0fd5194183bf09b94fb");
      }
    } else {
      // do componentDidUpdate logic
    }
  });
  const { clazz, classMembers } = props;

  const lessons = [];
  clazz.relatedSubjects.forEach((subject) => {
    subject.relatedLessons.forEach((lesson) => {
      lessons.push({ _id: lesson._id, title: lesson.title });
    });
  });

  const members = [];
  classMembers.forEach((member) => {
    member.status === "approved" &&
      members.push({ _id: member._id, name: member.userId.fullName });
  });

  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedQuizOrLesson, setSelectedQuizOrLesson] = useState("");
  const [assignedText, setAssignedText] = useState("");
  const [date, setDate] = useState("");

  return (
    <div id="assignContentPage">
      <div id="assignContentPageSectionOne">
        <h1 className="font2 text-bottom">Assign Study Content</h1>
        <h4 className="font2">Basic Technology</h4>
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
                  setSelectedQuizOrLesson(e.target.value);
                }}
              >
                <option selected>select lesson or quiz</option>
                {lessons.map((lesson) => (
                  <option value={lesson._id}>{lesson.title}</option>
                ))}
              </select>
              <select
                class="form-select form-control form-control-lg form-select-lg mb-3"
                name="selectedStudent"
                aria-label=".form-select-lg example"
                onChange={(e) => {
                  e.preventDefault();
                  setSelectedStudent(e.target.value);
                }}
              >
                <option selected>select student</option>
                {members.map((member) => (
                  <option value={member._id}>{member.name}</option>
                ))}
              </select>
              <div className="date">
                <h3 className="text-white">Due Date</h3>
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
            onClick={() => {
              props.assignContent(
                assignedText,
                selectedQuizOrLesson,
                clazz._id,
                date,
                selectedStudent
              );
            }}
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
};

const mapStateToProps = (state) => ({
  role: state.auth.user.role,
  clazz: state.class.class,
  classMembers: state.class.classMembers,
});
export default connect(mapStateToProps, { getCourse, getClass, assignContent })(
  AssignContent
);
