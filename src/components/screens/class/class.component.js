import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faBookReader,
  faMicrophone,
  faUser,
  faFileAlt,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import "./css/style.css";
import Box from "./../../includes/subjectBadgeForSlick/subjectBox.component";
import { connect } from "react-redux";
import { getCourse } from "./../../../redux/actions/courseActions";
import PropTypes from "prop-types";
import queryString from "query-string";

const ClassDisplay = (props) => {
  const {
    course,
    classNoteCount,
    subjectCount,
    videoLessonCount,
    quizQuestionsCount,
    numOfUsers,
  } = props;

  const parsed = queryString.parse(props.location.search);

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      window.scrollTo(0, 0);
      const {
        match: { params },
      } = props;
      props.getCourse(parsed.classId);
    } else {
      // do componentDidUpdate logic
    }
  });

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const subjectList = () => {
    if (course && course.relatedSubjects) {
      let subjects = course.relatedSubjects;
      return subjects.map((item) => {
        return (
          <Box
            courseId={course._id}
            subjectId={item._id}
            image={item.mainSubjectId.imageUrl}
            singleClass={true}
            compiledNotes={item.relatedLessons.length}
            lessons={item.relatedLessons}
            registeredUsers={50000}
            subjectName={item.mainSubjectId.name}
            introText={item.mainSubjectId.introText}
            courseName={course.alias}
            numOfUsers={numOfUsers}
          />
        );
      });
    }
  };

  return (
    <span id="classes">
      <div id="classFirstSection" className="container-fluid relative">
        <div className="row">
          <div className="col-md-12">
            <h1>{course.name ? course.name : "Hi"}</h1>
          </div>
        </div>
        <div className="row push2">
          <div className="col-md-4">
            <span className="box3">
              <FontAwesomeIcon icon={faPlay} color="black" />
            </span>
            &nbsp;&nbsp;{" "}
            {videoLessonCount && videoLessonCount > 0
              ? numberWithCommas(videoLessonCount)
              : 0}{" "}
            Video Lessons
          </div>
          <div className="col-md-4">
            <span className="box3">
              <FontAwesomeIcon icon={faMicrophone} color="black" />
            </span>
            &nbsp;&nbsp;{" "}
            {videoLessonCount && videoLessonCount > 0
              ? numberWithCommas(videoLessonCount)
              : 0}{" "}
            Audio Lessons
          </div>
          <div className="col-md-4">
            <span className="box3">
              <FontAwesomeIcon icon={faFileAlt} color="black" />
            </span>
            &nbsp;&nbsp;{" "}
            {classNoteCount && classNoteCount > 0
              ? numberWithCommas(classNoteCount)
              : 0}{" "}
            Class Notes
          </div>
        </div>
        <div className="row push2">
          <div className="col-md-4">
            <span className="box3 box4">
              <FontAwesomeIcon icon={faBookReader} color="white" />
            </span>
            &nbsp;&nbsp;{" "}
            {subjectCount && subjectCount > 0
              ? numberWithCommas(subjectCount)
              : 0}{" "}
            Subjects
          </div>
          <div className="col-md-4">
            <span className="box3 box4">
              <FontAwesomeIcon icon={faQuestion} color="white" />
            </span>
            &nbsp;&nbsp;{" "}
            {quizQuestionsCount && quizQuestionsCount > 0
              ? numberWithCommas(quizQuestionsCount)
              : 0}{" "}
            Exam Practice Questions
          </div>
          <div className="col-md-4">
            <span className="box3 box4">
              <FontAwesomeIcon icon={faUser} color="white" />
            </span>
            &nbsp;&nbsp;{" "}
            {numOfUsers && numOfUsers > 0 ? numberWithCommas(numOfUsers) : 0}{" "}
            Registered Students
          </div>
        </div>
        <div className="row push2 push3">
          <div className="col-md-3 font2">
            <h5>{course.name} Subjects</h5>
          </div>
        </div>
      </div>
      <div id="classSecondSection" className="container-fluid relative">
        <div className="row">{subjectList()}</div>
      </div>
    </span>
  );
};

ClassDisplay.propTypes = {
  getCourse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course.course,
  classNoteCount: state.course.classNoteCount,
  subjectCount: state.course.subjectCount,
  videoLessonCount: state.course.videoLessonCount,
  quizQuestionsCount: state.course.quizQuestionsCount,
  numOfUsers: state.course.numOfUsers,
});

export default connect(mapStateToProps, { getCourse })(ClassDisplay);
