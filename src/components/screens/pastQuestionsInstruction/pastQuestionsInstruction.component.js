import React from "react";
import "./css/style.css";
import { Link } from "react-router-dom";
import clockicon from "../../../assets/img/clockicon.png";
import qicon from "../../../assets/img/qicon.png";
import anime from "../../../assets/img/animation_500_kiim5z30.gif";

const PastQuestionsInstruction = () => {
  return (
    <div id="pastQuestionsInstructionSectionOne">
      <div class="container">
        <h1>Junior WAEC Agricultural Science 2000</h1>
        <div className="row">
          <div className="col-md-7"> 
            <div className="top-icons">
              <div className="item">
                <img src={qicon} alt="qicon" />
                <span>QUESTIONS: 50</span>
              </div>
              <div className="item">
                <img src={clockicon} alt="clockicon" />
                <span>TIME: 60 MINS</span>
              </div>
            </div>
            <h5>Before You Start</h5>
            <div className="row">
              <div className="col-1">
                <span className="dot"></span>
              </div>
              <div className="col-10 para">
                You are about to practice official questions set for WASSCE/GCE.
              </div>
            </div>
            <div className="row">
              <div className="col-1">
                <span className="dot"></span>
              </div>
              <div className="col-10 para">
                At the end of your exam practice, you can tap on review to view
                correct answers and solutions.
              </div>
            </div>
            <div className="row">
              <div className="col-1">
                <span className="dot"></span>
              </div>
              <div className="col-10 para">
                Your results won’t be displayed without your permission.
              </div>
            </div>
            <div className="row">
              <div className="col-1">
                <span className="dot"></span>
              </div>
              <div className="col-10 para">
                To begin your exam practice, simply tap the START button.
              </div>
            </div>
            <div className="row">
              <div className="col-1">
                <span className="dot"></span>
              </div>
              <div className="col-10 para">
                You are about to practice official questions set for WASSCE/GCE.
              </div>
            </div>
            <div className="row">
              <div className="col-1"></div>
              <div className="col-10 small">
                You’ve got this, and we wish you the very best!
              </div>
            </div>
            <Link to="/category/english/quiz">
              <button>Start Exam</button>
            </Link>
          </div>
          <div className="col-md-5">
            <img src={anime} alt="anime" width="100%" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastQuestionsInstruction;
