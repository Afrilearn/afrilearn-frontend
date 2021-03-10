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
import { Link } from "react-router-dom";
import {
  getSubjectAndRelatedLessons,
  addRecentActivity,
  addSubjectProgress,
} from "./../../../redux/actions/subjectActions";

import PropTypes from "prop-types";
import parse from "html-react-parser";
import Speech from "react-speech";
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

const ClassNote = (props) => {
  const [modal1, setModal1] = useState(false);
  const toggle1 = (e) => {
    e.preventDefault();
    setModal1(!modal1);
  };
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggleToolPit = () => setTooltipOpen(!tooltipOpen);
  const parsed = queryString.parse(props.location.search);
  const { activeCoursePaidStatus, clazz, inClass } = props;
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      window.scrollTo(0, 0);
      props.getSubjectAndRelatedLessons(parsed.courseId, parsed.subjectId);
    } else {
      window.scrollTo(0, 0);
      // do componentDidUpdate logic
    }
  });
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

  const lessons =
    props.subject.relatedLessons &&
    props.subject.relatedLessons.filter((les) => les.termId === parsed.termId);

  const targetLesson = lessons.find((lesson) => lesson._id === parsed.lessonId);
  const targetLessonIndex = lessons.findIndex(
    (lesson) => lesson._id === parsed.lessonId
  );
  const nextLesson = lessons[targetLessonIndex + 1];

  const prevLesson = lessons[targetLessonIndex - 1];

  let prevNotAllowed =
    prevLesson && !activeCoursePaidStatus && targetLessonIndex - 1 !== 0;
  let nextNotAllowed =
    nextLesson && !activeCoursePaidStatus && targetLessonIndex + 1 !== 0;
  let shareLink = `https://www.myafrilearn.com/`;

  const recommendation = (id) => {
    const mainList = lessons && lessons.filter((vid) => vid._id !== id);
    const random = Math.floor(Math.random() * mainList.length);

    return mainList[random];
  };
  const onClickClassNote = (lesson) => {
    props.addRecentActivity(lesson._id, "lesson");
    props.addSubjectProgress(
      inClass ? clazz._id : null,
      lesson._id,
      lesson.subjectId,
      lesson.courseId,
      recommendation(lesson._id),
      lesson._id,
      "lesson"
    );
  };

  const payLink = inClass ? `/select-pay?${clazz._id}` : `/select-pay`;

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
              id="audio"
              text={decodeEntities(targetLesson && targetLesson.content)}
              textAsButton={true}
              displayText={
                <FontAwesomeIcon icon={faMicrophone} color="white" size="lg" />
              }
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
              prevNotAllowed
                ? e.preventDefault()
                : onClickClassNote(prevLesson);
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
                {prevLesson ? prevLesson.title.slice(0, 20) : "Subject Page"}
                {prevLesson && prevLesson.title.length > 20 ? "..." : null}
              </h6>
            </div>
          </Link>
          <div className="text">
            Lesson {targetLessonIndex + 1} of{" "}
            {props.subject && lessons && lessons.length}
          </div>
          <Link
            to={
              nextLesson
                ? `/classnote/${
                    props.subject.courseId &&
                    slugify(props.subject.courseId.name)
                  }/${
                    props.subject.mainSubjectId &&
                    slugify(props.subject.mainSubjectId.name)
                  }/${nextLesson && slugify(nextLesson.title)}?courseId=${
                    parsed.courseId
                  }&subjectId=${parsed.subjectId}&lessonId=${
                    nextLesson && nextLesson._id
                  }&termId=${nextLesson && nextLesson.termId}`
                : `/content/${parsed.courseId}/${parsed.subjectId}`
            }
            onClick={(e) => {
              nextNotAllowed
                ? e.preventDefault()
                : onClickClassNote(nextLesson);
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
                {nextLesson ? nextLesson.title.slice(0, 20) : "Subject Page"}
                {nextLesson && nextLesson.title.length > 20 ? "..." : null}
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
    </span>
  );
};
ClassNote.propTypes = {
  getSubjectAndRelatedLessons: PropTypes.func.isRequired,
  addRecentActivity: PropTypes.func.isRequired,
  addSubjectProgress: PropTypes.func.isRequired,
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
})(ClassNote);
