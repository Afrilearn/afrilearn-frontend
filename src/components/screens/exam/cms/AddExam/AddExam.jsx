import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addExam,
  getExamTypes,
  getTerms,
  inputChange,
} from "../../../../../redux/actions/examActions";
import "./style.css";
import queryString from "query-string";
import {
  getClassBasicDetails,
  getClassSubjects,
} from "../../../../../redux/actions/classActions";
import { Redirect } from "react-router-dom";
import { useState } from "react";

export default function AddExam(props) {
  const dispatch = useDispatch();
  const parsed = queryString.parse(props.location.search);
  useEffect(() => {
    dispatch(getExamTypes());
    dispatch(inputChange("addExamStatus", "pending"));
    dispatch(getTerms());
    dispatch(getClassBasicDetails(parsed.classId));
    dispatch(getClassSubjects(parsed.classId));
  }, []);
  const addExamStatus = useSelector((state) => state.exam.addExamStatus);
  const exam = useSelector((state) => state.exam.exam);
  const terms = useSelector((state) => state.exam.terms);
  const clazz = useSelector((state) => state.class.class);
  const classRelatedSubjects = useSelector(
    (state) => state.class.classRelatedSubjects
  );
  const examTypes = useSelector((state) => state.exam.examTypes);

  const [title, setTitle] = useState("");
  const [questionTypeId, setQuestionTypeId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [termId, setTermId] = useState("");
  const [duration, setDuration] = useState(0);
  const [instruction, setInstruction] = useState("");
  const [totalNumberOfQuestions, setTotalNumberOfQuestions] = useState(0);
  const [deadline, setDeadline] = useState("");
  const [startDate, setStartDate] = useState("");

  let subjectsToDisplay = classRelatedSubjects;
  if (clazz?.subjectIds && clazz.subjectIds.length > 0) {
    subjectsToDisplay = classRelatedSubjects.filter((subject) =>
      clazz.subjectIds.find((i) => i.subjectId == subject._id)
    );
  }
  if (addExamStatus === "success" && exam._id)
    return <Redirect to={`/add-exam/${exam._id}`} />;
  return (
    <div id="add-exam">
      <div className="container-fluid row g-md-2 pt-2 pt-md-5">
        <div className="col-12 col-md-3">
          <div className="exam-progress-box p-3 mb-2 p-md-4">
            <h3 className="bold text-white nunito mb-5">Set Up Examination</h3>
            <div className="exam-progress-items">
              <small></small>
              <div className="exam-progress-item-after exam-progress-item  text-white d-flex align-items-center">
                <div className="exam-progress-item-indicator exam-progress-item-visited"></div>
                <span>Set Ups</span>
              </div>
              <div className="exam-progress-item  text-white d-flex align-items-center">
                <div className="exam-progress-item-indicator"></div>
                <span>Examination Questions</span>
              </div>
            </div>
          </div>
        </div>
        <form
          className="col-12 col-md-6 mb-2"
          onSubmit={(e) => {
            e.preventDefault();
            const data = {
              title,
              questionTypeId,
              subjectId,
              termId,
              duration: Number(duration),
              instruction,
              totalNumberOfQuestions,
              deadline,
              startDate,
              classId: parsed.classId,
            };
            dispatch(addExam(data));
          }}
        >
          <label htmlFor="title" className="text-light mb-1">
            Exam Title
          </label>
          <input
            type="text"
            placeholder="Title"
            id="title"
            className="general mb-4 mt-0 border"
            name="email"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="questionType" className="text-light mb-1">
            Question Type
          </label>
          <select
            className="general mb-4 mt-0 border"
            name="subjectId"
            id="questionType"
            required
            onChange={(e) => setQuestionTypeId(e.target.value)}
          >
            <option unselectable>Select Question Type</option>
            {examTypes
              .sort((a, b) => a.position.localeCompare(b.position))
              .map((i, index) => (
                <option key={index} value={i._id}>
                  {i.name}
                </option>
              ))}
          </select>

          <label htmlFor="questionType" className="text-light mb-1">
            Select Subject
          </label>
          <select
            className="general mb-4 mt-0 border"
            name="subjectId"
            id="questionType"
            required
            onChange={(e) => setSubjectId(e.target.value)}
          >
            <option unselectable>Select Subject</option>
            {subjectsToDisplay.map((i, index) => (
              <option key={index} value={i._id}>
                {i?.mainSubjectId?.name}
              </option>
            ))}
          </select>

          <label htmlFor="questionType" className="text-light mb-1">
            Term
          </label>
          <select
            className="general mb-4 mt-0 border"
            name="subjectId"
            id="questionType"
            required
            onChange={(e) => setTermId(e.target.value)}
          >
            <option unselectable>Select Term</option>
            {terms.map((i, index) => (
              <option key={index} value={i._id}>
                {i.name}
              </option>
            ))}
          </select>

          <label htmlFor="duration" className="text-light mb-1">
            Set Duration
          </label>
          <input
            type="number"
            placeholder="Duration in minutes"
            id="duration"
            className="general mb-4 mt-0 border"
            name="email"
            required
            onChange={(e) => setDuration(e.target.value)}
          />

          <label htmlFor="startDate" className="text-light mb-1">
            Set Start Date
          </label>

          <input
            type="datetime-local"
            id="startDate"
            name="startDate"
            required
            className="general mb-4 mt-0 border white-placeholder"
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label htmlFor="duration" className="text-light mb-1">
            Set Deadline
          </label>

          <input
            type="datetime-local"
            id="deadline"
            name="deadline"
            required
            className="general mb-4 mt-0 border white-placeholder"
            onChange={(e) => setDeadline(e.target.value)}
          />

          <label htmlFor="instruction" className="text-light mb-1">
            Exam Instruction (optional)
          </label>
          <textarea
            // cols={35}
            rows="10"
            type="number"
            placeholder="instruction"
            id="instruction"
            className="general mb-4 mt-0 border"
            name="email"
            onChange={(e) => setInstruction(e.target.value)}
          />
          <div className="d-flex justify-content-end">
            {/* <Link to="/add-exam/8687z37yxn7ry9x83y98"> */}
            <button className="btn btn-lg bg-white text-black" type="submit">
              PROCEED
            </button>
            {/* </Link> */}
          </div>
        </form>
        <div className="col-12 col-md-3"></div>
      </div>
    </div>
  );
}
