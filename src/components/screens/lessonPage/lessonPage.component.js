import React, { useEffect, useRef, useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faBook,
  faTimes,
  faEye,
  faAngleLeft,
  faAngleRight,
  faEllipsisV,
  faThumbsUp,
  faFastForward,
  faFastBackward,
} from "@fortawesome/free-solid-svg-icons";

import "./css/style.css";
import firstterm from "../../../assets/img/firstterm.png";
import ThumbUp from "../../../assets/img/thumbs.gif";
import Unlike from "../../../assets/img/like.svg";
import Like from "../../../assets/img/unlike.svg";
import ClasnoteIcon from "../../../assets/img/classnote1.png";
import BackArrow from "../../../assets/img/VideobackButton.svg";

import CommentBox from "../../includes/comment/addComment.component";
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
import { inputChange as authInputChange } from "./../../../redux/actions/authActions";
import {
  getSubjectAndRelatedLessons,
  addRecentActivity,
  addSubjectProgress,
  storeUnFinishedVideos,
  clearUnFinishedVideos,
  storeFavouriteVideos,
  removeFavouriteVideos,
  storeLikedVideos,
  removeLikedVideos,
} from "./../../../redux/actions/subjectActions";
import { getLessonComments } from "./../../../redux/actions/commentActions";

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
import TakeActionPopUp from "../../includes/popUp/takeActionPopUp.component";
import DTooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap_white.css";
import ReportBox from "../../includes/modal/reportLesson.component";
import TimeBack from "../../../assets/img/TimeBack.svg";
import TimeForward from "../../../assets/img/TimeForward.svg";
import {Helmet} from "react-helmet";

const LessonPage = (props) => {
  const parsed = queryString.parse(props.location.search);

  const {
    course,
    role,
    subject,
    activeCoursePaidStatus,
    clazz,
    inClass,
    dashboardFavouriteVideos,
    newlyAddedDashbaordFavouriteVideos,
    relatedLessons,
    likedVideoLoader,
    favouriteVideoLoader,
    subjectAndRelatedLessonsLoader,
    user,
    isAuthenticated,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
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
              <img src={firstterm} alt="see this" />
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
  let likeArray = [];

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      if (inClass) {
        const paymentIsActive = clazz.enrolledCourse.paymentIsActive;
        props.authInputChange("activeCoursePaidStatus", paymentIsActive);
      } else {
        const myActiveEnrolledCourse =
          user.enrolledCourses &&
          user.enrolledCourses.find(
            (course) => course.courseId._id === parsed.courseId
          );
        if (myActiveEnrolledCourse) {
          props.authInputChange(
            "activeCoursePaidStatus",
            myActiveEnrolledCourse.paymentIsActive
          );
        }
      }

      //get lesson comments
      props.getLessonComments(parsed.lessonId, { commentSection: "video" });
    }

    window.scrollTo(0, 0);
    if (
      props.lessonCourseId !== parsed.courseId ||
      props.lessonSubjectId !== parsed.subjectId
    ) {
      props.getSubjectAndRelatedLessons(parsed.courseId, parsed.subjectId);
      window.scrollTo(0, 0);
    }
    storeProgress();
  }, []);

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
  const toggle3 = () => {
    setModal3(!modal3);
  };
  let shareLink = `Transform your life through world-class education. Download the Afrilearn App for free now at https://play.google.com/store/apps/details?id=com.afrilearn or visit https://myafrilearn.com/`;

  const storeUnFinishedVideo = () => {
    const data = {
      userId: props.userId,
      courseId: parsed.courseId,
      subjectId: parsed.subjectId,
      lessonId: parsed.lessonId,
      termId: parsed.termId,
      videoId: parsed.videoId,
      videoPosition: videoIndex,
    };
    props.storeUnFinishedVideos(data);
  };

  const clearUnFinishedVideo = () => {
    const data = {
      userId: props.userId,
      courseId: parsed.courseId,
      subjectId: parsed.subjectId,
      lessonId: parsed.lessonId,
      termId: parsed.termId,
      videoId: parsed.videoId,
      videoPosition: videoIndex,
    };
    props.clearUnFinishedVideos(data);
  };

  const storeFavouriteVideos = (e) => {
    e.preventDefault();
    const data = {
      userId: props.userId,
      courseId: parsed.courseId,
      subjectId: parsed.subjectId,
      lessonId: parsed.lessonId,
      termId: parsed.termId,
      videoId: parsed.videoId,
      videoPosition: videoIndex,
    };
    props.storeFavouriteVideos(data);
  };

  const removeFavouriteVideos = (e) => {
    e.preventDefault();
    const data = {
      userId: props.userId,
      courseId: parsed.courseId,
      subjectId: parsed.subjectId,
      lessonId: parsed.lessonId,
      termId: parsed.termId,
      videoId: parsed.videoId,
      videoPosition: videoIndex,
    };
    props.removeFavouriteVideos(data);
  };

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

  const storeLikedVideo = (e) => {
    e.preventDefault();
    const data = {
      userId: props.userId,
      lessonId: parsed.lessonId,
    };
    props.storeLikedVideos(data, currentLessonIndex);
  };

  const removeLikedVideo = (e) => {
    e.preventDefault();
    const data = {
      userId: props.userId,
      lessonId: parsed.lessonId,
    };
    props.removeLikedVideos(data, currentLessonIndex);
  };

  const alreadyAddedToFavourite = () => {
    let result = [];
    let result1 = [];
    //old records
    if (dashboardFavouriteVideos && dashboardFavouriteVideos.length) {
      result = dashboardFavouriteVideos.filter(
        (item) => item.lessonId.id === parsed.lessonId
      );
    }
    //new records
    if (
      newlyAddedDashbaordFavouriteVideos &&
      newlyAddedDashbaordFavouriteVideos.length
    ) {
      result1 = newlyAddedDashbaordFavouriteVideos.filter(
        (item) => item.lessonId === parsed.lessonId
      );
    }
    if (result.length || result1.length) {
      return true;
    } else {
      return false;
    }
  };

  const alreadyAddedToLike = () => {
    let result = [];
    let result1 = [];

    //old records
    if (relatedLessons && relatedLessons.length) {
      result = relatedLessons.filter((item) => item._id === parsed.lessonId);
    }
    if (result[0] && result[0].likes && result[0].likes.length) {
      likeArray = result[0].likes;
      result = result[0].likes.filter((item) => item === props.userId);
    } else {
      result = [];
    }

    if (result.length || result1.length) {
      return true;
    } else {
      return false;
    }
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

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const goBack = (e) => {
    e.preventDefault();
    window.history.back();
  };

  const ref = useRef("");

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{lesson  ? lesson.title : "Video Lesson Page"}</title>
        <meta name="description" content='Video Lesson' />
      </Helmet>
      <div id="lessonPageSectionOne">
        <div className="negative_margin"></div>
        <Link onClick={goBack}>
          <img src={BackArrow} alt="Class Note" className="backButton" />
        </Link>

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
              <div className="container">
                <div className="p-3 center paymentBox">
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
                      {lesson &&
                      lesson.questions &&
                      lesson.questions.length > 0 ? (
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
                              return props.history.push(
                                linkToNextLessonClassNote
                              );
                            } else {
                              props.history.push(linkToSubjectPage);
                            }
                          }
                        }
                      }}
                    />
                  </span>
                </div>
              </div>
            </ModalBody>
          </Modal>
        </div>
        {video && video.videoUrl && (
          <div class="play-wrapper">
            <img
              src={TimeBack}
              className="player-controls-icon player-controls-icon-backward"
              onClick={() => {
                ref.current.seekTo(
                  ref.current.getCurrentTime() - 10,
                  "seconds"
                );
              }}
            />

            <img
              src={TimeForward}
              className="player-controls-icon player-controls-icon-forward"
              onClick={() =>
                ref.current.seekTo(ref.current.getCurrentTime() + 10, "seconds")
              }
            />

            <ReactPlayer
              className="react-player"
              onStart={storeUnFinishedVideo}
              // onSeek={(e) => console.log("onSeek", e)}
              // Disable download button
              config={{ file: { attributes: { controlsList: "nodownload" } } }}
              // Disable right click
              onContextMenu={(e) => e.preventDefault()}
              onEnded={(e) => {
                clearUnFinishedVideo();
                toggleModal();
              }}
              url={video && video.videoUrl}
              controls="true"
              width="100%"
              height="auto"
              muted={false}
              playing={true}
              ref={ref}
            />
          </div>
        )}
      </div>
      <div id="lessonPageSectionTwo">
        {!subjectAndRelatedLessonsLoader ? (
          <>
            <div className="left">
              <div className="row controlBar">
                <div className="col-md-12">
                  <ul>
                    <li>
                      <span className="backArrow">
                        <FontAwesomeIcon
                          icon={faPlay}
                          style={{ marginRight: "10px" }}
                        />
                        Lesson {videoIndex + 1}
                      </span>
                    </li>
                    <li>
                      <DTooltip
                        placement="top"
                        trigger={["hover"]}
                        overlay={<span>Class Note</span>}
                      >
                        <Link to={linkToLessonClassNote}>
                          <img
                            src={ClasnoteIcon}
                            alt="Class Note"
                            className="likeIcon"
                          />
                        </Link>
                      </DTooltip>
                      <br />
                      Note
                    </li>
                    <li>
                      <DTooltip
                        placement="top"
                        trigger={["hover"]}
                        overlay={<span>Audio Lesson</span>}
                      >
                        <Link
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <Speech
                            content={decodeEntities(video && video.transcript)}
                          />
                        </Link>
                      </DTooltip>
                      <br />
                      Audio
                    </li>
                    <li>
                      <DTooltip
                        placement="top"
                        trigger={["hover"]}
                        overlay={
                          <span>
                            {alreadyAddedToLike() ? "Unlike" : "I like this"}
                          </span>
                        }
                      >
                        <Link
                          onClick={
                            alreadyAddedToLike()
                              ? removeLikedVideo
                              : storeLikedVideo
                          }
                        >
                          <img
                            src={alreadyAddedToLike() ? Unlike : Like}
                            alt="see this"
                            className="likeIcon"
                          />
                        </Link>
                      </DTooltip>
                      <br />
                      {numberWithCommas(likeArray.length) + " like(s)"}
                      {/* <Link onClick={toggle1}>
                    <FontAwesomeIcon icon={faShareAlt} color="white" size="lg" />
                  </Link> */}
                    </li>
                    <li className="moreOptions">
                      <DTooltip
                        placement="top"
                        trigger={["hover"]}
                        overlay={
                          <span>
                            <Link onClick={toggle1}>Share</Link>
                            <br />
                            {isAuthenticated ? (
                              <Link>
                                {alreadyAddedToFavourite() ? (
                                  <Link onClick={removeFavouriteVideos}>
                                    Remove from Favourites
                                  </Link>
                                ) : (
                                  <Link onClick={storeFavouriteVideos}>
                                    Add to Favourites
                                  </Link>
                                )}{" "}
                              </Link>
                            ) : (
                              ""
                            )}
                            <br/>
                            <ReportBox lesson={lesson}/>
                            <br/>
                          </span>
                        }
                      >
                        <Link
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faEllipsisV}
                            color="white"
                            size="lg"
                          />
                        </Link>
                      </DTooltip>
                      <br />
                      More
                    </li>
                  </ul>
                </div>
              </div>
              <h4>{lesson && parse(lesson.title)}</h4>
              <FontAwesomeIcon icon={faEye} />{" "}
              {lesson && numberWithCommas(lesson.views) + " view(s)"} <br />
              <br />
              <a href="#transcriptText" onClick={toggleTranscript}>
                {isOpen ? "Hide" : "Show"} Transcript
              </a>
              <Collapse isOpen={isOpen}>
                <p className="lessonContent">
                  {video && video.transcript
                    ? parse(video.transcript)
                    : "No Transcript available"}
                </p>
              </Collapse>
              <CommentBox lessonId={parsed.lessonId} commentSection="video" />
            </div>
            <div className="right">
              <div className="top">
                <p>
                  <span>Class:&nbsp;&nbsp; &nbsp; </span>{" "}
                  {subject && subject.courseId && subject.courseId.alias}
                </p>
                <p>
                  <span>Subject:&nbsp;&nbsp; &nbsp; </span>{" "}
                  {subject &&
                    subject.mainSubjectId &&
                    subject.mainSubjectId.name}
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
                    if (prevLesson) {
                      //get lesson comments
                      props.getLessonComments(prevLesson.id, {
                        commentSection: "video",
                      });
                    }
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
                    {prevLesson &&
                    prevLesson.title &&
                    prevLesson.title.length > 13
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
                    if (nextLesson) {
                      //get lesson comments
                      props.getLessonComments(nextLesson.id, {
                        commentSection: "video",
                      });
                    }
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
                    {nextLesson &&
                    nextLesson.title &&
                    nextLesson.title.length > 13
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
          </>
        ) : (
          ""
        )}
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
        closeText="SUBSCRIBE LATER"
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
  storeLikedVideos: PropTypes.func.isRequired,
  removeLikedVideos: PropTypes.func.isRequired,
  authInputChange: PropTypes.func.isRequired,
  getLessonComments: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  subject: state.subject.subject,
  course: state.course.course,
  clazz: state.class.class,
  inClass: state.auth.inClass,
  role: state.auth.user.role,
  activeCoursePaidStatus: state.auth.activeCoursePaidStatus,
  lessonSubjectId: state.subject.lessonSubjectId,
  lessonCourseId: state.subject.lessonCourseId,
  userId: state.auth.userId,
  dashboardFavouriteVideos: state.course.dashboardFavouriteVideos,
  newlyAddedDashbaordFavouriteVideos:
    state.course.newlyAddedDashbaordFavouriteVideos,
  relatedLessons: state.subject.relatedLessons,
  likedVideoLoader: state.course.likedVideoLoader,
  favouriteVideoLoader: state.course.favouriteVideoLoader,
  subjectAndRelatedLessonsLoader: state.course.subjectAndRelatedLessonsLoader,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});
export default connect(mapStateToProps, {
  getCourse,
  getSubjectAndRelatedLessons,
  addRecentActivity,
  addSubjectProgress,
  loadQuestions,
  inputChange,
  loadQuizQuestions,
  storeUnFinishedVideos,
  clearUnFinishedVideos,
  storeFavouriteVideos,
  removeFavouriteVideos,
  storeLikedVideos,
  removeLikedVideos,
  authInputChange,
  getLessonComments,
})(LessonPage);
