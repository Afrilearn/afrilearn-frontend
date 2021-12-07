import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import {
  addExamQuestion,
  deleteQuestion,
  getExam,
  inputChange,
  updateExam,
  updateExamQuestion,
} from "../../../../../redux/actions/examActions";
import parse from "html-react-parser";
import Swal from "sweetalert2";
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
  const dispatch = useDispatch();

  const params = useParams();
  const [block, setBlock] = useState("Objective");
  const [question, setQuestion] = useState(null);
  const contentImagesRef = useRef([]);

  const handleImageUpload = (targetImgElement, index, state, imageInfo) => {
    if (imageInfo?.src?.includes("http://")) return;
    if (!imageInfo?.src) return;
    var blobBin = imageInfo?.src && atob(imageInfo?.src?.split(",")[1]);
    var array = [];
    for (var i = 0; i < blobBin.length; i++) {
      array.push(blobBin.charCodeAt(i));
    }
    var file = new Blob([new Uint8Array(array)], { type: "image/jpg" });
    contentImagesRef.current = [
      ...contentImagesRef.current,
      { file: file, src: imageInfo.src },
    ];
  };

  const exam = useSelector((state) => state.exam.exam);
  const selcetedQuestion = useSelector((state) => state.exam.selcetedQuestion);
  console.log("selcetedQuestion", selcetedQuestion);
  const questions = exam.questions;
  console.log("exam", exam);
  console.log("question", question);
  // console.log("exam", exam);
  useEffect(() => {
    dispatch(inputChange("selcetedQuestion", questions[0]));
  }, []);
  useEffect(() => {
    dispatch(getExam(params.examId));
    setQuestion(questions[0]);
  }, []);

  const addNewQuestion = (data) => {
    dispatch(
      inputChange("questions", [
        ...questions,
        { id: `${questions.length + 1}`, ...data },
      ])
    );
  };

  const updateQuestion = (question) => {
    const questionIndex = questions.findIndex(
      (i) => i.id === selcetedQuestion?.id
    );
    const nnn = questions;

    if (questionIndex !== -1) {
      nnn[questionIndex] = question;
    }
    dispatch(inputChange("questions", nnn));
  };

  const { path, url } = useRouteMatch();
  const {
    location: { pathname },
  } = useHistory();

  const inPreview = pathname === url + "/preview";
  const ObjectiveQuestionPreviewItem = ({ index, question }) => {
    return (
      <div id={`previewQuestionNo${question.id}`} className="mb-5">
        <div className="w-100 bg-white p-4 rounded-3 d-flex">
          <span className="">Question {index + 1}</span>
          {/* <FontAwesomeIcon icon={faImage} size="lg" className="mr-2 ml-auto" /> */}
          <FontAwesomeIcon
            onClick={() => {
              dispatch(deleteQuestion(question._id));
            }}
            icon={faTrash}
            className="text-danger mx-2 ml-auto"
            size="lg"
          />
        </div>
        {/* <SunEditor /> */}

        <div className="my-2 bg-white p-4 rounded-3">
          <p className=" ">{question.question && parse(question.question)}</p>
        </div>
        <div className="option-item">
          A. {question.options && parse(question.options[0])}
        </div>
        <div className="option-item">
          B. {question.options && parse(question.options[1])}
        </div>
        <div className="option-item">
          C. {question.options && parse(question.options[2])}
        </div>
        <div className="option-item">
          D. {question.options && parse(question.options[3])}
        </div>
      </div>
    );
  };
  const TheoryQuestionPreviewItem = ({ index, question }) => {
    console.log("question", question);
    return (
      <div id={`previewQuestionNo${question.id}`} className="mb-5">
        <div className="w-100 bg-white p-4 rounded-3 d-flex">
          <span className="">Question {index + 1}</span>
          {/* <FontAwesomeIcon icon={faImage} size="lg" className="mr-2 ml-auto" /> */}
          <FontAwesomeIcon
            onClick={() => {
              dispatch(deleteQuestion(question._id));
            }}
            icon={faTrash}
            className="text-danger mx-2 ml-auto"
            size="lg"
          />
        </div>
        {/* <SunEditor /> */}

        <div className="min-h-300 bg-white my-3 rounded w-100">
          <div className="p-2">
            <p className="text-black">
              {question.question && parse(question.question)}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const NavigationItem = ({ i, index }) => (
    <div
      className={`question-nav-item ${
        question?._id === i._id && "question-nav-item-selected"
      }`}
      onClick={() => {
        // dispatch(inputChange("selcetedQuestion", i));
        setBlock(i.type);
        setQuestion(null);
        setTimeout(() => {
          setQuestion(i);
        }, 200);
      }}
    >
      {index + 1}
    </div>
  );

  const AddNewItemButton = () => {
    return (
      <div className="dropdown">
        <div
          className="question-nav-item "
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          {(exam.questionTypeId?._id === "61683f7ddf6ca80c9c5a3283" ||
            exam.questionTypeId?._id === "61683f90df6ca80c9c5a3287") && (
            <li
              class="dropdown-item"
              onClick={() => {
                dispatch(
                  addExamQuestion({
                    question: "",
                    answer: "",
                    examId: params.examId,
                    options: ["", "", "", ""],
                    type: "Objective",
                  })
                );
                // addNewQuestion({
                //   question: "",
                //   answer: "",
                //   optionOne: "",
                //   optionTwo: "",
                //   optionThree: "",
                //   optionFour: "",
                //   type: "Objective",
                // });
              }}
            >
              Add Objective Question
            </li>
          )}
          {(exam.questionTypeId?._id === "61683f87df6ca80c9c5a3285" ||
            exam.questionTypeId?._id === "61683f90df6ca80c9c5a3287") && (
            <li
              class="dropdown-item"
              onClick={() => {
                dispatch(
                  addExamQuestion({
                    question: "",
                    answer: "",
                    examId: params.examId,

                    type: "Theory",
                  })
                );
                // addNewQuestion({
                //   question: "",
                //   answer: "",
                //   optionOne: "",
                //   optionTwo: "",
                //   optionThree: "",
                //   optionFour: "",
                //   type: "Theory",
                // });
              }}
            >
              Add Theory Question
            </li>
          )}{" "}
        </ul>
      </div>
    );
  };

  const AddQuestion = () => {
    return (
      <div className="dropdown">
        <button
          className="add-new-question-button"
          id="dropdownMenuButton2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <FontAwesomeIcon icon={faPlus} color="white" /> Add new question
        </button>

        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
          {(exam.questionTypeId?._id === "61683f7ddf6ca80c9c5a3283" ||
            exam.questionTypeId?._id === "61683f90df6ca80c9c5a3287") && (
            <li
              class="dropdown-item"
              onClick={() => {
                dispatch(
                  addExamQuestion({
                    question: "",
                    answer: "",
                    examId: params.examId,
                    options: ["", "", "", ""],
                    type: "Objective",
                  })
                );
              }}
            >
              Add Objective Question
            </li>
          )}
          {(exam.questionTypeId?._id === "61683f87df6ca80c9c5a3285" ||
            exam.questionTypeId?._id === "61683f90df6ca80c9c5a3287") && (
            <li
              class="dropdown-item"
              onClick={() => {
                dispatch(
                  addExamQuestion({
                    question: "",
                    answer: "",
                    examId: params.examId,

                    type: "Theory",
                  })
                );
                // addNewQuestion({
                //   question: "",
                //   answer: "",
                //   optionOne: "",
                //   optionTwo: "",
                //   optionThree: "",
                //   optionFour: "",
                //   type: "Theory",
                // });
              }}
            >
              Add Theory Question
            </li>
          )}
        </ul>
      </div>
    );
  };

  const showWarning = (message) => {
    Swal.fire({
      html: message,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
      timer: 3500,
      position: "top",
    });
  };
  const addQuestionStatus = useSelector(
    (state) => state.exam.addQuestionStatus
  );
  const updateQuestionStatus = useSelector(
    (state) => state.exam.updateQuestionStatus
  );

  useEffect(() => {
    if (addQuestionStatus === "success") {
      showWarning("Question added successfully.");
    }
    if (addQuestionStatus === "failed") {
      showWarning("Error adding the question, try again.");
    }
    if (updateQuestionStatus === "success") {
      showWarning("Question updated successfully.");
    }
    if (updateQuestionStatus === "failed") {
      showWarning("Error updating the question, try again.");
    }
  }, [addQuestionStatus, updateQuestionStatus]);
  return (
    <div id="add-exam">
      <div className="container-fluid row g-md-2 pt-2 pt-md-5">
        <div className="col-12 col-md-3">
          <div className="exam-progress-box p-3 mb-2 p-md-4 d-flex flex-column align-items-start">
            <h3 className="bold text-white nunito">Set Up Examination</h3>
            <p className="bold text-white nunito">{exam.title}</p>
            <p className="bold text-white nunito mb-5">
              {exam.questionTypeId?.name}
            </p>
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
            {/* {!inPreview && (
              <Link to={`${url}/generate`} className="green underlined mt-auto">
                <p className="green underlined ">Generate questions</p>
              </Link>
            )} */}
            {!inPreview && (
              <div className="d-flex align-items-center mt-auto">
                {exam.publish ? (
                  <button
                    className="btn btn-lg green-bg text-white px-5"
                    onClick={() => {
                      dispatch(updateExam(exam._id, { publish: false }));
                    }}
                  >
                    UNPUBLISH
                  </button>
                ) : (
                  <button
                    className="btn btn-lg green-bg text-white px-5"
                    onClick={() => {
                      dispatch(updateExam(exam._id, { publish: true }));
                    }}
                  >
                    PUBLISH
                  </button>
                )}

                {questions.length > 0 && (
                  <Link to={`${url}/preview`}>
                    <span className="text-white underline ml-3">Preview</span>
                  </Link>
                )}
              </div>
            )}
            <span className="text-white my-3">
              This Exam is currently{" "}
              {exam.publish ? "Published" : "Unpublished"}
            </span>
            <Link to={url}>
              <AddQuestion />
            </Link>
          </div>
        </div>
        <div className="col-12 col-md-9 mb-2">
          <div className="similar-box">
            <Switch>
              {/* <Route path={`${path}/generate`}>
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
              
               */}
              <Route path={`${path}/preview`}>
                {questions && questions.length === 0 ? (
                  <div className="exams-empty rounded d-flex justify-content-center align-items-center text-white nunito flex-column">
                    <Link to={url}>
                      <AddQuestion />
                    </Link>
                  </div>
                ) : (
                  <div className="p-2 p-md-4">
                    {/* <div className="d-flex align-items-center">
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
                  */}
                    <div className="row g-3  py-2 py-md-4">
                      <div className="col-12 col-md-8 order-1 order-md-0">
                        {questions.map((i, index) => {
                          if (i.type === "Objective") {
                            return (
                              <ObjectiveQuestionPreviewItem
                                index={index}
                                question={i}
                              />
                            );
                          } else {
                            return (
                              <TheoryQuestionPreviewItem
                                index={index}
                                question={i}
                              />
                            );
                          }
                        })}
                      </div>
                      <div className="col-12 col-md-4 order-0 order-md-1 position-relative">
                        <div className="d-flex flex-wrap options-box  p-2 p-md-4">
                          {questions.map((i, index) => (
                            <a href={`#previewQuestionNo${i.id}`}>
                              <div className={`question-nav-item`}>
                                {index + 1}
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* {block === "Theory" && (
                      <div className="row g-3 p-2 p-md-4">
                        <div className="col-12 col-md-9 order-1 order-md-0">
                          {questions
                            .filter((i) => i.type === "Theory")
                            .map((i, index) => (
                              <TheoryQuestionPreviewItem
                                index={index}
                                question={i}
                              />
                            ))}
                        </div>
                        <div className="col-12 col-md-3 order-0 order-md-1 position-relative">
                          <div className="d-flex flex-wrap options-box  p-2 p-md-4">
                            {questions
                              .filter((i) => i.type === "Theory")
                              .map((i, index) => (
                                <a href={`#previewQuestionNo${i.id}`}>
                                  <div className={`question-nav-item`}>
                                    {i.id}
                                  </div>
                                </a>
                              ))}
                          </div>
                        </div>
                      </div>
                    )} */}
                  </div>
                )}
              </Route>
              <Route exact path={path}>
                {questions && questions.length === 0 ? (
                  <div className="exams-empty rounded d-flex justify-content-center align-items-center text-white nunito flex-column">
                    <AddQuestion />
                  </div>
                ) : (
                  <div>
                    <div className="d-flex align-items-center">
                      <div
                        className={`select-block ${
                          block === "Objective" && "selected-block"
                        }`}
                      >
                        <span>Objective</span>
                      </div>
                      <div
                        className={`select-block ${
                          block === "Theory" && "selected-block"
                        }`}
                      >
                        <span>Theory</span>
                      </div>
                    </div>
                    <div>
                      <div className="row g-3 p-2 p-md-4">
                        <div className="col-12 col-md-8 order-1 order-md-0">
                          {questions && questions.length > 0 && !question && (
                            <div className="w-100 p-5 d-flex justify-content-center align-items-center">
                              <span className="text-white">
                                Select a question number
                              </span>
                            </div>
                          )}
                          {block === "Objective" && question && (
                            <div className="">
                              <div className="w-100 bg-white p-4 rounded-3 d-flex">
                                <span className="bold nunito">
                                  Question{" "}
                                  {questions.findIndex(
                                    (i) => i._id === question?._id
                                  ) + 1}
                                </span>
                              </div>
                              <div className="min-h-300 bg-secondary my-3 rounded w-100">
                                {question && (
                                  <SunEditor
                                    setOptions={{
                                      height: 300,
                                      buttonList: btnList,
                                    }}
                                    defaultValue={question?.question}
                                    onImageUpload={handleImageUpload}
                                    onChange={(text) => {
                                      setQuestion((currentQuestion) => ({
                                        ...currentQuestion,
                                        question: text,
                                      }));
                                      // dispatch(
                                      //   inputChange("selcetedQuestion", {
                                      //     ...selcetedQuestion,
                                      //     question: text,
                                      //   })
                                      // );
                                      // const index = questions.findIndex(
                                      //   (i) => i.id === selcetedQuestion?.id
                                      // );
                                      // console.log("index", index);
                                      // const focu = questions.find(
                                      //   (i) => i.id === selcetedQuestion?.id
                                      // );
                                      // console.log("focu", focu);
                                      // focu.question = text;
                                      // const copyquestions = questions;
                                      // copyquestions.splice(index, 1, focu);
                                      // dispatch(
                                      //   inputChange("questions", copyquestions)
                                      // );
                                    }}
                                  />
                                )}
                              </div>
                              <label className="text-light mt-3">Options</label>
                              <div className="add-question-option">
                                <div className="bg-white p-4">A</div>
                                <input
                                  type="text"
                                  className="bg-transparent border-0 w-100 text-white ml-2"
                                  defaultValue={question?.options[0]}
                                  onChange={(e) => {
                                    const options = question.options;
                                    options[0] = e.target.value;
                                    setQuestion((currentQuestion) => ({
                                      ...currentQuestion,
                                      options,
                                    }));
                                    // dispatch(
                                    //   inputChange("selcetedQuestion", {
                                    //     ...selcetedQuestion,
                                    //     optionOne: e.target.value,
                                    //   })
                                    // );
                                  }}
                                />
                              </div>
                              <div className="add-question-option">
                                <div className="bg-white p-4">B</div>
                                <input
                                  type="text"
                                  readOnly={!question?.options[0]}
                                  className="bg-transparent border-0 w-100 text-white ml-2"
                                  defaultValue={question?.options[1]}
                                  onChange={(e) => {
                                    const options = question.options;
                                    options[1] = e.target.value;
                                    setQuestion((currentQuestion) => ({
                                      ...currentQuestion,
                                      options,
                                    }));
                                    // dispatch(
                                    //   inputChange("selcetedQuestion", {
                                    //     ...selcetedQuestion,
                                    //     optionTwo: e.target.value,
                                    //   })
                                    // );
                                  }}
                                />
                              </div>
                              <div className="add-question-option">
                                <div className="bg-white p-4">C</div>
                                <input
                                  type="text"
                                  readOnly={!question?.options[1]}
                                  className="bg-transparent border-0 w-100 text-white ml-2"
                                  defaultValue={question?.options[2]}
                                  onChange={(e) => {
                                    const options = question.options;
                                    options[2] = e.target.value;
                                    setQuestion((currentQuestion) => ({
                                      ...currentQuestion,
                                      options,
                                    }));
                                    // dispatch(
                                    //   inputChange("selcetedQuestion", {
                                    //     ...selcetedQuestion,
                                    //     optionThree: e.target.value,
                                    //   })
                                    // );
                                  }}
                                />
                              </div>
                              <div className="add-question-option">
                                <div className="bg-white p-4">D</div>
                                <input
                                  type="text"
                                  readOnly={!question?.options[2]}
                                  className="bg-transparent border-0 w-100 text-white ml-2"
                                  defaultValue={question?.options[3]}
                                  onChange={(e) => {
                                    const options = question.options;
                                    options[3] = e.target.value;
                                    setQuestion((currentQuestion) => ({
                                      ...currentQuestion,
                                      options,
                                    }));
                                    // dispatch(
                                    //   inputChange("selcetedQuestion", {
                                    //     ...selcetedQuestion,
                                    //     optionFour: e.target.value,
                                    //   })
                                    // );
                                  }}
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
                                onChange={(e) => {
                                  setQuestion((currentQuestion) => ({
                                    ...currentQuestion,
                                    correctOption: e.target.value,
                                  }));
                                  // correctOption
                                  // dispatch(
                                  //   inputChange("selcetedQuestion", {
                                  //     ...selcetedQuestion,
                                  //     correctOption: e.target.value,
                                  //   })
                                  // );
                                }}
                              >
                                <option>Select corect option</option>
                                {question?.options.map((i, index) => (
                                  <option
                                    value={index}
                                    key={index}
                                    selected={index === question.correctOption}
                                  >
                                    {index === 0
                                      ? "A"
                                      : index === 1
                                      ? "B"
                                      : index === 2
                                      ? "C"
                                      : "D"}
                                  </option>
                                ))}
                              </select>
                              <label
                                htmlFor="title"
                                className="text-light mt-3"
                              >
                                Assign mark(score)
                              </label>
                              <input
                                type="number"
                                placeholder="0"
                                defaultValue={question.markWeight}
                                id="title"
                                className="general border"
                                name="markWeight"
                                onChange={(e) => {
                                  setQuestion((currentQuestion) => ({
                                    ...currentQuestion,
                                    markWeight: Number(e.target.value),
                                  }));
                                }}
                              />
                              {/* <div className="mt-3">
                                <input
                                  type="checkbox"
                                  id="vehicle1"
                                  name="vehicle1"
                                  value="Bike"
                                />
                                <label
                                  for="vehicle1"
                                  className="ml-2 text-white"
                                >
                                  Use this for all questions
                                </label>
                              </div> */}
                              <button
                                className="btn btn-lg bg-white text-black mt-4"
                                onClick={() =>
                                  dispatch(
                                    updateExamQuestion(question._id, {
                                      markWeight: question.markWeight,
                                      question: question.question,
                                      correctOption: question.correctOption,
                                      options: question.options,
                                      contentImages: contentImagesRef.current.map(
                                        (cnt) => cnt.file
                                      ),
                                      contentUrls: contentImagesRef.current.map(
                                        (cnt) => cnt.src
                                      ),
                                    })
                                  )
                                }
                              >
                                Save Changes
                              </button>
                            </div>
                          )}
                          {block === "Theory" && question && (
                            <div className="border-bottom pb-3">
                              <div className="w-100 bg-white p-4 rounded-3 d-flex">
                                <span className="bold nunito">
                                  Question{" "}
                                  {questions.findIndex(
                                    (i) => i._id === question?._id
                                  ) + 1}
                                </span>
                              </div>
                              {/* <SunEditor /> */}
                              <div className="min-h-300 bg-secondary my-3 rounded w-100">
                                {question && (
                                  <SunEditor
                                    setOptions={{
                                      height: 300,
                                      buttonList: btnList,
                                    }}
                                    defaultValue={question?.question}
                                    onChange={(text) => {
                                      setQuestion((currentQuestion) => ({
                                        ...currentQuestion,
                                        question: text,
                                      }));
                                      // dispatch(
                                      //   inputChange("selcetedQuestion", {
                                      //     ...selcetedQuestion,
                                      //     question: text,
                                      //   })
                                      // );
                                      // const index = questions.findIndex(
                                      //   (i) => i.id === selcetedQuestion?.id
                                      // );
                                      // console.log("index", index);
                                      // const focu = questions.find(
                                      //   (i) => i.id === selcetedQuestion?.id
                                      // );
                                      // console.log("focu", focu);
                                      // focu.question = text;
                                      // const copyquestions = questions;
                                      // copyquestions.splice(index, 1, focu);
                                      // dispatch(
                                      //   inputChange("questions", copyquestions)
                                      // );
                                    }}
                                  />
                                )}
                              </div>

                              <button
                                className="btn btn-lg bg-white text-black mt-4"
                                onClick={() => {
                                  dispatch(
                                    updateExamQuestion(question._id, {
                                      question: question.question,
                                    })
                                  );
                                }}
                              >
                                Save Changes
                              </button>
                            </div>
                          )}
                        </div>
                        <div className="col-12 col-md-4 order-0 order-md-1">
                          <div className="d-flex flex-wrap">
                            {questions &&
                              questions.map((i, index) => (
                                <NavigationItem
                                  i={i}
                                  key={index}
                                  index={index}
                                />
                              ))}
                            {/* <div className="col-3 d-flex justify-content-center flex-shrink-0"> */}
                            <AddNewItemButton />
                            {/* </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}
