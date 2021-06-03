import React, { useEffect, useRef, useState } from "react";
import "./css/style.css";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faEllipsisV,
  faPlay,
  faTimes,
  faEye,
  faThumbsUp
} from "@fortawesome/free-solid-svg-icons";
import { Link, Redirect } from "react-router-dom";
import {
  getSubjectAndRelatedLessons,
  addRecentActivity,
  addSubjectProgress,
  storeFavouriteVideos,
  removeFavouriteVideos,
  storeLikedVideos,
  removeLikedVideos
} from "./../../../redux/actions/subjectActions";
import Speech from "../../includes/textToSpeech/textToSpeech.component";

import PropTypes from "prop-types";
import parse from "html-react-parser";
import queryString from "query-string";

import { Modal, ModalHeader, ModalBody, Tooltip } from "reactstrap";
import ThumbUp from "../../../assets/img/thumbs.gif";
import DTooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap_white.css";
import Unlike from "../../../assets/img/like.svg";
import Like from "../../../assets/img/unlike.svg";

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
import {
  inputChange,
  loadQuestions,
  loadQuizQuestions,
} from "../../../redux/actions/pastQuestionsActions";
import { inputChange as authInputChange } from "./../../../redux/actions/authActions";
import Countdown from "react-countdown";
import TakeActionPopUp from "../../includes/popUp/takeActionPopUp";

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
  const parsed = queryString.parse(props.location.search);
  const {
    activeCoursePaidStatus,
    clazz,
    inClass,
    user,
    dashboardFavouriteVideos,
    newlyAddedDashbaordFavouriteVideos,
    relatedLessons,
    likedVideoLoader,
    favouriteVideoLoader,
    subjectAndRelatedLessonsLoader,
  } = props;

  let likeArray =[];
  const mounted = useRef();
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
    }

    window.scrollTo(0, 0);    
    if (props.lessonCourseId !== parsed.courseId || props.lessonSubjectId !==parsed.subjectId) {
      props.getSubjectAndRelatedLessons(parsed.courseId, parsed.subjectId);
      window.scrollTo(0, 0);    
    }
    storeProgress();
  }, []);

  const storeFavouriteVideos = (e) => {
    e.preventDefault()
    const data = {
      userId:props.userId,
      courseId:parsed.courseId,
      subjectId:parsed.subjectId,
      lessonId:parsed.lessonId,
      termId:parsed.termId,
      // videoId:parsed.videoId,
      // videoPosition:videoIndex   
    }
    props.storeFavouriteVideos(data) 
  };

  const removeFavouriteVideos = (e) => {
    e.preventDefault()
    const data = {
      userId:props.userId,
      courseId:parsed.courseId,
      subjectId:parsed.subjectId,
      lessonId:parsed.lessonId,
      termId:parsed.termId,
      // videoId:parsed.videoId,
      // videoPosition:videoIndex   
    }
    props.removeFavouriteVideos(data) 
  };

  const storeLikedVideo = (e) => {
    e.preventDefault()
    const data = {
      userId:props.userId,
      lessonId:parsed.lessonId     
    }
    props.storeLikedVideos(data, currentLessonIndex) 
  };

  const removeLikedVideo = (e) => {
    e.preventDefault()
    const data = {
      userId:props.userId,
      lessonId:parsed.lessonId     
    }
    props.removeLikedVideos(data, currentLessonIndex) 
  }; 
  
  const alreadyAddedToFavourite = () => {
    let result = [];
    let result1 = [];
    //old records
    if (dashboardFavouriteVideos &&
      dashboardFavouriteVideos.length) { 
        result = dashboardFavouriteVideos.filter(item =>item.lessonId.id ===parsed.lessonId)
    }
    //new records
    if (newlyAddedDashbaordFavouriteVideos &&
      newlyAddedDashbaordFavouriteVideos.length) { 
        result1 = newlyAddedDashbaordFavouriteVideos.filter(item =>item.lessonId ===parsed.lessonId)
    }
    if(result.length || result1.length){
      return true
    }else{
      return false
    }
  }
  
  const alreadyAddedToLike = () => {
    let result = [];
    let result1 = [];

    //old records
    if (relatedLessons &&
      relatedLessons.length) { 
      result = relatedLessons.filter(item =>item._id === parsed.lessonId)
    }
  
    if(result[0] && result[0].likes  && result[0].likes.length){
      result = result[0].likes.filter(item => item === props.userId)
      likeArray = result
    }else{
      result = []
    }
   
    if(result.length || result1.length){
      return true
    }else{
      return false
    }
  }
  

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

  const lessonVideo =
    targetLesson && targetLesson.videoUrls && targetLesson.videoUrls.length > 0
      ? targetLesson.videoUrls[0]
      : null;
  const nextLessonVideo =
    nextLesson && nextLesson.videoUrls && nextLesson.videoUrls.length > 0
      ? nextLesson.videoUrls[0]
      : null;

  const linkToNextLessonClassNote = `/classnote/${
    props.subject.courseId && slugify(props.subject.courseId.name)
  }/${
    props.subject.mainSubjectId && slugify(props.subject.mainSubjectId.name)
  }/${nextLesson && slugify(nextLesson.title)}?courseId=${
    parsed.courseId
  }&subjectId=${parsed.subjectId}&lessonId=${
    nextLesson && nextLesson._id
  }&termId=${nextLesson && nextLesson.termId}`;

  const linkToNextLesson = `/content/${
    props.subject.courseId && slugify(props.subject.courseId.name)
  }/${
    props.subject.mainSubjectId && slugify(props.subject.mainSubjectId.name)
  }/${slugify(nextLesson && nextLesson.title)}/${
    nextLessonVideo && nextLessonVideo._id
  }?courseId=${parsed.courseId}&subjectId=${parsed.subjectId}&lessonId=${
    nextLesson && nextLesson._id
  }&videoId=${nextLessonVideo && nextLessonVideo._id}&termId=${
    nextLesson && nextLesson.termId
  }`;
  const linkToLessonVideoPage = `/content/${
    props.subject.courseId && slugify(props.subject.courseId.name)
  }/${
    props.subject.mainSubjectId && slugify(props.subject.mainSubjectId.name)
  }/${slugify(targetLesson && targetLesson.title)}/${
    lessonVideo && lessonVideo._id
  }?courseId=${parsed.courseId}&subjectId=${parsed.subjectId}&lessonId=${
    targetLesson && targetLesson._id
  }&videoId=${lessonVideo && lessonVideo._id}&termId=${
    targetLesson && targetLesson.termId
  }`;

  const [stopRedirect, setStopRedirect] = useState(false);
  const updateQuizType = () => {
    props.inputChange("examType", "quiz");
    props.inputChange("quizTitle", targetLesson.title);
    props.inputChange("quizLessonId", targetLesson._id);

    props.loadQuizQuestions(targetLesson.questions);
    // if (!nextNotAllowed) {
    //   if (
    //     nextLesson &&
    //     nextLesson.videoUrls &&
    //     nextLesson.videoUrls.length > 0
    //   ) {
    //     props.inputChange("nextLessonLocation", linkToNextLesson);
    //   } else {
    //     props.inputChange("nextLessonLocation", linkToNextLessonClassNote);
    //   }
    // }
    if (!nextNotAllowed) {    
      props.inputChange("nextLessonLocation", linkToNextLessonClassNote);
      
    }
  };
  const [show, setShow] = useState(true);
  const handleShowPopUp = () => {
    setShow(!show);
  };
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
        <ModalBody className="take-action-pop-up">
          <FontAwesomeIcon
            className="close-take-action-pop-up"
            icon={faTimes}
            onClick={toggle2}
          />
          <img src={ThumbUp} alt="" className="thumb" />
          {nextLesson ? (
            <div>
              <h3>
                You have completed "{targetLesson && targetLesson.title}"{" "}
              </h3>
              {targetLesson &&
              targetLesson.questions &&
              targetLesson &&
              targetLesson.questions.length > 0 ? (
                <div>
                  <p>Next: Quiz</p>
                  <Link to="/lesson/quiz/instructions">
                    <button
                      onClick={() => {
                        onClickQuiz(nextLesson);
                        toggle2();
                        setStopRedirect(true);
                        updateQuizType();
                      }}
                    >
                      Go to Quiz
                    </button>
                  </Link>
                </div>
              ) : (
                <div>
                  <p>Next: "{nextLesson.title}"</p>
                  <Link to={linkToNextLessonClassNote}>
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
          <span className="my-2">
            You will be redirected in{" "}
            <Countdown
              renderer={({ hours, minutes, seconds }) => <span>{seconds}</span>}
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
                      updateQuizType();
                      props.history.push("/lesson/quiz/instructions");
                    } else {
                      props.history.push(linkToNextLessonClassNote);
                    }
                  } else {
                    props.history.push(
                      `/content/${parsed.courseId}/${parsed.subjectId}`
                    );
                  }
                }
              }}
            />
          </span>
        </ModalBody>
      </Modal>
     
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
      <div id="classNoteFirstSection" className="container-fluid relative">
        <div className="row">
          <div className="col-md-12">
            <h1>{targetLesson && targetLesson.title}</h1>
          </div>
        </div>
      </div>
      {!props.subjectAndRelatedLessonsLoader? 
          <div id="classNoteSecondSection" className="container-fluid relative">
            <div className="row">
              <div className="col-md-5">
                <ul>
                  <li>
                    <Link to={`/content/${parsed.courseId}/${parsed.subjectId}`}>
                      <span className="backArrow">
                        <img
                          src={require("../../../assets/img/back-arrow.png")}
                          alt="back button"
                        />{" "}
                        &nbsp; Go back to Lesson
                      </span>
                    </Link>    
                  </li>                 
                  {targetLesson &&
                    targetLesson.videoUrls &&
                    targetLesson.videoUrls.length > 0 && (
                      <li>
                        <DTooltip
                          placement="top"
                          trigger={["hover"]}
                          overlay={
                            <span>
                              Video Lesson
                            </span>
                          }
                        >
                           <Link to={linkToLessonVideoPage}>
                            <FontAwesomeIcon icon={faPlay} color="white" size="lg" />
                          </Link>
                        </DTooltip>                       
                      </li>
                    )}                
                  <li>
                    <DTooltip
                      placement="top"
                      trigger={["hover"]}
                      overlay={
                        <span>
                          Audio Lesson
                        </span>
                      }
                    >
                      <Link onClick={(e) => {e.preventDefault()}}>
                        <Speech
                          content={decodeEntities(targetLesson && targetLesson.content)}
                        /> 
                      </Link> 
                    </DTooltip> 
                  </li>
                  <li>
                    <DTooltip
                      placement="top"
                      trigger={["hover"]}
                      overlay={
                        <span>
                          {alreadyAddedToLike()? 'Unlike':'I like this'}
                        </span>
                      }
                    >
                       <Link onClick={alreadyAddedToLike()? removeLikedVideo:storeLikedVideo}>                 
                          <img src={alreadyAddedToLike()? Unlike:Like} alt="see this" className="likeIcon"/>              
                        </Link>
                    </DTooltip> 
                  
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
                          <Link onClick={toggle1
                            }>
                              Share
                          </Link><br/>
                          <Link>{alreadyAddedToFavourite()? <Link onClick={removeFavouriteVideos}>Remove from Favourites</Link>:<Link onClick={storeFavouriteVideos}>Add to Favourites</Link>} </Link>
                        </span>
                      }
                    >
                      <Link onClick={(e) => {e.preventDefault()}}>
                        <FontAwesomeIcon icon={faEllipsisV} color="white" size="lg" />
                      </Link> 
                    </DTooltip> 
                  </li>
                </ul>                      
              </div>
              <div className="col-md-7"></div>
            </div>
            <div className="row">
              <div className="col-md-12 title">
                {targetLesson && targetLesson.title}               
              </div>
              <div className="col-md-12 stat">
                <FontAwesomeIcon icon={faEye} /> {targetLesson && targetLesson.views+' view(s)'}&nbsp;&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faThumbsUp} /> {likeArray.length+' like(s)'}
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
      :''}
   </span>
  );
};
ClassNote.propTypes = {
  getSubjectAndRelatedLessons: PropTypes.func.isRequired,
  addRecentActivity: PropTypes.func.isRequired,
  addSubjectProgress: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired,
  loadQuestions: PropTypes.func.isRequired,
  loadQuizQuestions: PropTypes.func.isRequired,
  authInputChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  clazz: state.class.class,
  inClass: state.auth.inClass,
  user: state.auth.user, 
  course: state.course.course,
  subject: state.subject.subject,
  activeCoursePaidStatus: state.auth.activeCoursePaidStatus,
  lessonSubjectId: state.subject.lessonSubjectId,
  lessonCourseId:state.subject.lessonCourseId,
  subjectAndRelatedLessonsLoader: state.course.subjectAndRelatedLessonsLoader,  
  userId:state.auth.userId,
  dashboardFavouriteVideos: state.course.dashboardFavouriteVideos,
  newlyAddedDashbaordFavouriteVideos: state.course.newlyAddedDashbaordFavouriteVideos,
  relatedLessons:state.subject.relatedLessons,
  likedVideoLoader:state.course.likedVideoLoader,
  favouriteVideoLoader:state.course.favouriteVideoLoader,
});

export default connect(mapStateToProps, {
  getSubjectAndRelatedLessons,
  addRecentActivity,

  addSubjectProgress,
  inputChange,
  loadQuestions,
  loadQuizQuestions,
  authInputChange,
  storeFavouriteVideos,
  removeFavouriteVideos,
  storeLikedVideos,
  removeLikedVideos,
})(ClassNote);
