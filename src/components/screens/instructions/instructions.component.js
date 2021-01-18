import React, { useEffect, useRef } from "react";
import "./css/style.css";
import { Link } from "react-router-dom";

const Instructions = (props) => {
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      window.scrollTo(0, 0);
    } else {
      // do componentDidUpdate logic
    }
  }); 

  return (
    <div id="instructions" className="container-fluid relative">
      <div className="row firstSection">
        <div className="col-md-12">
          <h4>Geometrical Construction (2): Angles</h4>
        </div>
      </div>
      <div className="row secondSection">
        <div className="col-md-7">
          <div className="row">
            <div className="col-md-12">
              <h5>Hello Feyikemi! You have taken the right step</h5>
            </div>
          </div>
          <div className="row partTwo">
            <div className="col-2">
              <span>Subject:</span>
            </div>
            <div className="col-9">
              <span className="subjectName">Basic Technology</span>
            </div>
          </div>
          <div className="row partTwo">
            <div className="col-md-2">
              <span>Instruction:</span>
            </div>
            <div className="col-md-8 push2">
              <span>
                You are about to that a 10 question quiz to test how much you
                understand Geametrical Construction(2): Angles.
                <br />
                <br /> No pressure! Take your time to answer the questions.
                <br /> Goodluck{" "}
                <img
                  className="thumb"
                  src={require("../../../assets/img/thumbs.png")}
                  alt="thumbs up"
                />
              </span>
            </div>
          </div>
          <div className="row partTwo">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <Link
                to="/classes/9u09xunr90/jhdiujbep/quiz"
                className="proceed"
              >
                Get Started{" "}
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <img
            className="ready"
            src={require("../../../assets/img/animation_500_kiim5z30.gif")}
            alt="Ready?"
          />
        </div>
      </div>
    </div>
  );
};

export default Instructions;
