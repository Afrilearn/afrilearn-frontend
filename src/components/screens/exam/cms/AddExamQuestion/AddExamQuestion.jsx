import { faImage, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  Link,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import HTMLEditor from "../../../includes/htmlEditor/htmlEditor.component";
// import SunEditor from "suneditor-react";

import "./style.css";

const btnList = [
  ["undo", "redo"],
  ["font", "fontSize", "formatBlock"],
  ["bold", "underline", "italic", "strike", "subscript", "superscript"],
  ["removeFormat"],
  "/",
  ["fontColor", "hiliteColor"],
  ["outdent", "indent"],
  ["align", "horizontalRule", "list", "table"],
  ["link", "image"],
  ["fullScreen", "showBlocks", "codeView"],
];
export default function AddExamQuestion(props) {
  const [block, setBlock] = useState("Objective");
  const [selcetedQuestion, setSelcetedQuestion] = useState(0);
  const questions = [1, 2, 3, 4, 5];
  const options = [];
  function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    var isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
    // Partially visible elements return true:
    //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
  }
  for (let index = 0; index < 50; index++) {
    options.push(index + 1);
  }
  const { path, url } = useRouteMatch();
  const {
    location: { pathname },
  } = useHistory();
  // console.log("pathname", pathname === url + "/preview");

  const inPreview = pathname === url + "/preview";
  const ObjectiveQuestionPreviewItem = ({ index }) => {
    return (
      <div id={`previewQuestionNo${index}`} className="mb-5">
        <div className="w-100 bg-white p-4 rounded-3 d-flex">
          <span className="">Question {index + 1}</span>
          <FontAwesomeIcon icon={faImage} size="lg" className="mr-2 ml-auto" />
          <FontAwesomeIcon
            icon={faTrash}
            className="text-danger mx-2"
            size="lg"
          />
        </div>
        {/* <SunEditor /> */}

        <div className="py-2">
          <p className="text-white">
            Which angle is represented in the diagram shown?
          </p>
        </div>
        <div className="option-item">A. 129</div>
        <div className="option-item">B. 35</div>
        <div className="option-item">C. 45</div>
        <div className="option-item">D. 90</div>
      </div>
    );
  };
  const TheoryQuestionPreviewItem = ({ index }) => {
    return (
      <div id={`previewQuestionNo${index}`} className="mb-5">
        <div className="w-100 bg-white p-4 rounded-3 d-flex">
          <span className="">Question {index + 1}</span>
          <FontAwesomeIcon icon={faImage} size="lg" className="mr-2 ml-auto" />
          <FontAwesomeIcon
            icon={faTrash}
            className="text-danger mx-2"
            size="lg"
          />
        </div>
        {/* <SunEditor /> */}

        <div className="min-h-300 bg-secondary my-3 rounded w-100"></div>
      </div>
    );
  };

  return (
    <div id="add-exam">
      <div className="container-fluid row g-md-2 pt-2 pt-md-5">
        <div className="col-12 col-md-3">
          <div className="exam-progress-box p-3 mb-2 p-md-4 d-flex flex-column align-items-start">
            <h3 className="bold text-white nunito mb-5">Set Up Examination</h3>
            <div className="exam-progress-items">
              <small></small>
              <div className="exam-progress-item-after exam-progress-item  text-white d-flex align-items-center">
                <div className="exam-progress-item-indicator exam-progress-item-visited"></div>
                <span>Set Ups</span>
              </div>
              <div className="exam-progress-item  text-white d-flex align-items-center">
                <div className="exam-progress-item-indicator exam-progress-item-visited"></div>
                <span>Examination Questions</span>
              </div>
            </div>
            {!inPreview && (
              <Link to={`${url}/generate`} className="green underlined mt-auto">
                <p className="green underlined ">Generate questions</p>
              </Link>
            )}
            {!inPreview && (
              <div className="d-flex align-items-center">
                <button className="btn btn-lg green-bg text-white px-5">
                  PUBLISH
                </button>
                <Link to={`${url}/preview`}>
                  <span className="text-white underline ml-3">Preview</span>
                </Link>
              </div>
            )}
            <Link to={url}>
              <button className="add-new-question-button">
                <FontAwesomeIcon icon={faPlus} color="white" /> Add new question
              </button>
            </Link>
          </div>
        </div>
        <div className="col-12 col-md-9 mb-2">
          <div className="similar-box">
            <Switch>
              <Route path={`${path}/generate`}>
                <div className="p-2 p-md-4">
                  <div className="row g-2">
                    <div className="col-12 col-md-8">
                      <h3 className="bold text-white nunito mb-5">
                        Generate Exam Questions
                      </h3>
                      <label htmlFor="questionType" className="text-light mt-3">
                        Class
                      </label>
                      <select
                        className="general border"
                        name="subjectId"
                        id="questionType"
                      >
                        <option>Select class</option>
                      </select>
                      <label htmlFor="questionType" className="text-light mt-3">
                        Subject
                      </label>
                      <select
                        className="general border"
                        name="subjectId"
                        id="questionType"
                      >
                        <option>Select subject</option>
                      </select>
                      <label htmlFor="questionType" className="text-light mt-3">
                        Term
                      </label>
                      <select
                        className="general border"
                        name="subjectId"
                        id="questionType"
                      >
                        <option>Select term</option>
                      </select>
                      <label htmlFor="title" className="text-light mt-3">
                        No of Questions
                      </label>
                      <input
                        type="text"
                        placeholder="Input number of questions"
                        id="title"
                        className="general border"
                        name="email"
                      />
                      <div className="d-flex justify-content-end mt-3">
                        <button className="btn btn-lg bg-white text-black">
                          PROCEED
                        </button>
                      </div>
                    </div>
                    <div className="col-12 col-md-4"></div>
                  </div>
                </div>
              </Route>
              <Route path={`${path}/preview`}>
                <div className="p-2 p-md-4">
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
                  {block === "Objective" && (
                    <div className="row g-3  py-2 py-md-4">
                      <div className="col-12 col-md-9 order-1 order-md-0">
                        {options.map((i, index) => (
                          <ObjectiveQuestionPreviewItem index={index} />
                        ))}
                      </div>
                      <div className="col-12 col-md-3 order-0 order-md-1 position-relative">
                        <div className="d-flex flex-wrap options-box  p-2 p-md-4">
                          {options.map((i, index) => (
                            <a href={`#previewQuestionNo${index}`}>
                              <div
                                className={`question-nav-item ${
                                  selcetedQuestion === index &&
                                  "question-nav-item-selected"
                                }`}
                              >
                                {i}
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {block === "Theory" && (
                    <div className="row g-3 p-2 p-md-4">
                      <div className="col-12 col-md-9 order-1 order-md-0">
                        {options.map((i, index) => (
                          <TheoryQuestionPreviewItem index={index} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Route>
              <Route exact path={path}>
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
                <div>
                  {block === "Objective" && (
                    <div className="row g-3 p-2 p-md-4">
                      <div className="col-12 col-md-9 order-1 order-md-0">
                        <div className="w-100 bg-white p-4 rounded-3 d-flex">
                          <span className="bold nunito">
                            New Objective Question{" "}
                          </span>
                        </div>
                        <div className="min-h-300 bg-secondary my-3 rounded w-100">
                          <SunEditor
                            setOptions={{
                              height: 300,
                              buttonList: btnList,
                            }}
                          />
                        </div>
                        <div className="add-question-option">
                          <div className="bg-white p-4">A</div>
                          <input
                            type="text"
                            className="bg-transparent border-0 w-100"
                          />
                        </div>
                        <div className="add-question-option">
                          <div className="bg-white p-4">B</div>
                          <input
                            type="text"
                            className="bg-transparent border-0 w-100"
                          />
                        </div>
                        <div className="add-question-option">
                          <div className="bg-white p-4">C</div>
                          <input
                            type="text"
                            className="bg-transparent border-0 w-100"
                          />
                        </div>
                        <div className="add-question-option">
                          <div className="bg-white p-4">D</div>
                          <input
                            type="text"
                            className="bg-transparent border-0 w-100"
                          />
                        </div>
                        <label
                          htmlFor="questionType"
                          className="text-light mt-3"
                        >
                          Correct Option
                        </label>
                        <select
                          className="general border"
                          name="subjectId"
                          id="questionType"
                        >
                          <option>Select corect option</option>
                        </select>
                        <label htmlFor="title" className="text-light mt-3">
                          Assign mark(score)
                        </label>
                        <input
                          type="text"
                          placeholder="2"
                          id="title"
                          className="general border"
                          name="email"
                        />
                        <div className="mt-3">
                          <input
                            type="checkbox"
                            id="vehicle1"
                            name="vehicle1"
                            value="Bike"
                          />
                          <label for="vehicle1" className="ml-2 text-white">
                            Use this for all questions
                          </label>
                        </div>
                        <button className="btn btn-lg bg-white text-black mt-3">
                          Submit
                        </button>
                      </div>
                      <div className="col-12 col-md-3 order-0 order-md-1">
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
                  )}
                  {block === "Theory" && (
                    <div className="row g-3 p-2 p-md-4">
                      <div className="border-bottom">
                        <div className="col-12 col-md-9">
                          <div className="w-100 bg-white p-4 rounded-3 d-flex">
                            <span className="bold nunito">
                              New Theory Question{" "}
                            </span>
                          </div>
                          {/* <SunEditor /> */}
                          <div className="min-h-300 bg-secondary my-3 rounded w-100">
                            <SunEditor
                              setOptions={{
                                height: 300,
                                buttonList: btnList,
                              }}
                            />
                          </div>
                          <button className="btn btn-lg bg-white text-black mt-3">
                            Submit
                          </button>
                        </div>
                        <div className="col-12 col-md-3 p-2 p-md-4"></div>
                      </div>
                    </div>
                  )}
                </div>
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}
