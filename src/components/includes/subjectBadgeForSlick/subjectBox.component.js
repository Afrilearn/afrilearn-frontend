import React, { useState } from "react";
import Tooltip from "rc-tooltip";
import { Link } from "react-router-dom";
import "rc-tooltip/assets/bootstrap_white.css";
import "./css/style.css";
import slugify from "react-slugify";

const Box = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const { lessons } = props;

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const calcVideoLesson = () => {
    let videoLessonCount = 0;
    for (let l = 0; l < lessons.length; l++) {
      videoLessonCount += lessons[l].videoUrls.length;
    }
    return videoLessonCount;
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
            alt={props.subjectName}
            className="fullWidth subjectImage"
          />
          <div className="dropDownContent row">
            <div className="col-12 padOff">
               <Link
                  to={`/content/${slugify(props.courseName)}/${slugify(
                    props.subjectName
                  )}?courseId=${props.courseId}&subjectId=${props.subjectId}`}
                >
                  <img
                    src={props.image}
                    alt={props.subjectName}
                    className="fullWidth subjectImage1"
                  />
                </Link>
            </div>
            <div className="col-12 box">
              <div className="row">
                <div className="col-9">
                  <Tooltip
                    placement="top"
                    trigger={["hover"]}
                    overlay={
                      <span>
                        {props.lessons && props.lessons.length > 0
                          ? numberWithCommas(calcVideoLesson())
                          : 0}{" "}
                        Video Lessons
                      </span>
                    }
                  > 
                    <Link
                      to={`/content/${slugify(props.courseName)}/${slugify(
                        props.subjectName
                      )}?courseId=${props.courseId}&subjectId=${props.subjectId}`}
                    >                 
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
                        {props.compiledNotes && props.compiledNotes > 0
                          ? numberWithCommas(props.compiledNotes)
                          : 0}{" "}
                        Compiled Notes
                      </span>
                    }
                  >
                    <Link
                      to={`/content/${slugify(props.courseName)}/${slugify(
                        props.subjectName
                      )}?courseId=${props.courseId}&subjectId=${props.subjectId}`}
                    > 
                      <img
                        src={require("../../../assets/img/lessons.png")}
                        alt="lesson"
                        className="subjectImage2"
                      />
                    </Link>
                  </Tooltip>
                  <Tooltip
                    placement="top"
                    trigger={["hover"]}
                    overlay={
                      <span>
                        {props.numOfUsers && props.numOfUsers > 0
                          ? numberWithCommas(props.numOfUsers)
                          : 0}{" "}
                        Registered Users
                      </span>
                    }
                  >
                    <Link
                      to={`/content/${slugify(props.courseName)}/${slugify(
                        props.subjectName
                      )}?courseId=${props.courseId}&subjectId=${props.subjectId}`}
                      > 
                        <img
                          src={require("../../../assets/img/users.png")}
                          alt="users"
                          className="subjectImage2"
                        />
                    </Link>
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
                    <Link
                      to={`/content/${slugify(props.courseName)}/${slugify(
                        props.subjectName
                      )}?courseId=${props.courseId}&subjectId=${
                        props.subjectId
                      }`}
                    >
                      <img
                        src={require("../../../assets/img/more.png")}
                        alt="more options"
                        className="subjectImage2"
                      />
                    </Link>                    
                  </Tooltip>
                </div>
              </div>
              <div className="row description1">
                <div className="col-12 description">{props.subjectName}</div>
              </div>
              <div className="row">
                <div className="col-12" id="UncontrolledTooltipExample">
                  {props.compiledNotes && props.compiledNotes > 0
                    ? numberWithCommas(props.compiledNotes)
                    : "0"}{" "}
                  Lessons
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
    </>
  );
};
 
export default Box;
