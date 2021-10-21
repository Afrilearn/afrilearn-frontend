import { faImage, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
// import SunEditor from "suneditor-react";

import "./style.css";

export default function AddExamQuestion() {
  const [block, setBlock] = useState("Objective");
  const [selcetedQuestion, setSelcetedQuestion] = useState(0);
  const questions = [1, 2, 3, 4, 5];
  return (
    <div id="add-exam">
      <div className="container-fluid row g-md-2 pt-2 pt-md-5">
        <div className="col-12 col-md-3">
          <div className="exam-progress-box p-3 mb-2 p-md-4 d-flex flex-column align-items-start">
            <h3 className="bold text-white nunito mb-5">Set Up Examination</h3>
            <div className="exam-progress-item-after exam-progress-item  text-white d-flex align-items-center">
              <div className="exam-progress-item-indicator exam-progress-item-visited"></div>
              <span>Set Ups</span>
            </div>
            <div className="exam-progress-item  text-white d-flex align-items-center">
              <div className="exam-progress-item-indicator"></div>
              <span>Examination Questions</span>
            </div>
            <p className="green underlined mt-auto">Generate questions</p>
            <div className="d-flex align-items-center">
              <button className="btn btn-lg green-bg text-white px-5">
                PUBLISH
              </button>
              <span className="text-white underline ml-3">Preview</span>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-9 mb-2">
          <div className="exam-progress-box">
            <div className="d-flex align-items-center">
              <div
                className={`select-block ${
                  block === "Objective" && "selected-block"
                }`}
                onClick={() => setBlock("Objective")}
              >
                <span>Objective</span>
              </div>
              <div
                className={`select-block ${
                  block === "Theory" && "selected-block"
                }`}
                onClick={() => setBlock("Theory")}
              >
                <span>Theory</span>
              </div>
            </div>
            <div className="row g-3">
              <div className="col-12 col-md-9 p-2 p-md-4">
                <div className="w-100 bg-white p-4 rounded-3 d-flex">
                  <span className="">Question 2</span>
                  <FontAwesomeIcon
                    icon={faImage}
                    size="lg"
                    className="mr-2 ml-auto"
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-danger mx-2"
                    size="lg"
                  />
                </div>
                {/* <SunEditor /> */}
                <div className="min-h-300 bg-secondary my-3 rounded w-100"></div>
                <div className="add-question-option">
                  <div className="bg-white p-4">A</div>
                  <input
                    type="text"
                    className="bg-transparent border-0 w-100"
                  />
                </div>
              </div>
              <div className="col-12 col-md-3 p-2 p-md-4">
                <div className="d-flex flex-wrap">
                  {questions.map((i, index) => (
                    <div
                      className={`question-nav-item ${
                        selcetedQuestion === index &&
                        "question-nav-item-selected"
                      }`}
                      onClick={() => setSelcetedQuestion(index)}
                    >
                      {i}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
