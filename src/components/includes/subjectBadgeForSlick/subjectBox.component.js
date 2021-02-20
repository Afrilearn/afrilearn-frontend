import React, { useState } from "react";
import Tooltip from "rc-tooltip";
import { Link } from "react-router-dom";
import "rc-tooltip/assets/bootstrap_white.css";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faAngleUp,
  faMicrophone,
  faPlay,
  faVolumeUp,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import "./css/style.css";
import LessonBox from "./lessonBox.component";
import { connect } from "react-redux";
import { inputChange } from "./../../../redux/actions/authActions";
import PropTypes from "prop-types";

const Box = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const { drop, lessons } = props;

  const handleDrop = () => {
    props.inputChange("drop", !drop);
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const terms = [];
  const termIds = [
    { id: "5fc8d1b20fae0a06bc22db5c", name: "First Term" },
    { id: "600047f67cabf80f88f61735", name: "Second Term" },
    { id: "600048197cabf80f88f61736", name: "Third Term" },
  ];
  termIds.forEach((item) => {
    const lessonsList =
      lessons && lessons.filter((les) => les.termId === item.id);
    terms.push({ id: item.id, name: item.name, lessonsList });
  });

  const sliceOne = () => {
    if (lessons) {
      return terms.slice(0, 1).map((term, index) => {
        return (
          <div>
            <div className="row">
              <div className="col-md-12 padOff">
                <h5>{term.name}</h5>
              </div>
            </div>
            {term.lessonsList.map((lesson) => (
              <LessonBox lesson={lesson} />
            ))}
          </div>
        );
      });
    }
  };

  const sliceTwo = () => {
    if (lessons) {
      return terms.slice(1).map((term, index) => {
        return (
          <div>
            <div className="row">
              <div className="col-md-12 padOff">
                <h5>{term.name}</h5>
              </div>
            </div>
            {term.lessonsList.map((lesson) => (
              <LessonBox lesson={lesson} />
            ))}
          </div>
        );
      });
    }
  };

  return (
    <>
      <div
        className={
          props.singleClass ? "col-md-2 relative" : "col-md-12 relative"
        }
      >
        <span className="drop">
          <img
            src={props.image}
            alt="English"
            className="fullWidth subjectImage"
          />
          <div className="dropDownContent row">
            <div className="col-12 padOff">
              {props.dashboard ? (
                <Link to={`/content/${props.courseId}/${props.subjectId}`}>
                  <img
                    src={props.image}
                    alt="English"
                    className="fullWidth subjectImage1"
                  />
                </Link>
              ) : (
                <Link onClick={toggle}>
                  <img
                    src={props.image}
                    alt="English"
                    className="fullWidth subjectImage1"
                  />
                </Link>
              )}
            </div>
            <div className="col-12 box">
              <div className="row">
                <div className="col-9">
                  <Tooltip
                    placement="top"
                    trigger={["hover"]}
                    overlay={<span>Play</span>}
                  >
                    <Link to="/content/56464">
                      <img
                        src={require("../../../assets/img/play.png")}
                        alt="play"
                        className="subjectImage2"
                      />
                    </Link>
                  </Tooltip>
                  <Tooltip
                    placement="top"
                    trigger={["hover"]}
                    overlay={
                      <span>
                        {props.compiledNotes
                          ? numberWithCommas(props.compiledNotes)
                          : 0}{" "}
                        Compiled Notes
                      </span>
                    }
                  >
                    <img
                      src={require("../../../assets/img/lessons.png")}
                      alt="lesson"
                      className="subjectImage2"
                    />
                  </Tooltip>
                  <Tooltip
                    placement="top"
                    trigger={["hover"]}
                    overlay={
                      <span>
                        {props.compiledNotes
                          ? numberWithCommas(props.compiledNotes)
                          : 0}{" "}
                        Video Lessons
                      </span>
                    }
                  >
                    <img
                      src={require("../../../assets/img/users.png")}
                      alt="users"
                      className="subjectImage2"
                    />
                  </Tooltip>
                </div>
                <div className="col-3">
                  <Tooltip
                    placement="top"
                    trigger={["hover"]}
                    overlay={
                      <span>
                        {props.dashboard ? "Start Learning" : "More Info"}{" "}
                      </span>
                    }
                  >
                    {props.dashboard ? (
                      <Link
                        to={`/content/${props.courseId}/${props.subjectId}`}
                      >
                        <img
                          src={require("../../../assets/img/more.png")}
                          alt="more options"
                          className="subjectImage2"
                        />
                      </Link>
                    ) : (
                      <Link onClick={toggle}>
                        <img
                          src={require("../../../assets/img/more.png")}
                          alt="more options"
                          className="subjectImage2"
                        />
                      </Link>
                    )}
                  </Tooltip>
                </div>
              </div>

              <div className="row description1">
                <div className="col-12 description">{props.subjectName}</div>
              </div>
              <div className="row">
                <div className="col-12" id="UncontrolledTooltipExample">
                  {props.compiledNotes
                    ? numberWithCommas(props.compiledNotes)
                    : "0"}{" "}
                  Lessons Topics
                </div>
              </div>
              <div className="row description1">
                <div className="col-12">
                  <span className="box2">03</span> Terms
                </div>
              </div>
            </div>
          </div>
        </span>
      </div>
      <Modal isOpen={modal} toggle={toggle} className="subjectBoxClass">
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>
          <div className="row relative">
            <div className="col-md-12">
              <img
                src={props.image}
                className="subjectImage"
                alt="subject name"
              />
            </div>
          </div>
          <div className="row imageText">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-12 right">
                  <h1>{props.subjectName ? props.subjectName : "Unknown"}</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Link>
                    <span className="playButton">
                      <FontAwesomeIcon icon={faPlay} color="black" />
                      &nbsp;&nbsp;Play{" "}
                    </span>{" "}
                  </Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Link>
                    <FontAwesomeIcon icon={faVolumeUp} size="lg" />{" "}
                  </Link>
                </div>
                <div className="col-md-6 right"></div>
              </div>
              <div className="row">
                <div className="col-md-6"></div>
                <div className="col-md-6 right">
                  <Link>
                    <FontAwesomeIcon icon={faMicrophone} size="lg" />{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row contentSection">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-7 padOff">
                  <span className="title">
                    {props.subjectName ? props.subjectName : "Unknown"}
                  </span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="borderAll">03</span> Terms
                  <p className="push2">
                    {props.introText
                      ? props.introText.substr(0, 150)
                      : "This is a very important subject in todays curriculum for students especially at the junior secondary level as knowledge impacted prepares them for the various experiences at the senior level not withstanding their carrier paths."}
                  </p>
                </div>
                <div className="col-md-5 right padOff">
                  <div className="row">
                    <div className="col-3 title1">Class:</div>
                    <div className="col-9 details">
                      {props.courseName
                        ? props.courseName
                        : "Alias Course Name"}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-3 title1">Lessons:</div>
                    <div className="col-9 details">
                      {props.compiledNotes
                        ? numberWithCommas(props.compiledNotes)
                        : "0"}{" "}
                      Video Lessons
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-3 title1">Students:</div>
                    <div className="col-9 details">
                      {props.registeredUsers
                        ? numberWithCommas(props.registeredUsers)
                        : "0"}{" "}
                      Registered Students
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              {sliceOne()}
              {!drop ? (
                <div className="row">
                  <div className="col-md-12 center">
                    <Link onClick={handleDrop}>
                      <span className="arrowBox cursor-pointer">
                        <FontAwesomeIcon icon={faAngleDown} />
                      </span>
                    </Link>
                  </div>
                </div>
              ) : null}

              {drop ? (
                <>
                  <>{sliceTwo()}</>
                  <div className="row">
                    <div className="col-md-12 center">
                      <Link onClick={handleDrop}>
                        <span className="arrowBox cursor-pointer">
                          <FontAwesomeIcon icon={faAngleUp} />
                        </span>
                      </Link>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

Box.propTypes = {
  inputChange: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  drop: state.auth.drop,
});
export default connect(mapStateToProps, { inputChange })(Box);
