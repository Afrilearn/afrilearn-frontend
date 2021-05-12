import React from "react";
import { Link } from "react-router-dom";
import PastQuestions from "../../../assets/img/past-questions.png";
import Lessons from "../../../assets/img/play.png";

const Box = (props) => {
  return (
    <div className="row push10 bottomBorder recommedtn">
      <div className="col-md-2">
        <span className="recommend">
          <Link
            className="underline"
            to={
              props.pastQuestions
                ? "/instructions"
                : `/content/${props.recommended._id.courseId}/${props.recommended._id.subjectId}`
            }
          >
            <img
              src={props.pastQuestions ? PastQuestions : Lessons}
              alt="icon"
              className="recommendImg"
            />
          </Link>
        </span>
      </div>
      <div className="col-md-6">
        <p>
          Because you {props.pastQuestions ? "practiced" : "learned"} "
          {props.title}"
        </p>
        <p className="recommendT">Recommended:</p>
        <Link
          className="underline"
          to={
            props.pastQuestions
              ? "/instructions"
              : `/content/${props.recommended._id.courseId}/${props.recommended._id.subjectId}`
          }
        >
          "{props.recommend}"
        </Link>
      </div>
    </div>
  );
};

export default Box;
