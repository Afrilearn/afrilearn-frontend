import React from "react";
import { Progress } from "reactstrap";
import "./css/style.css";
import linebisect from "../../../assets/img/linebisect.png";
import flag from "../../../assets/img/flag.png";
import podcast from "../../../assets/img/podcast.png";
import { Button, UncontrolledPopover, PopoverBody } from "reactstrap";

const QuizPage = () => {
  const showCompleteMessage = () => {
    const quizPageSectionTwo = document.getElementById("quizPageSectionTwo");
    const quizPageSectionOne = document.getElementById("quizPageSectionOne");
    quizPageSectionOne.style.display = "none";
    quizPageSectionTwo.style.display = "block";
  };
  const hideCompleteMessage = () => {
    const quizPageSectionTwo = document.getElementById("quizPageSectionTwo");
    const quizPageSectionOne = document.getElementById("quizPageSectionOne");
    quizPageSectionOne.style.display = "block";
    quizPageSectionTwo.style.display = "none";
  };
  return (
    <React.Fragment>
      <div id="quizPageSectionOne">
        <UncontrolledPopover
          trigger="focus"
          placement="bottom"
          target="PopoverFocus"
        >
          <PopoverBody>
            <h6>Well done Feyikemi!</h6>
            <p>Keep up the good work</p>
          </PopoverBody>
        </UncontrolledPopover>
        <h4>Geometrical Construction (2): Angles</h4>
        <div className="flex-section">
          <div className="left">
            <p>
              Subject: <span>Basic Technology</span>
            </p>
            <Progress value={2 * 5} />
            <div className="image">
              <img src={linebisect} alt="see this" />
            </div>
            <h6>Question 1</h6>
            <p>Which angle is represented in the diagram shown above?</p>
            <button className="option-button">A. 120</button>
            <button className="option-button active">B. 90</button>
            <button className="option-button">C. 180</button>
            <button className="option-button">D. 270</button>
            <div className="action-buttons">
              <Button className="skip-button" id="PopoverFocus" type="button">
                Skip
              </Button>
              <img src={podcast} alt="icon-mic" />
              <img src={flag} alt="icon-flag" />
              <button onClick={showCompleteMessage} className="submit-button">
                Submit
              </button>
            </div>
          </div>
          <div className="right">
            <div className="questions-answered">
              <span className="active">1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span className="skipped">6</span>
              <span>7</span>
              <span>8</span>
              <span>9</span>
              <span>10</span>
            </div>
          </div>
        </div>
      </div>
      <div id="quizPageSectionTwo">
        <div className="complete-message">
          <h1>QUIZ COMPLETED </h1>
          <h4>Score : 08 of 10</h4>
          <p>
            Well done Feyikemi. That was a nice try, you can do better next
            time! Keep up learning and do not stop practicing too
          </p>
          <button onClick={hideCompleteMessage}>Retake Quiz</button>
          <span>Review Answers</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default QuizPage;
