import React, { useEffect, useRef, useState } from "react";
import "./css/style.css";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { getSubjectAndRelatedLessons } from "./../../../redux/actions/subjectActions";
import PropTypes from "prop-types";
import parse from "html-react-parser";
import Speech from 'react-speech';

import {
  Modal,
  ModalHeader,
  ModalBody 
} from 'reactstrap';
import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton
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
  var decodeEntities = (function() {
    // this prevents any overhead from creating the object each time
        var element = document.createElement('div');

        function decodeHTMLEntities (str) {
            if(str && typeof str === 'string') {
            // strip script/html tags
            str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
            element.innerHTML = str;
            str = element.textContent;
            element.textContent = '';
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
 
  let shareLink = `https://app.ampz.tv/`;
  return (
    <span>
       <Modal isOpen={modal1} toggle={toggle1} className="shareModalClass">
        <ModalHeader toggle={toggle1}>&nbsp;</ModalHeader>
        <ModalBody>
          <ul className="share-content">
            <li>
              <Link>
                <FacebookShareButton url={shareLink}>
                 
                  &nbsp;&nbsp;&nbsp;Share to Facebook
                </FacebookShareButton>
              </Link>
            </li>
            <li>
              <Link>
                <TelegramShareButton url={shareLink}>
                  {/* <img
                    src={require('../../assets/img/instagram.png')}
                    alt="instagram"
                  /> */}
                  &nbsp;&nbsp;&nbsp;Share to Telegram
                </TelegramShareButton>
              </Link>
            </li>
            <li>
              <Link>
                <TwitterShareButton url={shareLink}>
                  {/* <img
                    src={require('../../assets/img/twitter 1.png')}
                    alt="twitter"
                  /> */}
                  &nbsp;&nbsp;&nbsp;Share to Twitter
                </TwitterShareButton>
              </Link>
            </li>
            <li>
              <Link>
                <WhatsappShareButton url={shareLink}>
                  {/* <img
                    src={require('../../assets/img/whatsapp 1.png')}
                    alt="whatsapp"
                  /> */}
                  &nbsp;&nbsp;&nbsp;Share to Whatsapp
                </WhatsappShareButton>
              </Link>
            </li>
            <li>
              <Link>
                <EmailShareButton url={shareLink}>
                  {/* <img
                    src={require('../../assets/img/email.png')}
                    alt="email"
                  /> */}
                  &nbsp;&nbsp;&nbsp;Share via Email
                </EmailShareButton>
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
            <Link>
              <FontAwesomeIcon icon={faThumbsUp} color="white" size="lg" />
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;           
              <Speech id="audio" text={decodeEntities(targetLesson && targetLesson.content)} textAsButton={true} displayText={<FontAwesomeIcon icon={faMicrophone} color="white" size="lg"  />} />
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
