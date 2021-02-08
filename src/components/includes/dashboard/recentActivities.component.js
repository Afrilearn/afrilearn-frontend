import React from "react";
import PastQuestions from "../../../assets/img/past-questions.png";
import Lessons from "../../../assets/img/play.png";
import moment from "moment";

const Box = (props) => {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div className="row push10 bottomBorder subjectList">
      <div className="col-md-2">
        <img
          src={props.category === "lesson" ? Lessons : PastQuestions}
          alt="icon"
          className="recommendImg"
        />
      </div>
      <div className="col-md-3">
        <p className="green">{capitalizeFirstLetter(props.category)}</p>
        <p>{props.title}</p>
      </div>
      <div className="col-md-3">
        <span className={props.excel ? "excel" : "average"}>
          {props.subject}
        </span>
      </div>
      <div className="col-md-4 center">
        <p> {moment(props.time).startOf("hour").fromNow()}</p>
      </div>
    </div>
  );
};

export default Box;
