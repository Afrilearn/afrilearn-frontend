import { faAngleDown, faPlay, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import firstterm from "../../../assets/img/firstterm.png";
import "./css/style.css";
import { connect } from "react-redux";
import {
  inputChange,
  loadQuizQuestions,
} from "./../../../redux/actions/pastQuestionsActions";
import {
  addRecentActivity,
  addSubjectProgress,
} from "./../../../redux/actions/subjectActions";
import PropTypes from "prop-types";

const LessonItem = (props) => {
  const { lesson, seeMore, activeCoursePaidStatus, relatedLessons } = props;

  const updateQuizType = () => {
    props.inputChange("examType", "quiz");
    props.inputChange("quizTitle", lesson.title);
    props.inputChange("quizLessonId", lesson._id);

    props.loadQuizQuestions(lesson.questions);
  };

  const recommendation = (id) => {
    const mainList =
      relatedLessons && relatedLessons.filter((vid) => vid._id !== id);
    const random = Math.floor(Math.random() * mainList.length);

    return mainList[random];
  };

  const lessonVideos = () => {
    if (lesson.videoUrls.length) {
      return lesson.videoUrls.map((item, index) => {
        return (
          <div
            class="col-md-3"
            key={index}
            onClick={() => {
              props.addRecentActivity(lesson._id, "lesson");
              props.addSubjectProgress(
                lesson.classId,
                lesson._id,
                lesson.subjectId,
                lesson.courseId,
                recommendation(lesson._id),
                lesson._id
              );
            }}
          >
            <Link
              to={
                activeCoursePaidStatus
                  ? `/content/${lesson.courseId}/${lesson.subjectId}/${lesson._id}/${item._id}`
                  : "/select-pay"
              }
            >
              <div className="term_item_left_bottom_item ">
                <FontAwesomeIcon icon={faPlay} />
                <button>Lesson {index + 1}</button>
              </div>
            </Link>
          </div>
        );
      });
    }
  };

  return (
    <div key={lesson._id} className="term_item row">
      <div class="col-md-3">
        <div className="term_item_right">
          <img src={firstterm} alt="see this"></img>
        </div>
      </div>
      <div className="term_item_left col-md-9">
        <h5 className="term_item_left_top">
          {lesson.title}{" "}
          {!activeCoursePaidStatus ? <FontAwesomeIcon icon={faLock} /> : ""}
        </h5>
        <div className="term_item_left_bottom row">
          {lessonVideos()}
          <div class="col-md-3">
            <div
              className="term_item_left_bottom_item "
              onClick={() => {
                props.addRecentActivity(lesson._id, "quiz");
              }}
            >
              <Link
                to="/lesson/quiz/instructions"
                onClick={updateQuizType}
                className="quizButton"
              >
                Quiz
              </Link>
            </div>
          </div>
        </div>
      </div>
      <span className="term_item_see_more" onClick={seeMore}>
        <FontAwesomeIcon icon={faAngleDown} />
      </span>
    </div>
  );
};

LessonItem.propTypes = {
  inputChange: PropTypes.func.isRequired,
  loadQuizQuestions: PropTypes.func.isRequired,
  addRecentActivity: PropTypes.func.isRequired,
  addSubjectProgress: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeCoursePaidStatus: state.auth.activeCoursePaidStatus,
});

export default connect(mapStateToProps, {
  inputChange,
  loadQuizQuestions,
  addRecentActivity,
  addSubjectProgress,
})(LessonItem);
