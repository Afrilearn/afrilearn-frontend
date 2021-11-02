import {
  faEllipsisV,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getExams, updateExam } from "../../../../../redux/actions/examActions";
import queryString from "query-string";

export default function ExamLog(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getExams());
  }, []);
  const parsed = queryString.parse(props.location.search);
  const loadingExams = useSelector((state) => state.exam.loadingExams);
  const exams = useSelector((state) => state.exam.exams);

  const ExamItem = ({ index, exam }) => {
    return (
      <div className="exam-item p-2  p-md-4">
        <div className="three-space">
          <h5 className="bold nunito text-white">{exam?.title}</h5>
          <div className="text-secondary nunito">
            Published: {new Date(exam?.createdAt).toDateString()}
          </div>
        </div>
        <div className="text-secondary nunito two-space">
          Submission: {exam?.resultsCount}
        </div>
        <div className="text-secondary nunito two-space">
          {exam?.questionTypeId?.name}
        </div>
        <Link to={`/exams/${exam?._id}`}>
          <button className="text-white green-bg btn nunito btn-sm viewRecord two-space">
            VIEW
          </button>
        </Link>
        <div className="btn-group dropdown ">
          <FontAwesomeIcon
            icon={faEllipsisV}
            size="lg"
            className="text-secondary nunito dropdown-toggle cursor"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          />
          <ul class="dropdown-menu">
            <li>
              <Link to={`/add-exam/${exam._id}`} class="dropdown-item" href="#">
                Edit questions
              </Link>
            </li>
            <li>
              {exam.publish ? (
                <span
                  class="dropdown-item"
                  onClick={() => {
                    dispatch(updateExam(exam._id, { publish: false }));
                  }}
                >
                  Unpublish exam
                </span>
              ) : (
                <span
                  class="dropdown-item"
                  onClick={() => {
                    dispatch(updateExam(exam._id, { publish: true }));
                  }}
                >
                  Publish exam
                </span>
              )}
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Send results to students
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  if (parsed.classId === "undefined") return <Redirect to="/dashboard" />;
  return (
    <div id="examLog">
      <div id="examLogSectionOne">
        <div className="bold text-white nunito">EXAMS</div>
      </div>
      <div id="examLogSectionTwo" className="container-fluid p-2 p-md-5">
        <div className="d-flex justify-content-between align-items-end">
          <p className="text-white  nunito bold">Published Exams</p>
          <Link to={`/add-exam?classId=${parsed.classId}`}>
            <p className="green  nunito ml-2 ml-md-5 shift1">
              <FontAwesomeIcon icon={faPlus} className="green addExam" /> Set Up
              New Exam
            </p>
          </Link>
          {/* <p className="text-white light-font nunito underline ml-auto">
            Unpublished Exams
          </p> */}
        </div>
        <div className="row my-3">
          <div className="col-12 col-md-4">
            <div className="border rounded-pill bg-transparent d-flex align-items-center">
              <FontAwesomeIcon
                icon={faSearch}
                className="text-white m-3 searchButton"
              />
              <input
                type="text"
                className="bg-transparent w-auto text-white border-0 input nunito"
                placeholder="Search friends by name"
              />
            </div>
          </div>
          <div className="col-12 col-md-2"></div>
          <div className="col-12 col-md-5"></div>
        </div>

        <div className="exams-list my-5 overflow-x-scroll">
          {exams.map((exam, index) => (
            <ExamItem index={index} exam={exam} />
          ))}
          {!loadingExams && exams.length === 0 && (
            <div className="exams-empty rounded d-flex justify-content-center align-items-center text-white nunito flex-column">
              <span>
                Your Exams list is currently empty. Click below to get started
              </span>
              <Link to={`/add-exam?classId=${parsed.classId}`}>
                <p className="green  nunito my-3">
                  <FontAwesomeIcon icon={faPlus} className="green addExam" />{" "}
                  Set Up New Exam
                </p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
