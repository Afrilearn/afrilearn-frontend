import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getResult } from "../../../../redux/actions/examActions";
import "./style.css";

export default function ExamResult() {
  const { resultId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getResult(resultId));
  }, []);
  const result = useSelector((state) => state.exam.result);
  const AnswerItem = ({ lenght, index, item }) => {
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
            <input
              type="text"
              className="input px-3 text-white "
              placeholder={`${
                item.correctOption === item.optionSelected
                  ? item.mark_weight
                  : 0
              }`}
            />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-12 col-md-5">
            <p className="nunito text-white bold">
              {item?.questionId?.question}
            </p>
            <p className="nunito text-white mt-5">Answer:</p>
            <div className="answer-box">
              <p className="text-white nunito light-font text-justify">
                {item?.questionId?.options[item?.optionSelected]}
              </p>
            </div>
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
                Objective Score: {result.total}
              </p>
            </div>
            <div>
              <button className="text-white green-bg btn nunito">
                ADD UP SCORES
              </button>
            </div>
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
