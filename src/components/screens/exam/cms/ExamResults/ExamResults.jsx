import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import secondsToHms from "../../../../../assets/js/secondsToHms";
import { getExam } from "../../../../../redux/actions/examActions";
import "./style.css";

export default function ExamResults(props) {
  const { examId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getExam(examId));
  }, []);
  const exam = useSelector((state) => state.exam.exam);

  return (
    <div id="examResults">
      <div id="examResultsSectionOne">
        <div className="bold text-white nunito">EXAMS</div>
      </div>
      <div id="examResultsSectionTwo">
        <div className="container-fluid px-2 px-md-5 py-2 py-md-3">
          <div className="d-flex justify-content-between align-items-end">
            <div>
              <p className="text-white light-font nunito">
                Exam Title: {exam?.title}
              </p>
              <p className="text-white light-font nunito">
                Exam Type: {exam?.questionTypeId?.name}
              </p>
              <p className="text-white light-font nunito">
                Duration: {secondsToHms(exam.duration)}
              </p>
            </div>
            <div>
              <p className="green underlined light-font nunito">
                Send result to students
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div className="container-fluid px-2 px-md-5 py-2 py-md-5">
          <div className="d-flex justify-content-between">
            <p className="text-white bold nunito">Submissions</p>
            <p className="text-white light-font nunito">
              {exam?.results?.length} students
            </p>
          </div>
          <div className="table-responsive  p-2 p-md-4 rounded-3">
            <table class="table table-lg table-transparent ">
              <thead>
                <tr>
                  <th scope="col" className="text-white light-font nunito">
                    Names
                  </th>
                  <th scope="col" className="text-white light-font nunito">
                    Date Submitted
                  </th>
                  <th scope="col" className="text-white light-font nunito">
                    Status
                  </th>
                  <th scope="col" className="text-white light-font nunito">
                    Total Score
                  </th>
                  <th scope="col" className="text-white light-font nunito">
                    View
                  </th>
                </tr>
              </thead>
              <tbody>
                {exam.results?.map((result, index) => (
                  <tr>
                    <th scope="row" className="text-white light-font nunito">
                      {result?.userId.fullName}
                    </th>
                    <td className="text-white light-font nunito">
                      {new Date(result.createdAt).toDateString()}
                    </td>
                    <td
                      className={`nunito ${
                        result.status === "marked"
                          ? "text-success"
                          : "text-danger"
                      }`}
                    >
                      {result.status === "marked" ? "Marked" : "Pending"}
                    </td>
                    <td className="text-white light-font nunito">
                      {result.score}
                    </td>
                    <td className="text-white light-font nunito">
                      <Link
                        to={`/exams/${props.match.params.examId}/${result._id}`}
                      >
                        <FontAwesomeIcon icon={faAngleRight} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {exam.results && exam.results.length === 0 && (
              <div className="exams-empty rounded d-flex justify-content-center align-items-center text-white nunito flex-column">
                <span>No results has been submitted for this Exam.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
