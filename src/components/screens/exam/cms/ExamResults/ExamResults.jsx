import { faAngleRight, faFileCsv } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import secondsToHms from "../../../../../assets/js/secondsToHms";
import { getExam } from "../../../../../redux/actions/examActions";
import "./style.css";
import Workbook from "react-excel-workbook";

export default function ExamResults(props) {
  const { examId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getExam(examId));
  }, []);
  const exam = useSelector((state) => state.exam.exam);
  const excelData1 = exam.results?.map((item) => {
    let totalTheoryScore = 0;
    let totalObjectiveScore = 0;
    let totalScore = 0;
    for (let index = 0; index < item.results.length; index++) {
      const resultItem = item.results[index];
      totalScore += resultItem.markWeight;
      if (
        resultItem.questionId.type === "Objective" &&
        resultItem.correctOption === resultItem.optionSelected
      ) {
        totalObjectiveScore += resultItem.markWeight;
      }
      if (resultItem.questionId.type === "Theory") {
        totalTheoryScore += resultItem.assignedScore || 0;
      }
    }
    return {
      submitted: new Date(item.createdAt).toString(),
      name: item.userId && item.userId.fullName,
      status: item.status,
      score: totalTheoryScore + totalObjectiveScore,
    };
  });

  const ResultItem = ({ result }) => {
    let totalTheoryScore = 0;
    let totalObjectiveScore = 0;
    let totalScore = 0;
    if (result && result.results) {
      for (let index = 0; index < result.results.length; index++) {
        const resultItem = result.results[index];
        totalScore += resultItem.markWeight;
        if (
          resultItem.questionId.type === "Objective" &&
          resultItem.correctOption === resultItem.optionSelected
        ) {
          totalObjectiveScore += resultItem.markWeight;
        }
        if (resultItem.questionId.type === "Theory") {
          totalTheoryScore += resultItem.assignedScore || 0;
        }
      }
    }
    return (
      <tr>
        <th scope="row" className="text-white light-font nunito sentence">
          {result?.userId.fullName}
        </th>
        <td className="text-white light-font nunito">
          {new Date(result.createdAt).toDateString()}
        </td>
        <td
          className={`nunito ${
            result.status === "marked" ? "text-success" : "text-danger"
          }`}
        >
          {result.status === "marked" ? "Marked" : "Pending"}
        </td>
        <td className="text-white light-font nunito">
          {totalTheoryScore + totalObjectiveScore}
        </td>
        <td className="text-white light-font nunito">
          <Link to={`/exams/${props.match.params.examId}/${result._id}`}>
            <FontAwesomeIcon icon={faAngleRight} />
          </Link>
        </td>
      </tr>
    );
  };

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
                Duration: {secondsToHms(exam.duration * 60)}
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
            <div className="d-flex">
              <p className="text-white bold nunito ">Submissions</p>

              <Workbook
                filename="Submissions.xlsx"
                element={
                  <FontAwesomeIcon
                    icon={faFileCsv}
                    color="grey"
                    size="lg"
                    className="mx-2 cursor"
                    title="Download as CSV"
                  />
                }
              >
                <Workbook.Sheet data={excelData1} name="Submissions">
                  <Workbook.Column label="Name" value="name" />
                  <Workbook.Column label="Submitted on" value="submitted" />
                  <Workbook.Column label="Status" value="status" />
                  <Workbook.Column label="Score" value="score" />
                </Workbook.Sheet>
              </Workbook>
            </div>
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
                  <ResultItem result={result} />
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
