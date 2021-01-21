import { faAngleDown, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import firstterm from "../../../assets/img/firstterm.png";
import "./css/style.css";
import { connect } from 'react-redux';
import { inputChange, loadQuizQuestions } from './../../../redux/actions/pastQuestionsActions';
import PropTypes from 'prop-types';


const LessonItem = (props) => {
  const { lesson, seeMore } = props;

  const updateQuizType = () => {  
    props.inputChange('examType', 'quiz');
    props.inputChange('quizTitle', lesson.title);
    props.inputChange('quizLessonId', lesson._id);
      
    props.loadQuizQuestions(lesson.questions); 
  }

  const lessonVideos = () => {
    if (lesson.videoUrls.length) {
      return lesson.videoUrls.map((item, index) => {
        return (
          <div class="col-md-3" key={index}>
            <Link
              to={`/content/${lesson.courseId}/${lesson.subjectId}/${lesson._id}/${item._id}`}
            >
              <div className="term_item_left_bottom_item ">
                <FontAwesomeIcon icon={faPlay} />
                <button>Lesson {index + 1}</button>
              </div>
            </Link>
          </div>
        );
      });
    }
  };

  return (
    <div key={lesson._id} className="term_item row">
      <div class="col-md-3">
        <div className="term_item_right">
          <img src={firstterm} alt="see this"></img>
        </div>
      </div>
      <div className="term_item_left col-md-9">
        <h5 className="term_item_left_top">{lesson.title}</h5>
        <div className="term_item_left_bottom row">
          {lessonVideos()}
          <div class="col-md-3">
            <div className="term_item_left_bottom_item ">
              <Link to="/lesson/quiz/instructions" onClick={updateQuizType} className="quizButton">Quiz</Link>
            </div>
          </div>
        </div>
      </div>
      <span className="term_item_see_more" onClick={seeMore}>
        <FontAwesomeIcon icon={faAngleDown} />
      </span>
    </div>
  );
};

LessonItem.propTypes = {
  inputChange: PropTypes.func.isRequired,
  loadQuizQuestions: PropTypes.func.isRequired,
}; 

export default connect(null, { inputChange, loadQuizQuestions })(LessonItem);
