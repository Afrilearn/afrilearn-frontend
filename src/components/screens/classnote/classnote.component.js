import React, { useEffect, useRef, useState } from "react";
import "./css/style.css";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faMicrophone,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link, Redirect } from "react-router-dom";
import {
  getSubjectAndRelatedLessons,
  addRecentActivity,
  addSubjectProgress,
} from "./../../../redux/actions/subjectActions";
import Speech from "../../includes/textToSpeech/textToSpeech.component";

import PropTypes from "prop-types";
import parse from "html-react-parser";
import queryString from "query-string";

import { Modal, ModalHeader, ModalBody, Tooltip } from "reactstrap";

import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import slugify from "react-slugify";
import { inputChange } from "../../../redux/actions/pastQuestionsActions";
import Countdown from "react-countdown";

const ClassNote = (props) => {
  const [modal1, setModal1] = useState(false);
  const toggle1 = (e) => {
    e.preventDefault();
    setModal1(!modal1);
  };
  const [modal2, setModal2] = useState(false);
  const toggle2 = () => {
    setModal2(!modal2);
  };
  const [modal3, setModal3] = useState(false);
  const toggle3 = () => {
    setModal3(!modal3);
  };
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggleToolPit = () => setTooltipOpen(!tooltipOpen);
  const parsed = queryString.parse(props.location.search);
  const { activeCoursePaidStatus, clazz, inClass } = props;
  const mounted = useRef();
  useEffect(() => {
    // if (!mounted.current) {
    // do componentDidMount logic
    // mounted.current = true;
    window.scrollTo(0, 0);
    props.getSubjectAndRelatedLessons(parsed.courseId, parsed.subjectId);
    storeProgress();
    // } else {
    //   window.scrollTo(0, 0);
    //   // do componentDidUpdate logic
    // }
  }, [parsed.lessonId]);
  var decodeEntities = (function () {
    // this prevents any overhead from creating the object each time
    var element = document.createElement("div");

    function decodeHTMLEntities(str) {
      if (str && typeof str === "string") {
        // strip script/html tags
        str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "");
        str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, "");
        element.innerHTML = str;
        str = element.textContent;
        element.textContent = "";
      }

      return str;
    }
    return decodeHTMLEntities;
  })();

  const terms = [];
  const termIds = [
    { id: "5fc8d1b20fae0a06bc22db5c", name: "First Term" },
    { id: "600047f67cabf80f88f61735", name: "Second Term" },
    { id: "600048197cabf80f88f61736", name: "Third Term" },
  ];
  termIds.forEach((item) => {
    const lessons =
      props.subject.relatedLessons &&
      props.subject.relatedLessons.filter((les) => les.termId === item.id);
    terms.push({ id: item.id, name: item.name, lessons });
  });

  const term = terms && terms?.find((term) => term.id === parsed.termId);

  const lessons =
    props.subject.relatedLessons &&
    props.subject.relatedLessons.filter((les) => les.termId === parsed.termId);

  const targetLesson = term?.lessons?.find(
    (lesson) => lesson._id === parsed.lessonId
  );

  const currentTermIndex =
    targetLesson &&
    terms &&
    terms?.findIndex((term) => term.id === targetLesson.termId);
  const nextTerm = terms[currentTermIndex + 1];
  const prevTerm = terms[currentTermIndex - 1];

  const currentLessonIndex = term?.lessons?.findIndex(
    (lesson) => lesson._id === parsed.lessonId
  );

  let nextLesson = {};
  if (term && term.lessons !== undefined) {
    if (currentLessonIndex !== term.lessons.length - 1) {
      nextLesson = term?.lessons[currentLessonIndex + 1];
    } else if (currentTermIndex !== terms.length - 1) {
      nextLesson = nextTerm && nextTerm.lessons[0];
    } else {
      nextLesson = null;
    }
  }

  let prevLesson = {};
  if (term && term.lessons !== undefined) {
    if (currentLessonIndex !== 0) {
      prevLesson = term?.lessons[currentLessonIndex - 1];
    } else if (currentTermIndex !== 0) {
      const goto = prevTerm && prevTerm.lessons && prevTerm.lessons.length - 1;
      prevLesson = prevTerm && prevTerm.lessons[goto];
    } else {
      prevLesson = null;
    }
  }

  let prevNotAllowed =
    prevLesson && !activeCoursePaidStatus && currentLessonIndex - 1 !== 0;
  let nextNotAllowed =
    nextLesson && !activeCoursePaidStatus && currentLessonIndex + 1 !== 0;
  let shareLink = `https://www.myafrilearn.com/`;

  const storeProgress = () => {
    props.addRecentActivity(parsed.lessonId, "lesson");
    props.addSubjectProgress(
      inClass ? clazz._id : null,
      parsed.lessonId,
      parsed.subjectId,
      parsed.courseId,
      parsed.lessonId,
      "lesson"
    );
  };
  const onClickClassNote = (lesson) => {
    props.addRecentActivity(lesson && lesson._id, "lesson");
    props.addSubjectProgress(
      inClass ? clazz._id : null,
      lesson && lesson._id,
      lesson && lesson.subjectId,
      lesson && lesson.courseId,
      lesson && lesson._id,
      "lesson"
    );
  };
  const onClickQuiz = (lesson) => {
    props.addRecentActivity(lesson && lesson._id, "quiz");
    props.addSubjectProgress(
      inClass ? clazz._id : null,
      lesson && lesson._id,
      lesson && lesson.subjectId,
      lesson && lesson.courseId,
      lesson && lesson._id,
      "quiz"
    );
  };

  const linkToNextLesson = `/classnote/${
    props.subject.courseId && slugify(props.subject.courseId.name)
  }/${
    props.subject.mainSubjectId && slugify(props.subject.mainSubjectId.name)
  }/${nextLesson && slugify(nextLesson.title)}?courseId=${
    parsed.courseId
  }&subjectId=${parsed.subjectId}&lessonId=${
    nextLesson && nextLesson._id
  }&termId=${nextLesson && nextLesson.termId}`;

  const [stopRedirect, setStopRedirect] = useState(false);
  return (
    <span>
      <Modal isOpen={modal1} toggle={toggle1} className="shareModalClass">
        <ModalHeader toggle={toggle1}>&nbsp;</ModalHeader>
        <ModalBody>
          <ul className="share-content">
            <li>
              <Link>
                <WhatsappShareButton url={shareLink}>
                  <WhatsappIcon size={30} round={true} />
                  &nbsp;&nbsp;&nbsp;Share via Whatsapp
                </WhatsappShareButton>
              </Link>
            </li>
            <li>
              <Link>
                <FacebookShareButton url={shareLink}>
                  <FacebookIcon size={30} round={true} />
                  &nbsp;&nbsp;&nbsp;Share via Facebook
                </FacebookShareButton>
              </Link>
            </li>
            <li>
              <Link>
                <TelegramShareButton url={shareLink}>
                  <TelegramIcon size={30} round={true} />
                  &nbsp;&nbsp;&nbsp;Share via Telegram
                </TelegramShareButton>
              </Link>
            </li>
            <li>
              <Link>
                <TwitterShareButton url={shareLink}>
                  <TwitterIcon size={30} round={true} />
                  &nbsp;&nbsp;&nbsp;Share via Twitter
                </TwitterShareButton>
              </Link>
            </li>
            <li>
              <Link>
                <EmailShareButton url={shareLink}>
                  <EmailIcon size={30} round={true} />
                  &nbsp;&nbsp;&nbsp;Share via Email
                </EmailShareButton>
              </Link>
            </li>
            <li>
              <Link>
                <LinkedinShareButton url={shareLink}>
                  <LinkedinIcon size={30} round={true} />
                  &nbsp;&nbsp;&nbsp;Share via Linkedin
                </LinkedinShareButton>
              </Link>
            </li>
          </ul>
        </ModalBody>
      </Modal>
      <Modal isOpen={modal2} toggle={toggle2}>
        <ModalHeader
          toggle={() => {
            toggle2();
            setStopRedirect(true);
          }}
        >
          &nbsp;
        </ModalHeader>
        <ModalBody>
          <div className="next-lesson-or-quiz">
            {nextLesson ? (
              <div>
                <h4>
                  You have completed "{targetLesson && targetLesson.title}"{" "}
                </h4>
                {targetLesson &&
                targetLesson.questions &&
                targetLesson &&
                targetLesson.questions.length > 0 ? (
                  <div>
                    <p>Next: Quiz</p>
                    <Link to="/lesson/quiz/instructions">
                      <button
                        onClick={() => {
                          props.inputChange(
                            "nextLessonLocation",
                            linkToNextLesson
                          );
                          onClickQuiz(nextLesson);
                          toggle2();
                          setStopRedirect(true);
                        }}
                      >
                        Go to Quiz
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div>
                    <p>Next: "{nextLesson.title}"</p>
                    <Link to={linkToNextLesson}>
                      <button
                        onClick={() => {
                          toggle2();
                          setStopRedirect(true);
                        }}
                      >
                        Go to Next Lesson
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <p>You have completed Lessons in this Section </p>
                <Link to={`/content/${parsed.courseId}/${parsed.subjectId}`}>
                  <button
                    onClick={() => {
                      toggle2();
                      setStopRedirect(true);
                    }}
                  >
                    Go to Subject Page
                  </button>
                </Link>
              </div>
            )}
            <p className="my-2">
              You will be redirected in{" "}
              <Countdown
                renderer={({ hours, minutes, seconds }) => (
                  <span>{seconds}</span>
                )}
                date={Date.now() + 9000}
                onComplete={() => {
                  toggle2();
                  if (!stopRedirect) {
                    if (nextLesson) {
                      if (
                        targetLesson &&
                        targetLesson.questions &&
                        targetLesson &&
                        targetLesson.questions.length > 0
                      ) {
                        props.history.push("/lesson/quiz/instructions");
                      } else {
                        props.history.push(linkToNextLesson);
                      }
                    } else {
                      props.history.push(
                        `/content/${parsed.courseId}/${parsed.subjectId}`
                      );
                    }
                  }
                }}
              />
            </p>
          </div>
        </ModalBody>
      </Modal>
      <Modal isOpen={modal3} toggle={toggle3}>
        <ModalHeader toggle={toggle3}>&nbsp;</ModalHeader>
        <ModalBody>
          <div className="next-lesson-or-quiz py-5 px-2">
            <h3>You need to subscribe to access this content!</h3>
            <p>
              Subscribe now to unlock all videos, class notes, tests & more in
              this class.
            </p>
            <Link to="/select-pay">
              <button>SUBSCRIBE NOW</button>
            </Link>
          </div>
        </ModalBody>
      </Modal>

      <div id="classNoteFirstSection" className="container-fluid relative">
        <div className="row">
          <div className="col-md-12">
            <h1>{targetLesson && targetLesson.title}</h1>
          </div>
        </div>
      </div>
      <div id="classNoteSecondSection" className="container-fluid relative">
        <div className="row">
          <div className="col-md-5">
            <Link to={`/content/${parsed.courseId}/${parsed.subjectId}`}>
              <span className="backArrow">
                {" "}
                <img
                  src={require("../../../assets/img/back-arrow.png")}
                  alt="back button"
                />{" "}
                &nbsp; Go back to Lesson
              </span>
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link onClick={toggle1}>
              <FontAwesomeIcon icon={faShareAlt} color="white" size="lg" />
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Speech
              content={decodeEntities(targetLesson && targetLesson.content)}             
            />
          </div>
          <div className="col-md-7"></div>
        </div>
        <div className="row">
          <div className="col-md-12 title">
            {targetLesson && targetLesson.title}
          </div>
          <div className="col-md-12">
            <p className="content">
              {targetLesson && parse(targetLesson.content)}
            </p>
          </div>
        </div>
        <div id="navigation">
          <Link
            to={
              prevLesson
                ? `/classnote/${
                    props.subject.courseId &&
                    slugify(props.subject.courseId.name)
                  }/${
                    props.subject.mainSubjectId &&
                    slugify(props.subject.mainSubjectId.name)
                  }/${prevLesson && slugify(prevLesson.title)}?courseId=${
                    parsed.courseId
                  }&subjectId=${parsed.subjectId}&lessonId=${
                    prevLesson && prevLesson._id
                  }&termId=${prevLesson && prevLesson.termId}`
                : `/content/${parsed.courseId}/${parsed.subjectId}`
            }
            onClick={(e) => {
              prevNotAllowed && e.preventDefault();
            }}
            className="button button1"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-html="true"
            title={
              prevLesson
                ? prevNotAllowed
                  ? "Subscribe to unlock"
                  : prevLesson.title
                : "Subject Page"
            }
          >
            <FontAwesomeIcon
              icon={faAngleLeft}
              className="arrow"
              color="#84BB29"
            />
            <div>
              {prevLesson ? (
                <p className="p1">
                  Previous <span className="hide-900">Lesson</span>
                </p>
              ) : (
                <p>Back to</p>
              )}
              <h6 className="custom-green">
                {prevLesson
                  ? prevLesson.title && prevLesson.title.slice(0, 20)
                  : "Subject Page"}
                {prevLesson && prevLesson.title && prevLesson.title.length > 20
                  ? "..."
                  : null}
              </h6>
            </div>
          </Link>
          <div className="text">
            Lesson {currentLessonIndex + 1} of{" "}
            {props.subject && lessons && lessons.length}
          </div>
          <div
            onClick={(e) => {
              if (nextNotAllowed) {
                e.preventDefault();
                if (!activeCoursePaidStatus) {
                  return toggle3();
                }
              } else {
                toggle2();
              }
            }}
            className="button button2"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-html="true"
            title={
              nextLesson
                ? nextNotAllowed
                  ? "Subscribe to unlock"
                  : nextLesson.title
                : "Subject Page"
            }
          >
            <div>
              <p>{nextLesson ? "Next Lesson" : "Back to"}</p>
              <h6 className="custom-green">
                {nextLesson
                  ? nextLesson.title && nextLesson.title.slice(0, 20)
                  : "Subject Page"}
                {nextLesson && nextLesson.title && nextLesson.title.length > 20
                  ? "..."
                  : null}
              </h6>
            </div>
            <FontAwesomeIcon
              icon={faAngleRight}
              className="arrow"
              color="#84BB29"
            />
          </div>
        </div>
      </div>
    </span>
  );
};
ClassNote.propTypes = {
  getSubjectAndRelatedLessons: PropTypes.func.isRequired,
  addRecentActivity: PropTypes.func.isRequired,
  addSubjectProgress: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  clazz: state.class.class,
  inClass: state.auth.inClass,
  user: state.auth.user.role,
  course: state.course.course,
  subject: state.subject.subject,
  activeCoursePaidStatus: state.auth.activeCoursePaidStatus,
});

export default connect(mapStateToProps, {
  getSubjectAndRelatedLessons,
  addRecentActivity,

  addSubjectProgress,
  inputChange,
})(ClassNote);
