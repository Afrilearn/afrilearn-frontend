import React from "react";
import { Link } from "react-router-dom";
import PastQuestions from "../../../assets/img/past-questions.png";
import Lessons from "../../../assets/img/play.png";
import slugify from "react-slugify";

const Box = (props) => {
   const linkToNextRecommended = `/classnote/${
    props.recommended.courseId && slugify(props.recommended.courseId.name)
  }/${
    props.recommended.subjectId &&
    props.recommended.subjectId.mainSubjectId &&
    slugify(props.recommended.subjectId.mainSubjectId.name)
  }/${props.recommended && slugify(props.recommended.title)}?courseId=${
    props.recommended._id.courseId
  }&subjectId=${props.recommended._id.subjectId}&lessonId=${
    props.recommended._id._id
  }&termId=${props.recommended._id.termId}`;
  return (
    <div className="row push10 bottomBorder recommedtn">
      <div className="col-md-2">
        <span className="recommend">
          <Link
            className="underline"
            to={props.pastQuestions ? "/instructions" : linkToNextRecommended}
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
          to={props.pastQuestions ? "/instructions" : linkToNextRecommended}
        >
          "{props.recommend}"
        </Link>
      </div>
    </div>
  );
};

export default Box;
