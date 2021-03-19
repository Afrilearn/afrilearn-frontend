import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { inputChange as pastQuestionInputChange } from "./../../../redux/actions/pastQuestionsActions";
import { inputChange } from "./../../../redux/actions/courseActions";
import PropTypes from "prop-types";

const Box = (props) => {
  const updatePastQuestionName = () => {
    props.inputChange("selectedCategory", props.categoryName);
    props.pastQuestionInputChange("examType", "pastQuestions");
  };
  return (
    <div className="col-md-3">
      <Link
        onClick={updatePastQuestionName}
        to={`/past-questions/${props.categoryId}`}
      >
        <span
          className={
            props.other
              ? "pastQuestionsBox pastQuestionsBox1"
              : "pastQuestionsBox"
          }
        >
          <div className="row">
            <div className="col-4">
              <img
                src={require("../../../assets/img/past-questions.png")}
                alt="past questions"
              />
            </div>
            <div className="col-8">
              <h6>{props.title}</h6>
              <p>Over 13,000 questions per subject</p>
            </div>
          </div>
        </span>
      </Link>
    </div>
  );
};

Box.propTypes = {
  inputChange: PropTypes.func.isRequired,
};

export default connect(null, { inputChange, pastQuestionInputChange })(Box);
