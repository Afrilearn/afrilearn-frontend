import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const Box = (props) => {
  const { lesson } = props;

  const videoList = () => {
    if (lesson.videoUrls.length) {
      return lesson.videoUrls.map((item, index) => {
        return (
          <div className="col-md-3 paddingRightOff">
            <Link to="/select-pay">
              <span className="borderAll lessonBox">
                <FontAwesomeIcon icon={faPlay} /> &nbsp;Lesson {index + 1}
              </span>
            </Link>
          </div>
        );
      });
    }
  };
  return (
    <div className="row bottomBorder">
      <div className="col-md-3 padOff">
        <img
          src={require("../../../assets/img/firstterm.png")}
          alt="lesson"
          className="fullWidth thumbnail"
        />
      </div>
      <div className="col-md-9">
        <div className="row">
          <div className="col-md-12 title3">{lesson.title}</div>
        </div>
        <div className="row">
          {videoList()}
          <div className="col-md-3 paddingRightOff">
            <Link to="/register">
              <span className="borderAll lessonBox">
                &nbsp;&nbsp;Quiz&nbsp;&nbsp;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Box;
