import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faBook,
  faMicrophone,
  faThumbsUp,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

import "./css/style.css";
import firstterm from "../../../assets/img/firstterm.png";
import dots from "../../../assets/img/dots.png";
import { Popover, PopoverBody } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import ReactPlayer from 'react-player/lazy';

import { getCourse } from "./../../../redux/actions/courseActions";
import parse from "html-react-parser";

const LessonPage = (props) => {
  const { course, role } = props;

  const subject =
    course.relatedSubjects &&
    course.relatedSubjects.find(
      (su) => su.courseId === props.match.params.courseId
    );

  const lesson =
    subject &&
    subject.relatedLessons &&
    subject.relatedLessons.find((su) => su._id === props.match.params.lessonId);

  const video =
    lesson &&
    lesson.videoUrls &&
    lesson.videoUrls.find((vid) => vid._id === props.match.params.videoId);

  const videoIndex =
    lesson &&
    lesson.videoUrls &&
    lesson.videoUrls.findIndex((vid) => vid._id === props.match.params.videoId);

  const nextVideo =
    lesson && lesson.videoUrls && videoIndex !== lesson.videoUrls.length
      ? lesson.videoUrls[videoIndex + 1]
      : null;

  const relatedVideos =
    lesson &&
    lesson.videoUrls.filter((vid) => vid._id !== props.match.params.videoId);

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
      props.getCourse(props.match.params.courseId);
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

  return (
    <React.Fragment>
      <div id="lessonPageSectionOne">
        <div className="negative_margin"></div>

        <div>
          <Modal isOpen={modal} toggle={toggleModal} className={className}>
            <ModalHeader toggle={toggleModal}></ModalHeader>
            <ModalBody style={{ textAlign: "center" }}>
              {nextVideo ? (
                <div>
                  <p>Lesson completed</p>
                  <Link
                    to={`/content/${lesson.courseId}/${lesson.subjectId}/${lesson._id}/${nextVideo._id}`}
                    className="btn btn-primary"
                  >
                    Go to next lesson
                  </Link>
                </div>
              ) : (
                <div>
                  <p>Lessons completed for this section</p>
                  <h2>Congratulations</h2>
                  <Button
                    tag={Link}
                    to={`/content/${lesson && lesson.courseId}/${
                      lesson && lesson.subjectId
                    }/${lesson && lesson._id}`}
                    className="btn btn-success"
                  >
                    Go to topics page
                  </Button>
                </div>
              )}
            </ModalBody>
          </Modal>
        </div>
        {video && video.videoUrl && (
          <ReactPlayer
            className="react-player"
            config={{
              file: {
                attributes: {
                  onContextMenu: (e) => e.preventDefault()                  
                },
              },
            }}           
            onEnded={(e) => {
              toggleModal();
            }}
            url={video && video.videoUrl}
            controls="true"
            width="100%"
            height='500px'            
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
              <FontAwesomeIcon icon={faMicrophone} />
              <div className="icon_pop">
                <p>Audio Lesson</p>
                <span></span>
              </div>
            </div>
            <div className="icon" onClick={openPopTwo}>
              <FontAwesomeIcon icon={faThumbsUp} />
              <div className="icon_pop">
                <p>I like this video</p>
                <span></span>
              </div>
            </div>
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
                    {role && role === "5fc8cc978e28fa50986ecac9" && (
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
          </div>
          <a href="/">Hide Transcript</a>
          <h4>{lesson && parse(lesson.title)}</h4>
          {/* <p className="lessonContent">{lesson && parse(lesson.content)}</p> */}
        </div>
        <div className="right">
          <div className="top">
            <p>
              <span>Class:&nbsp;&nbsp; &nbsp; </span> {course.name}
            </p>
            <p>
              <span>Subject:&nbsp;&nbsp; &nbsp; </span>{" "}
              {subject && subject.mainSubjectId.name}
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
        <span className="closePopUp" onClick={closePopOne}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
        <FontAwesomeIcon icon={faInfoCircle} style={{ fontSize: "40px" }} />
        <h3>
          This action takes you to the complete <br /> class note page
        </h3>
        <button>Yes! Proceed to Class Note</button>
        <a href="/">Share your progress</a>
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
    </React.Fragment>
  );
};

LessonPage.propTypes = {
  getCourse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course.course,
  role: state.auth.user.role,
});
export default connect(mapStateToProps, { getCourse })(LessonPage);
