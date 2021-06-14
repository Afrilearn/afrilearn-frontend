import { faPlay, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
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
import ReactPlayer from "react-player/lazy";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap_white.css";
import slugify from "react-slugify";

const LessonItem = (props) => {
  const {
    lesson,
    activeCoursePaidStatus,
    relatedLessons,
    unlocked,
    index,
    isViewed,
    inClass,
    clazz,
    role,
  } = props;
  const updateQuizType = () => {
    props.inputChange("examType", "quiz");
    props.inputChange("quizTitle", lesson.title);
    props.inputChange("quizLessonId", lesson._id);

    props.loadQuizQuestions(lesson.questions);
  };

  const isStudent = role === "5fd08fba50964811309722d5";

  const onClickQuiz = (lesson) => {
    if (activeCoursePaidStatus || unlocked) {
      props.addRecentActivity(lesson._id, "quiz");
    }
  };

  const quizToolTipsComponent = () => {
    return !activeCoursePaidStatus && !unlocked ? (
      <Link
        to={
          inClass &&
          clazz.enrolledCourse &&
          !clazz.enrolledCourse.paymentIsActive
            ? `/select-pay?courseId=${
                clazz.enrolledCourse && !clazz.enrolledCourse.courseId
              }`
            : "/select-pay"
        }
        onClick={(e) => {
          inClass && isStudent && e.preventDefault();
        }}
      >
        {inClass && isStudent
          ? "Content locked"
          : "Please subscribe to unlock content"}
      </Link>
    ) : (
      <span>Quiz</span>
    );
  };
  const lesonToolTipsComponent = () => {
    return !activeCoursePaidStatus && !unlocked ? (
      <Link
        to={
          inClass &&
          clazz.enrolledCourse &&
          !clazz.enrolledCourse.paymentIsActive
            ? `/select-pay?courseId=${
                clazz.enrolledCourse && !clazz.enrolledCourse.courseId
              }`
            : "/select-pay"
        }
        onClick={(e) => {
          inClass && isStudent && e.preventDefault();
        }}
      >
        Please subscribe to unlock content
      </Link>
    ) : (
      <span>Lesson video</span>
    );
  };
  const classnoteToolTipsComponent = () => {
    return !activeCoursePaidStatus && !unlocked ? (
      <Link
        to={
          inClass &&
          clazz.enrolledCourse &&
          !clazz.enrolledCourse.paymentIsActive
            ? `/select-pay?courseId=${
                clazz.enrolledCourse && clazz.enrolledCourse.courseId
              }`
            : inClass &&
              clazz.enrolledCourse &&
              !clazz.enrolledCourse.paymentIsActive
            ? `/select-pay?courseId=${
                clazz.enrolledCourse && clazz.enrolledCourse.courseId
              }`
            : "/select-pay"
        }
        onClick={(e) => {
          inClass && isStudent && e.preventDefault();
        }}
      >
        {inClass && isStudent
          ? "Content locked"
          : "Please subscribe to unlock content"}
      </Link>
    ) : (
      <span>Lesson note</span>
    );
  };
  const contentToolTipsComponent = () => {
    return !activeCoursePaidStatus && !unlocked ? (
      <Link
        to={
          inClass &&
          clazz.enrolledCourse &&
          !clazz.enrolledCourse.paymentIsActive
            ? `/select-pay?courseId=${
                clazz.enrolledCourse && clazz.enrolledCourse.courseId
              }`
            : "/select-pay"
        }
        onClick={(e) => {
          inClass && isStudent && e.preventDefault();
        }}
      >
        {inClass && isStudent
          ? "Content locked"
          : "Please subscribe to unlock content"}
      </Link>
    ) : (
      <span>View Content</span>
    );
  };

  const linkToLesson = (lesson, item) => {
    return activeCoursePaidStatus || unlocked
      ? `/content/${slugify(props.courseName)}/${slugify(
          props.subjectName
        )}/${slugify(lesson.title)}/${item._id}?courseId=${
          lesson.courseId
        }&subjectId=${lesson.subjectId}&lessonId=${lesson._id}&videoId=${
          item._id
        }&termId=${lesson.termId}`
      : inClass && clazz.enrolledCourse && !clazz.enrolledCourse.paymentIsActive
      ? `/select-pay?courseId=${
          clazz.enrolledCourse && clazz.enrolledCourse.courseId
        }`
      : "/select-pay";
  };
  const linkToClassNote = (lesson) => {
    return activeCoursePaidStatus || unlocked
      ? `/classnote/${slugify(props.courseName)}/${slugify(
          props.subjectName
        )}/${slugify(lesson.title)}?courseId=${lesson.courseId}&subjectId=${
          lesson.subjectId
        }&lessonId=${lesson._id}&termId=${lesson.termId}`
      : inClass && clazz.enrolledCourse && !clazz.enrolledCourse.paymentIsActive
      ? `/select-pay?courseId=${
          clazz.enrolledCourse && clazz.enrolledCourse.courseId
        }`
      : "/select-pay";
  };
  const linkToQuiz = () => {
    return activeCoursePaidStatus || unlocked
      ? "/lesson/quiz/instructions"
      : inClass && clazz.enrolledCourse && !clazz.enrolledCourse.paymentIsActive
      ? `/select-pay?courseId=${
          clazz.enrolledCourse && clazz.enrolledCourse.courseId
        }`
      : "/select-pay";
  };

  const lessonVideos = () => {
    if (lesson.videoUrls.length && lesson.videoUrls.length > 0) {
      return lesson.videoUrls.map((item, index) => {
        return (
          <>
            <div class="col-md-2" key={index}>
              <Tooltip
                overlay={lesonToolTipsComponent}
                placement="top"
                trigger={["hover"]}
              >
                <Link
                  to={() => linkToLesson(lesson, item)}
                  onClick={(e) => {
                    inClass &&
                      isStudent &&
                      !unlocked &&
                      !activeCoursePaidStatus &&
                      e.preventDefault();
                  }}
                >
                  <div className="term_item_left_bottom_item videoLessonBox">                   
                    <button>Watch Video Lesson {lesson.videoUrls.length !==1 ? index + 1:''}</button>
                  </div>
                </Link>
              </Tooltip>
            </div>
          </>
        );
      });
    }
  };

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return (
    <div key={lesson._id} className="term_item row">
      <div className="term_item_left col-md-12 accordion-item">
        <Tooltip
          overlay={contentToolTipsComponent}
          placement="top"
          trigger={["hover"]}
        >
          <h5 className="term_item_left_top accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapseOne${index}${lesson._id}`}
              aria-controls={`collapseOne${index}${lesson._id}`}
              aria-expanded="false"
            >
              <FontAwesomeIcon
                icon={faCheckCircle}
                color={isViewed ? "#84BB29" : "white"}
                className="mark-done"
              />
              <span class={`${isViewed ? "color-green" : "text-white"}`}>
                {toTitleCase(lesson.title)}
              </span>

              <div className="float-end">
                {!unlocked ? (
                  ""
                ) : (
                  <span class="badge h5 bg-green mr-10">FREE</span>
                )}
                <span
                  class={`${isViewed ? "color-green" : "text-white"} block-900`}
                >
                  {index + 1} of {props.length}
                </span>
              </div>
            </button>
          </h5>
        </Tooltip>
        <div
          className="term_item_left_bottom row accordion-collapse collapse"
          aria-labelledby="headingOne"
          data-bs-parent="#lessonsAccordion"
          id={`collapseOne${index}${lesson._id}`}
        >
          {lesson.videoUrls.length && lesson.videoUrls.length > 0 ? (
            <div class="col-md-3 thumb4">
              <Link
                to={() => linkToLesson(lesson, lesson.videoUrls[0])}
                onClick={(e) => {
                  inClass &&
                    isStudent &&
                    !unlocked &&
                    !activeCoursePaidStatus &&
                    e.preventDefault();
                }}
              >
                <div class="player-wrapper">
                  <ReactPlayer
                    url={
                      lesson.videoUrls.length &&
                      lesson.videoUrls.length > 0 &&
                      lesson.videoUrls[0].videoUrl
                    }
                    loop
                    muted
                    width="100%"
                    height="100%"
                    volume={0}
                    config={{
                      youtube: {
                        playerVars: { showinfo: 1 },
                      },
                    }}
                    muted={true}
                  />
                </div>
              </Link>
            </div>
          ) : null}

          {lessonVideos()}
          <div class="col-md-2">
            <Tooltip
              overlay={classnoteToolTipsComponent}
              placement="top"
              trigger={["hover"]}
            >
              <Link
                to={() => linkToClassNote(lesson)}
                onClick={(e) => {
                  inClass && isStudent && !activeCoursePaidStatus
                    ? e.preventDefault()
                    : updateQuizType();
                }}
                // className="quizButton"
              >
                <div className="term_item_left_bottom_item classnoteBox">
                  <button>Study Class Note</button>
                </div>
              </Link>
            </Tooltip>{" "}
          </div>

          {lesson.questions && lesson.questions.length > 0 ? (
            <div class="col-md-2">
              <Tooltip
                overlay={quizToolTipsComponent}
                placement="top"
                trigger={["hover"]}
              >
                <Link
                  to={() => linkToQuiz()}
                  onClick={(e) => {
                    inClass && isStudent && !activeCoursePaidStatus
                      ? e.preventDefault()
                      : updateQuizType();
                  }}
                  className="quizButton"
                >
                  <div
                    className="term_item_left_bottom_item classnoteBox"
                    onClick={() => onClickQuiz(lesson)}
                  >
                    <button>Practice Quiz</button>
                  </div>
                </Link>
              </Tooltip>
            </div>
          ) : null}
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
  clazz: state.class.class,
  inClass: state.auth.inClass,
  role: state.auth.role,
});

export default connect(mapStateToProps, {
  inputChange,
  loadQuizQuestions,
  addRecentActivity,
  addSubjectProgress,
})(LessonItem);
