import React, { useEffect, useRef } from "react";
import "./css/style.css";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { getSubjectAndRelatedLessons } from "./../../../redux/actions/subjectActions";
import PropTypes from "prop-types";
import parse from "html-react-parser";
import Speech from 'react-speech';

const ClassNote = (props) => {
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
 
  return (
    <span>
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
