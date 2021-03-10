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
} from "@fortawesome/free-solid-svg-icons";

import "./css/style.css";
import firstterm from "../../../assets/img/firstterm.png";
import dots from "../../../assets/img/dots.png";
import { Collapse, Popover, PopoverBody } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import ReactPlayer from "react-player/lazy";
import Speech from "react-speech";
import { getCourse } from "./../../../redux/actions/courseActions";
import { getSubjectAndRelatedLessons } from "./../../../redux/actions/subjectActions";

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

const LessonPage = (props) => {
  const parsed = queryString.parse(props.location.search);

  const { course, role, subject } = props;

  const [isOpen, setIsOpen] = useState(true);
  const [modal1, setModal1] = useState(false);
  const toggle1 = (e) => {
    e.preventDefault();
    setModal1(!modal1);
  };

  const toggleTranscript = () => setIsOpen(!isOpen);
  const lesson =
    subject &&
    subject.relatedLessons &&
    subject.relatedLessons.find((su) => su._id === parsed.lessonId);

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

  const termIds = [
    { id: "5fc8d1b20fae0a06bc22db5c", name: "First Term" },
    { id: "600047f67cabf80f88f61735", name: "Second Term" },
    { id: "600048197cabf80f88f61736", name: "Third Term" },
  ];

  const term = lesson && termIds.find((term) => term.id === lesson.termId);

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      window.scrollTo(0, 0);
      props.getCourse(parsed.courseId);
      props.getSubjectAndRelatedLessons(parsed.courseId, parsed.subjectId);
      // setModal(false);
    } else {
      // do componentDidUpdate logic
    }
  });

  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  const openPopOne = () => {
    const popOne = document.getElementById("lessonPagePopUpOne");
    popOne.style.display = "flex";
  };

  const openPopTwo = () => {
    const popTwo = document.getElementById("lessonPagePopUpTwo");
    popTwo.style.display = "flex";
  };

  const closePopOne = () => {
    const popOne = document.getElementById("lessonPagePopUpOne");
    popOne.style.display = "none";
  };

  const closePopTwo = () => {
    const popTwo = document.getElementById("lessonPagePopUpTwo");
    popTwo.style.display = "none";
  };
  const [modal, setModal] = useState(false);
  const { className } = props;
  const toggleModal = () => setModal(!modal);
  let shareLink = `https://www.myafrilearn.com/`;

  return (
    <React.Fragment>
      <div id="lessonPageSectionOne">
        <div className="negative_margin"></div>

        <div>
          <Modal isOpen={modal} toggle={toggleModal} className={className}>
            <ModalBody style={{ textAlign: "center" }}>
              {nextVideo ? (
                <div>
                  <p>Lesson completed</p>
                  <Link
                    to={`/content/${lesson.courseId}/${lesson.subjectId}/${lesson._id}/${nextVideo._id}`}
                    className="btn btn-primary"
                    onClick={toggleModal}
                  >
                    Go to next lesson
                  </Link>
                </div>
              ) : (
                <div>
                  <p>Lessons completed for this section</p>
                  <h2>Congratulations</h2>
                  {lesson && lesson.questions && lesson.questions.length > 0 ? (
                    <Button
                      tag={Link}
                      to="/lesson/quiz/instructions"
                      className="btn btn-success"
                    >
                      Proceed to take Quiz
                    </Button>
                  ) : (
                    <Button
                      tag={Link}
                      to={`/content/${lesson && lesson.courseId}/${
                        lesson && lesson.subjectId
                      }/${lesson && lesson._id}`}
                      className="btn btn-success"
                    >
                      Go to topics page
                    </Button>
                  )}
                </div>
              )}
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
            <div className="icon" onClick={openPopOne}>
              <FontAwesomeIcon icon={faBook} />
              <div className="icon_pop">
                <p>Class Note</p>
                <span></span>
              </div>
            </div>
            <div className="icon">
              <Speech
                id="audio"
                text={decodeEntities(video && video.transcript)}
                textAsButton={true}
                displayText={
                  <FontAwesomeIcon icon={faMicrophone} color="white" />
                }
              />
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
            <p className="lessonContent ">
              {video && video.transcript
                ? video.transcript
                : "No Transcript available"}
            </p>
          </Collapse>
        </div>
        <div className="right">
          <div className="top">
            <p>
              <span>Class:&nbsp;&nbsp; &nbsp; </span> {course.name}
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
      </div>
      <div id="lessonPagePopUpOne">
        <span className="closePopUp cursor-pointer" onClick={closePopOne}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
        <FontAwesomeIcon icon={faInfoCircle} style={{ fontSize: "40px" }} />
        <h3>
          This action takes you to the complete <br /> class note page
        </h3>
        <Link
          className="button"
          to={`/classnote/${slugify(
            subject && subject.courseId && subject.courseId.name
          )}/${slugify(
            subject && subject.mainSubjectId && subject.mainSubjectId.name
          )}/${slugify(lesson.title)}?courseId=${lesson.courseId}&subjectId=${
            lesson.subjectId
          }&lessonId=${lesson._id}&termId=${lesson.termId}`}
        >
          Yes! Proceed to Class Note
        </Link>
        {/* <a href="/">Share your progress</a> */}
      </div>
      <div id="lessonPagePopUpTwo">
        <span className="closePopUp" onClick={closePopTwo}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
        <h3>Yay Feyikemi ! You are doing well</h3>
        <p>Keep up the good work</p>
        <button>Proceed to Lesson 3</button>
        <a href="/">Share your progress</a>
      </div>
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
};

const mapStateToProps = (state) => ({
  subject: state.subject.subject,
  course: state.course.course,
  role: state.auth.user.role,
});
export default connect(mapStateToProps, {
  getCourse,
  getSubjectAndRelatedLessons,
})(LessonPage);
