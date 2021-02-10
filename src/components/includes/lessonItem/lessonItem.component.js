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
  const {
    lesson,
    seeMore,
    activeCoursePaidStatus,
    relatedLessons,
    unlocked,
    index,
    id,
  } = props;

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
    if (lesson.videoUrls.length && lesson.videoUrls.length > 0) {
      return lesson.videoUrls.map((item, index) => {
        return (
          <>
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
                  lesson._id,
                  "lesson"
                );
              }}
            >
              <Link
                to={
                  activeCoursePaidStatus || unlocked
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
            {lesson.questions.length &&
            lesson.videoUrls.length - 1 === index ? (
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
            ) : (
              ""
            )}
          </>
        );
      });
    } else {
      return (
        <div class="col-md-3">
          <div
            className="term_item_left_bottom_item "
            onClick={() => {
              props.addRecentActivity(lesson._id, "lesson");
            }}
          >
            <Link
              to={`/classnote/${lesson.courseId}/${lesson.subjectId}/${lesson._id}`}
              onClick={updateQuizType}
              className="quizButton"
            >
              Lesson Note
            </Link>
          </div>
        </div>
      );
    }
  };

  return (
    <div key={lesson._id} className="term_item row">
      <div className="term_item_left col-md-12 accordion-item">
        <h5 className="term_item_left_top accordion-header">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapseOne${index}${lesson._id}`}
            aria-expanded="true"
            aria-controls={`collapseOne${index}${lesson._id}`}
          >
            {lesson.title+'  '}
            {!activeCoursePaidStatus && !unlocked ? (
                <FontAwesomeIcon icon={faLock} />
            ) : (
              ""
            )}
          </button>
        </h5>
        <div
          className="term_item_left_bottom row accordion-collapse collapse"
          aria-labelledby="headingOne"
          data-bs-parent="#lessonsAccordion"
          id={`collapseOne${index}${lesson._id}`}
        >
          {lessonVideos()}
        </div>
      </div>
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
