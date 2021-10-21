import {
  faEllipsisV,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getExams } from "../../../../redux/actions/examActions";

export default function ExamLog() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getExams());
  }, []);
  const exams = useSelector((state) => state.exam.exams);
  const ExamItem = ({ index, exam }) => {
    return (
      <div className="exam-item p-2  p-md-4">
        <div>
          <h5 className="bold nunito text-white">{exam?.title}</h5>
          <div className="text-secondary nunito">
            Published: {new Date(exam?.createdAt).toDateString()}
          </div>
        </div>
        <div className="text-secondary nunito">
          Submission: {exam?.resultsCount}
        </div>
        <div className="text-secondary nunito">
          {exam?.questionTypeId?.name}
        </div>
        <Link to={`/exams/${exam?._id}`}>
          <button className="text-white green-bg btn nunito btn-sm">
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
              <a class="dropdown-item" href="#">
                Edit questions
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Unpublish exam
              </a>
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

  return (
    <div id="examLog">
      <div id="examLogSectionOne">
        <div className="bold text-white nunito">EXAMS</div>
      </div>
      <div id="examLogSectionTwo" className="container-fluid p-2 p-md-5">
        <div className="d-flex justify-content-between align-items-end">
          <p className="text-white  nunito bold">Published Exams</p>
          <Link to="/add-exam">
            <p className="green  nunito ml-2 ml-md-5">
              <FontAwesomeIcon icon={faPlus} className="green" /> Set Up New
              Exam
            </p>
          </Link>
          <p className="text-white light-font nunito underline ml-auto">
            Unpublished Exams
          </p>
        </div>
        <div className="row my-3">
          <div className="col-12 col-md-5">
            <div className="border rounded-pill bg-transparent d-flex align-items-center">
              <FontAwesomeIcon icon={faSearch} className="text-white m-3" />
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
        </div>
      </div>
    </div>
  );
}
