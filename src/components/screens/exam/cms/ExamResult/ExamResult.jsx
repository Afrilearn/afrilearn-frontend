import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getResult,
  updateExamResultScore,
} from "../../../../../redux/actions/examActions";
import "./style.css";
import parse from "html-react-parser";

export default function ExamResult() {
  const { resultId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getResult(resultId));
  }, []);
  const optionLabels = ["A", "B", "C", "D"];
  const result = useSelector((state) => state.exam.result);
  console.log("result.results", result.results);
  let totalTheoryScore = 0;
  let totalObjectiveScore = 0;
  if (result && result.results) {
    for (let index = 0; index < result.results.length; index++) {
      const resultItem = result.results[index];
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

  const AnswerItem = ({ lenght, index, item }) => {
    console.log("item", item);
    const [score, setScore] = useState(null);
    const type = item.questionId.type;
    let assignedScore = 0;
    if (type === "Objective" && item.correctOption === item.optionSelected) {
      assignedScore = item.markWeight;
    }
    if (type === "Theory") {
      assignedScore = item.assignedScore;
    }
    return (
      <div className="answer-item py-2 py-md-5">
        <div className="row mb-4">
          <div className="col-12 col-md-5">
            <div className="text-white nunito light-font">&nbsp;</div>
            <div className="long-badge">
              <span className="nunito">
                Question {index} of {lenght}
              </span>
            </div>
          </div>
          <div className="col-12 col-md-2"></div>
          <div className="col-12 col-md-5 my-2 my-md-0">
            <div className="text-white nunito light-font">
              Assign mark(score)
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log(result._id, item._id, score);
                dispatch(updateExamResultScore(result._id, item._id, score));
              }}
            >
              <input
                readOnly={type === "Objective"}
                type="text"
                className="input px-3 text-white "
                placeholder="Assign Score"
                defaultValue={assignedScore}
                onChange={(e) => setScore(e.target.value)}
                required
              />

              {type === "Theory" && (
                <div>
                  {item.graded ? (
                    <small className="text-success">
                      You assigned this result a score of {assignedScore}{" "}
                    </small>
                  ) : (
                    <small className="text-danger">
                      You have not assigned any score to this result{" "}
                    </small>
                  )}
                </div>
              )}
              {type === "Theory" && (
                <input
                  type="submit"
                  value={item.graded ? "Update Score" : "Add Score"}
                  className="text-white green-bg btn nunito my-3"
                />
              )}
            </form>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-12 col-md-5">
            <p className="nunito text-white bold">
              {item?.questionId?.question && parse(item?.questionId?.question)}
            </p>
            <p className="nunito text-white mt-5">Answer:</p>
            {type === "Objective" && (
              <div className="answer-box">
                <p className="text-white nunito light-font text-justify ">
                  <strong>
                    Correct Option : <br />
                  </strong>
                  {optionLabels[[item?.correctOption]]}.{" "}
                  {item?.questionId?.options[item?.correctOption] &&
                    parse(item?.questionId?.options[item?.correctOption])}
                </p>
                <p
                  className={`text-white nunito light-font text-justify ${
                    item?.correctOption === item?.optionSelected
                      ? "text-success"
                      : "text-danger"
                  }`}
                >
                  <strong>
                    Selected Option : <br />
                  </strong>
                  {optionLabels[[item?.optionSelected]]}.{" "}
                  {item?.questionId?.options[item?.optionSelected] &&
                    parse(item?.questionId?.options[item?.optionSelected])}
                </p>
                {/* <p className="text-white nunito light-font text-justify">
                  {item?.questionId?.options[item?.optionSelected] &&
                    parse(item?.questionId?.options[item?.optionSelected])}
                </p> */}
              </div>
            )}
            {type === "Theory" && (
              <div className="answer-box">
                <p className="text-white nunito light-font text-justify">
                  {item?.answer && parse(item?.answer)}
                </p>
              </div>
            )}
          </div>
        </div>
        <hr />
      </div>
    );
  };

  return (
    <div id="examResult">
      <div id="examResultSectionOne">
        <div className="bold text-white nunito">EXAMS</div>
      </div>
      <div id="examResultSectionTwo">
        <div className="container-fluid px-2 px-md-5 py-2 py-md-3">
          <div className="d-flex justify-content-between align-items-end">
            <div>
              <h4 className="text-white bold-nunito">
                Name: {result?.userId?.fullName}
              </h4>
              <p className="text-white nunito light-font">
                Submitted: {new Date(result.createdAt).toDateString()}
              </p>
              <p className="text-white mt-3 nunito light-font">
                Theory Score: {totalTheoryScore}
              </p>
              <p className="text-white mt-3 nunito light-font">
                Objective Score: {totalObjectiveScore}
              </p>
              <p className="text-white mt-3 nunito light-font">
                Total Score: {totalObjectiveScore + totalTheoryScore}
              </p>
            </div>
            {/* <div>
              <button className="text-white green-bg btn nunito">
                ADD UP SCORES
              </button>
            </div> */}
          </div>
        </div>
        <hr />
        <div className="container-fluid px-2 px-md-5 ">
          <div className="d-flex justify-content-between">
            <p className="text-white nunito bold">Theory</p>
          </div>
          {result?.results?.map((item, index) => (
            <AnswerItem
              index={index + 1}
              key={index}
              lenght={result?.results.length}
              item={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
