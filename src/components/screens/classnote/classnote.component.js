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
import { getSubjectAndRelatedLessons } from "./../../../redux/actions/subjectActions";
import PropTypes from "prop-types";
import parse from "html-react-parser";
import Speech from "react-speech";

import { Modal, ModalHeader, ModalBody } from "reactstrap";

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

const ClassNote = (props) => {
  const [modal1, setModal1] = useState(false);
  const toggle1 = () => setModal1(!modal1);
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      window.scrollTo(0, 0);
      props.getSubjectAndRelatedLessons(
        props.match.params.courseId,
        props.match.params.subjectId
      );
    } else {
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
  const targetLesson =
    props.subject.relatedLessons &&
    props.subject.relatedLessons.find(
      (lesson) => lesson._id === props.match.params.lessonId
    );
  const targetLessonIndex =
    props.subject.relatedLessons &&
    props.subject.relatedLessons.findIndex(
      (lesson) => lesson._id === props.match.params.lessonId
    );
  const nextLesson =
    props.subject.relatedLessons &&
    props.subject.relatedLessons[targetLessonIndex + 1];

  const prevLesson =
    props.subject.relatedLessons &&
    props.subject.relatedLessons[targetLessonIndex - 1];

  let shareLink = `http://www.myafrilearn.com/`;
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
            <Link
              to={`/content/${props.match.params.courseId}/${props.match.params.subjectId}`}
            >
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
                ? `/classnote/${props.match.params.courseId}/${
                    props.match.params.subjectId
                  }/${prevLesson && prevLesson._id}`
                : `/content/${props.match.params.courseId}/${props.match.params.subjectId}`
            }
            className="button button1"
          >
            <FontAwesomeIcon
              icon={faAngleLeft}
              className="arrow"
              color="#26aa76"
            />
            <div>
              {prevLesson ? (
                <p>
                  Previous <span className="hide-900">Lesson</span>
                </p>
              ) : (
                <p>Back to</p>
              )}
              <h4 className="custom-green">
                {prevLesson ? prevLesson.title.slice(0, 15) : "Subject Page"}
              </h4>
            </div>
          </Link>
          <div className="text">
            Lesson {targetLessonIndex + 1} of{" "}
            {props.subject &&
              props.subject.relatedLessons &&
              props.subject.relatedLessons.length}
          </div>
          <Link
            to={
              nextLesson
                ? `/classnote/${props.match.params.courseId}/${
                    props.match.params.subjectId
                  }/${nextLesson && nextLesson._id}`
                : `/content/${props.match.params.courseId}/${props.match.params.subjectId}`
            }
            className="button button2"
          >
            <div>
              <p>{nextLesson ? "Next Lesson" : "Back to"}</p>
              <h4 className="custom-green">
                {nextLesson ? nextLesson.title.slice(0, 15) : "Subject Page"}
              </h4>
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
};

const mapStateToProps = (state) => ({
  course: state.course.course,
  subject: state.subject.subject,
});

export default connect(mapStateToProps, { getSubjectAndRelatedLessons })(
  ClassNote
);
