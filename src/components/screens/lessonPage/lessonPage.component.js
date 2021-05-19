import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faBook,
  faMicrophone,
  faTimes,
  faInfoCircle,
  faShareAlt,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

import "./css/style.css";
import firstterm from "../../../assets/img/firstterm.png";
import ThumbUp from "../../../assets/img/thumbs.gif";
import dots from "../../../assets/img/dots.png";
import { Collapse, Popover, PopoverBody } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import ReactPlayer from "react-player/lazy";
import Speech from "../../includes/textToSpeech/textToSpeech.component";
import {
  loadQuestions,
  loadQuizQuestions,
  inputChange,
} from "./../../../redux/actions/pastQuestionsActions";
import { getCourse } from "./../../../redux/actions/courseActions";
import {
  getSubjectAndRelatedLessons,
  addRecentActivity,
  addSubjectProgress,
} from "./../../../redux/actions/subjectActions";

import parse from "html-react-parser";
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
import queryString from "query-string";
import slugify from "react-slugify";
import Countdown from "react-countdown";
import TakeActionPopUp from "../../includes/popUp/takeActionPopUp";


const LessonPage = (props) => {
  const parsed = queryString.parse(props.location.search);
  // console.log(parsed);
  console.log("parsed", parsed);

  const {
    course,
    role,
    subject,
    activeCoursePaidStatus,
    clazz,
    inClass,
  } = props;

  const [isOpen, setIsOpen] = useState(true);
  const [modal1, setModal1] = useState(false);
  const toggle1 = (e) => {
    e.preventDefault();
    setModal1(!modal1);
  };

  const toggleTranscript = () => setIsOpen(!isOpen);

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

  const lesson = term?.lessons?.find(
    (lesson) => lesson._id === parsed.lessonId
  );
  console.log("lesson", lesson);

  const currentTermIndex =
    lesson && terms && terms?.findIndex((term) => term.id === lesson.termId);
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

  const courseName = subject && subject.courseId && subject.courseId.name;
  const subjectName =
    subject && subject.mainSubjectId && subject.mainSubjectId.name;

  const video =
    lesson &&
    lesson.videoUrls &&
    lesson.videoUrls.find((vid) => vid._id === parsed.videoId);

  const videoIndex =
    lesson &&
    lesson.videoUrls &&
    lesson.videoUrls.findIndex((vid) => vid._id === parsed.videoId);

  const nextVideo =
    lesson && lesson.videoUrls && videoIndex !== lesson.videoUrls.length
      ? lesson.videoUrls[videoIndex + 1]
      : null;
  const nextLessonVideo =
    nextLesson && nextLesson.videoUrls && nextLesson.videoUrls.length > 0
      ? nextLesson.videoUrls[0]
      : null;

  const previousLessonVideo =
    prevLesson && prevLesson.videoUrls && prevLesson.videoUrls.length > 0
      ? prevLesson.videoUrls[0]
      : null;

  const linkToNextVideo = `/content/${slugify(courseName)}/${slugify(
    subjectName
  )}/${slugify(lesson && lesson.title)}/${
    nextVideo && nextVideo._id
  }?courseId=${lesson && lesson.courseId}&subjectId=${
    lesson && lesson.subjectId
  }&lessonId=${lesson && lesson._id}&videoId=${
    nextVideo && nextVideo._id
  }&termId=${parsed.termId}`;

  const linkToNextLesson = `/content/${slugify(courseName)}/${slugify(
    subjectName
  )}/${slugify(nextLesson && nextLesson.title)}/${
    nextLessonVideo && nextLessonVideo._id
  }?courseId=${nextLesson && nextLesson.courseId}&subjectId=${
    nextLesson && nextLesson.subjectId
  }&lessonId=${nextLesson && nextLesson._id}&videoId=${
    nextLessonVideo && nextLessonVideo._id
  }&termId=${nextLesson && nextLesson.termId}`;

  const linkToLessonClassNote = `/classnote/${slugify(courseName)}/${slugify(
    subjectName
  )}/${slugify(lesson && lesson.title)}?courseId=${
    lesson && lesson.courseId
  }&subjectId=${lesson && lesson.subjectId}&lessonId=${
    lesson && lesson._id
  }&termId=${lesson && lesson.termId}`;

  const linkToNextLessonClassNote = `/classnote/${slugify(
    courseName
  )}/${slugify(subjectName)}/${
    nextLesson && slugify(nextLesson.title)
  }?courseId=${parsed.courseId}&subjectId=${parsed.subjectId}&lessonId=${
    nextLesson && nextLesson._id
  }&termId=${nextLesson && nextLesson.termId}`;

  const linkToPreviousLessonClassNote = `/classnote/${slugify(
    courseName
  )}/${slugify(subjectName)}/${
    prevLesson && slugify(prevLesson.title)
  }?courseId=${parsed.courseId}&subjectId=${parsed.subjectId}&lessonId=${
    prevLesson && prevLesson._id
  }&termId=${prevLesson && prevLesson.termId}`;

  const linkToPreviousLesson = `/content/${slugify(courseName)}/${slugify(
    subjectName
  )}/${prevLesson && slugify(prevLesson.title)}/${
    previousLessonVideo && previousLessonVideo._id
  }?courseId=${prevLesson && prevLesson.courseId}&subjectId=${
    prevLesson && prevLesson.subjectId
  }&lessonId=${prevLesson && prevLesson._id}&videoId=${
    previousLessonVideo && previousLessonVideo._id
  }&termId=${prevLesson && prevLesson.termId}`;

  const linkToSubjectPage = `/content/${slugify(courseName)}/${slugify(
    subjectName
  )}?courseId=${lesson && lesson.courseId}&subjectId=${
    lesson && lesson.subjectId
  }`;

  const relatedVideos =
    lesson && lesson.videoUrls.filter((vid) => vid._id !== parsed.videoId);

  const relatedVideosList = () => {
    if (relatedVideos && relatedVideos.length) {
      return relatedVideos.map((vid, index) => {
        return (
          <div className="item" key={index}>
            <div className="img">
              <img src={firstterm} alt="see this"></img>
            </div>
            <div className="right">
              <p>{lesson && lesson.title}</p>
              <div className="button">
                <FontAwesomeIcon icon={faPlay} style={{ marginRight: "5px" }} />
                Lesson {index + 1}
              </div>
            </div>
          </div>
        );
      });
    }
  };

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

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      window.scrollTo(0, 0);
      storeProgress();
      // props.loadQuestions(parsed.subjectId);
      if (
        subject &&
        subject.relatedLessons &&
        subject.relatedLessons.length === 0
      ) {
        props.getCourse(parsed.courseId);
        props.getSubjectAndRelatedLessons(parsed.courseId, parsed.subjectId);
      }
    } else {
      // do componentDidUpdate logic
    }
  });

  const [popoverOpen, setPopoverOpen] = useState(false);
 
  const toggle = () => setPopoverOpen(!popoverOpen);

  const { className } = props;
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [modal4, setModal4] = useState(false);
  const toggleModal4 = () => setModal4(!modal4);
  const [modal5, setModal5] = useState(false);
  const toggleModal5 = () => setModal5(!modal5);
  const [modal3, setModal3] = useState(false);
  const toggle3 = () => setModal3(!modal3);
  let shareLink = `Transform your life through world-class education. Download the Afrilearn App for free now or visit https://myafrilearn.com/`;

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

  const [stopRedirect, setStopRedirect] = useState(false);

  const updateQuizType = () => {
    props.inputChange("examType", "quiz");
    props.inputChange("quizTitle", lesson.title);
    props.inputChange("quizLessonId", lesson._id);

    props.loadQuizQuestions(lesson.questions);
    if (!nextNotAllowed) {
      if (
        nextLesson &&
        nextLesson.videoUrls &&
        nextLesson.videoUrls.length > 0
      ) {
        props.inputChange("nextLessonLocation", linkToNextLesson);
      } else {
        props.inputChange("nextLessonLocation", linkToNextLessonClassNote);
      }
    }
  };
  return (
    <React.Fragment>
      <div id="lessonPageSectionOne">
        <div className="negative_margin"></div>

        <div>
          <Modal
            isOpen={modal}
            // isOpen={true}
            toggle={() => {
              toggleModal();
              setStopRedirect(true);
            }}
            className={className}
          >
            <ModalBody className="take-action-pop-up">
              <FontAwesomeIcon
                className="close-take-action-pop-up"
                icon={faTimes}
                onClick={() => {
                  toggleModal();
                  setStopRedirect(true);
                }}
              />
              <img src={ThumbUp} alt="" className="thumb" />
              {nextVideo ? (
                <div>                  
                  <h3>
                    Lesson Video {videoIndex} - "{lesson && lesson.title}"{" "}
                    completed
                  </h3>
                  <p>
                    Next: Lesson Video {videoIndex + 1} - "
                    {nextLesson && nextLesson.title}"
                  </p>
                  <Link
                    to={linkToNextVideo}
                    onClick={() => {
                      toggleModal();
                      setStopRedirect(true);
                    }}
                  >
                    <button>Go to next Lesson Video</button>
                  </Link>
                </div>
              ) : (
                <div>                 
                  <h3>Lessons completed: {lesson && lesson.title}</h3>
                  {lesson && lesson.questions && lesson.questions.length > 0 ? (
                    <div>
                      <p>Next: Quiz</p>
                      <Link
                        to="/lesson/quiz/instructions"
                        onClick={() => {
                          updateQuizType();
                          setStopRedirect(true);
                        }}
                      >
                        <button>Proceed to take Quiz</button>
                      </Link>
                    </div>
                  ) : nextLessonVideo ? (
                    <div>                     
                      <p>Next: {nextLesson && nextLesson.title}</p>
                      <Link
                        to={linkToNextLesson}
                        onClick={() => {
                          setStopRedirect(true);
                        }}
                      >
                        <button>
                          Go to "
                          {nextLesson &&
                            nextLesson.title &&
                            nextLesson.title.slice(0, 25)}
                          {nextLesson &&
                            nextLesson.title &&
                            nextLesson.title.length > 25 &&
                            "..."}
                          "
                        </button>
                      </Link>
                    </div>
                  ) : nextLesson ? (
                    <div>                     
                      <p>Next: "{nextLesson && nextLesson.title}"</p>
                      <Link
                        to={linkToNextLessonClassNote}
                        onClick={() => {
                          setStopRedirect(true);
                        }}
                      >
                        <button>
                          Go to "
                          {nextLesson &&
                            nextLesson.title &&
                            nextLesson.title.slice(0, 25)}
                          {nextLesson &&
                            nextLesson.title &&
                            nextLesson.title.length > 25 &&
                            "..."}
                          "
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <Link
                      to={linkToSubjectPage}
                      onClick={() => {
                        setStopRedirect(true);
                      }}
                    >
                      <button>Go to topics page</button>
                    </Link>
                  )}
                </div>
              )}
              <span className="my-2">
                You will be redirected in{" "}
                <Countdown
                  renderer={({ hours, minutes, seconds }) => (
                    <span>{seconds}</span>
                  )}
                  date={Date.now() + 9000}
                  onComplete={() => {
                    toggleModal();
                    if (!stopRedirect) {
                      if (nextVideo) {
                        props.history.push(linkToNextVideo);
                      } else {
                        if (
                          lesson &&
                          lesson.questions &&
                          lesson.questions.length > 0
                        ) {
                          updateQuizType(lesson);
                          props.history.push("/lesson/quiz/instructions");
                          updateQuizType();
                        } else if (nextLessonVideo) {
                          return props.history.push(linkToNextLesson);
                        } else if (nextLesson) {
                          return props.history.push(linkToNextLessonClassNote);
                        } else {
                          props.history.push(linkToSubjectPage);
                        }
                      }
                    }
                  }}
                />
              </span>
            </ModalBody>
          </Modal>
        </div>
        {video && video.videoUrl && (
          <ReactPlayer
            className="react-player"
            // Disable download button
            config={{ file: { attributes: { controlsList: "nodownload" } } }}
            // Disable right click
            onContextMenu={(e) => e.preventDefault()}
            onEnded={(e) => {
              toggleModal();
            }}
            url={video && video.videoUrl}
            controls="true"
            width="100%"
            height="auto"
            muted={true}
            playing={true}
          />
        )}
      </div>
      <div id="lessonPageSectionTwo">
        <div className="left">
          <div className="top">
            <div className="button">
              <FontAwesomeIcon icon={faPlay} style={{ marginRight: "10px" }} />
              Lesson {videoIndex + 1}
            </div>
            <div className="icon">
              <Link to={linkToLessonClassNote}>
                <FontAwesomeIcon icon={faBook} />
              </Link>
              <div className="icon_pop">
                <p>Class Note</p>
                <span></span>
              </div>
            </div>
            <div className="icon">
              <Speech content={decodeEntities(video && video.transcript)} />
              <div className="icon_pop">
                <p>Audio Lesson</p>
                <span></span>
              </div>
            </div>
            <div className="icon">
              <Link onClick={toggle1}>
                <FontAwesomeIcon icon={faShareAlt} />
              </Link>
              <div className="icon_pop">
                <p>Share</p>
                <span></span>
              </div>
            </div>
            {role && role === "602f3ce39b146b3201c2dc1d" ? (
              <div className="icon">
                <span
                  id="Popover1"
                  onMouseOver={() => setPopoverOpen("true")}
                  onMouseLeave={toggle}
                >
                  <Popover
                    placement="top"
                    isOpen={popoverOpen}
                    target="Popover1"
                    toggle={toggle}
                  >
                    <PopoverBody>
                      {role && role === "602f3ce39b146b3201c2dc1d" && (
                        <Link to="/assign-content">
                          <p>Assign Content</p>
                        </Link>
                      )}
                      {/* <p>Community</p>
                    <p>Bookmark</p> */}
                      <p>Share</p>
                    </PopoverBody>
                  </Popover>
                  <img src={dots} alt="see more" />
                </span>
              </div>
            ) : null}
          </div>
          <a href="#transcriptText" onClick={toggleTranscript}>
            {isOpen ? "Hide" : "Show"} Transcript
          </a>
          <h4>{lesson && parse(lesson.title)}</h4>
          <Collapse isOpen={isOpen}>
            <p className="lessonContent">
              {video && video.transcript
                ? parse(video.transcript)
                : "No Transcript available"}
            </p>
          </Collapse>
        </div>
        <div className="right">
          <div className="top">
            <p>
              <span>Class:&nbsp;&nbsp; &nbsp; </span>{" "}
              {subject && subject.courseId && subject.courseId.alias}
            </p>
            <p>
              <span>Subject:&nbsp;&nbsp; &nbsp; </span>{" "}
              {subject && subject.mainSubjectId && subject.mainSubjectId.name}
            </p>
            <p>
              <span>Term:&nbsp;&nbsp; &nbsp; </span> {term && term.name}
            </p>
            <p>
              <span>Date Created:&nbsp;&nbsp; &nbsp; </span>{" "}
              {moment(lesson && lesson.createdAt).format("LL")}
            </p>
          </div>
          {/* <div className="mid">
            <h4>Related Videos</h4>
            {relatedVideosList()}
          </div> */}
          <div className="mid">
            {relatedVideos && relatedVideos.length !== 0 && (
              <h4>Recommended for you</h4>
            )}
            {relatedVideosList()}{" "}
          </div>
        </div>
        <div id="navigation">
          <Link
            to={prevLesson ? linkToPreviousLesson : linkToSubjectPage}
            className="button button1"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-html="true"
            onClick={(e) => {
              window.scrollTo(0, 0);
              if (
                prevNotAllowed ||
                (prevLesson &&
                  prevLesson.videoUrls &&
                  prevLesson.videoUrls.length === 0)
              ) {
                e.preventDefault();
                if (!activeCoursePaidStatus) {
                  return toggle3();
                } else if (
                  prevLesson &&
                  prevLesson.videoUrls &&
                  prevLesson.videoUrls.length === 0
                ) {
                  return toggleModal5();
                }
              } else {
              }
            }}
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
              color="#26aa76"
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
                  ? prevLesson.title && prevLesson.title.slice(0, 13)
                  : "Subject Page"}
                {prevLesson && prevLesson.title && prevLesson.title.length > 13
                  ? "..."
                  : null}
              </h6>
            </div>
          </Link>
          <div className="text">
            Lesson {currentLessonIndex + 1} of{" "}
            {subject && lessons && lessons.length}
          </div>
          <Link
            to={nextLesson ? linkToNextLesson : linkToSubjectPage}
            className="button button2"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-html="true"
            onClick={(e) => {
              window.scrollTo(0, 0);
              if (
                nextNotAllowed ||
                (nextLesson &&
                  nextLesson.videoUrls &&
                  nextLesson.videoUrls.length === 0)
              ) {
                e.preventDefault();
                if (!activeCoursePaidStatus) {
                  return toggle3();
                } else if (
                  nextLesson &&
                  nextLesson.videoUrls &&
                  nextLesson.videoUrls.length === 0
                ) {
                  return toggleModal4();
                }
              } else {
              }
            }}
            title={
              nextLesson
                ? nextNotAllowed
                  ? "Subscribe to unlock"
                  : nextLesson.title
                : "Subject Page"
            }
          >
            <div>
              <p>Next Lesson</p>
              <h6 className="custom-green">
                {nextLesson
                  ? nextLesson.title && nextLesson.title.slice(0, 13)
                  : "Subject Page"}
                {nextLesson && nextLesson.title && nextLesson.title.length > 13
                  ? "..."
                  : null}
              </h6>
            </div>
            <FontAwesomeIcon
              icon={faAngleRight}
              className="arrow"
              color="#26aa76"
            />
          </Link>
        </div>
      </div>

      <TakeActionPopUp
        headingText="There is no video lesson in the previous lesson"
        smallText=" Do you wan to open class note?"
        actionText="Yes! Proceed to Class Note"
        modal={modal5}
        showActionButton={true}
        actionLink={linkToPreviousLessonClassNote}
        toggle={toggleModal5}
      />
      <TakeActionPopUp
        headingText="There is no video lesson in the next lesson"
        smallText=" Do you wan to open class note?"
        actionText="Yes! Proceed to Class Note"
        modal={modal4}
        showActionButton={true}
        actionLink={linkToNextLessonClassNote}
        toggle={toggleModal4}
      />
      <TakeActionPopUp
        headingText="You need to subscribe to access this content!"
        subText=" Subscribe now to unlock all videos, class notes, tests & more in
        this class."
        actionText="SUBSCRIBE NOW"
        modal={modal3}
        showActionButton={true}
        actionLink="/select-pay"
        toggle={toggle3}
      />

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
    </React.Fragment>
  );
};

LessonPage.propTypes = {
  getCourse: PropTypes.func.isRequired,
  getSubjectAndRelatedLessons: PropTypes.func.isRequired,
  addRecentActivity: PropTypes.func.isRequired,
  addSubjectProgress: PropTypes.func.isRequired,
  loadQuestions: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired,
  loadQuizQuestions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  subject: state.subject.subject,
  course: state.course.course,
  clazz: state.class.class,
  inClass: state.auth.inClass,
  role: state.auth.user.role,
  activeCoursePaidStatus: state.auth.activeCoursePaidStatus,
});
export default connect(mapStateToProps, {
  getCourse,
  getSubjectAndRelatedLessons,
  addRecentActivity,

  addSubjectProgress,
  loadQuestions,
  inputChange,
  loadQuizQuestions,
})(LessonPage);
