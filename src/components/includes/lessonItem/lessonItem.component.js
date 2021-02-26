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

  console.log(isStudent);
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
                if (activeCoursePaidStatus || unlocked) {
                  props.addSubjectProgress(
                    inClass ? clazz._id : null,
                    lesson._id,
                    lesson.subjectId,
                    lesson.courseId,
                    recommendation(lesson._id),
                    lesson._id,
                    "lesson"
                  );
                }
              }}
            >
              <Tooltip
                overlay={
                  !activeCoursePaidStatus && !unlocked ? (
                    <Link
                      to={
                        inClass &&
                        clazz.enrolledCourse &&
                        !clazz.enrolledCourse.paymentIsActive
                          ? `/select-pay?courseId=${
                              clazz.enrolledCourse &&
                              !clazz.enrolledCourse.courseId
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
                    <span>Lesson video</span>
                  )
                }
                placement="top"
                trigger={["hover"]}
              >
                <Link
                  to={
                    activeCoursePaidStatus || unlocked
                      ? `/content/${slugify(props.courseName)}/${slugify(
                          props.subjectName
                        )}/${slugify(lesson.title)}/${item._id}?courseId=${
                          lesson.courseId
                        }&subjectId=${lesson.subjectId}&lessonId=${
                          lesson._id
                        }&videoId=${item._id}`
                      : inClass &&
                        clazz.enrolledCourse &&
                        !clazz.enrolledCourse.paymentIsActive
                      ? `/select-pay?courseId=${
                          clazz.enrolledCourse && clazz.enrolledCourse.courseId
                        }`
                      : "/select-pay"
                  }
                >
                  <div className="term_item_left_bottom_item ">
                    <FontAwesomeIcon icon={faPlay} />
                    <button>Lesson {index + 1}</button>
                  </div>
                </Link>
              </Tooltip>
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
                  {" "}
                  <Tooltip
                    overlay={
                      !activeCoursePaidStatus && !unlocked ? (
                        <Link
                          to={
                            inClass &&
                            clazz.enrolledCourse &&
                            !clazz.enrolledCourse.paymentIsActive
                              ? `/select-pay?courseId=${
                                  clazz.enrolledCourse &&
                                  !clazz.enrolledCourse.courseId
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
                      )
                    }
                    placement="top"
                    trigger={["hover"]}
                  >
                    <Link
                      to="/lesson/quiz/instructions"
                      onClick={updateQuizType}
                      className="quizButton"
                    >
                      Quiz
                    </Link>
                  </Tooltip>
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
          <Tooltip
            overlay={
              !activeCoursePaidStatus && !unlocked ? (
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
              )
            }
            placement="top"
            trigger={["hover"]}
          >
            <div
              className="term_item_left_bottom_item "
              onClick={() => {
                props.addRecentActivity(lesson._id, "lesson");
                if (activeCoursePaidStatus || unlocked) {
                  props.addSubjectProgress(
                    inClass ? clazz._id : null,
                    lesson._id,
                    lesson.subjectId,
                    lesson.courseId,
                    recommendation(lesson._id),
                    lesson._id,
                    "lesson"
                  );
                }
              }}
            >
              <Link
                to={
                  activeCoursePaidStatus || unlocked
                    ? `/classnote/${slugify(props.courseName)}/${slugify(
                        props.subjectName
                      )}/${slugify(lesson.title)}?courseId=${
                        lesson.courseId
                      }&subjectId=${lesson.subjectId}&lessonId=${
                        lesson._id
                      }&termId=${lesson.termId}`
                    : inClass &&
                      clazz.enrolledCourse &&
                      !clazz.enrolledCourse.paymentIsActive
                    ? `/select-pay?courseId=${
                        clazz.enrolledCourse && clazz.enrolledCourse.courseId
                      }`
                    : "/select-pay"
                }
                onClick={updateQuizType}
                className="quizButton"
              >
                Study Class Note
              </Link>
            </div>
          </Tooltip>{" "}
        </div>
      );
    }
  };

  return (
    <div key={lesson._id} className="term_item row">
      <div className="term_item_left col-md-12 accordion-item">
        <Tooltip
          overlay={
            !activeCoursePaidStatus && !unlocked ? (
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
            )
          }
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
            >
              <FontAwesomeIcon
                icon={faCheckCircle}
                color={isViewed ? "#26aa76" : "white"}
                className="mark-done"
              />
              {lesson.title}

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
                />
              </div>
            </div>
          ) : null}

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
