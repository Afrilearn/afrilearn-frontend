import React from "react";
import "./style.css";

export default function AddExam() {
  return (
    <div id="add-exam">
      <div className="container-fluid row g-2 pt-2 pt-md-5">
        <div className="col-12 col-md-3">
          <div className="exam-progress-box p-2  p-md-4">
            <h3 className="bold text-white nunito mb-5">Set Up Examination</h3>
            <div className="exam-progress-item text-white">Set Ups</div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <label htmlFor="title" className="text-light">
            Exam Title
          </label>
          <input
            type="text"
            placeholder="Title"
            id="title"
            className="general border"
            name="email"
          />
          <label htmlFor="questionType" className="text-light mt-2">
            Question Type
          </label>
          <select className="general border" name="subjectId" id="questionType">
            <option>Select Subject</option>
          </select>
          <label htmlFor="duration" className="text-light mt-2">
            Set Duration
          </label>
          <input
            type="number"
            placeholder="duration"
            id="duration"
            className="general border"
            name="email"
          />
          <label htmlFor="instruction" className="text-light mt-2">
            Exam Instruction (optional)
          </label>
          <textarea
            cols={15}
            type="number"
            placeholder="instruction"
            id="instruction"
            className="general border"
            name="email"
          />
          <div className="d-flex justify-content-end">
            <button className="btn btn-lg bg-white text-black">PROCEED</button>
          </div>
        </div>
        <div className="col-12 col-md-3"></div>
      </div>
    </div>
  );
}
