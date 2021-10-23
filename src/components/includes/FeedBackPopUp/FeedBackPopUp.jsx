import React, { useState } from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../../redux/actions/authActions";

export default function FeedBackPopUp({ visible = false, toggleModal }) {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const preferences = [
    { label: "A", text: "Dark Mode (Black background)" },
    { label: "B", text: "Light (White background)" },
  ];
  const [preference, setPreference] = useState(null);
  const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [rating, setRating] = useState(null);
  const [acheived, setAcheived] = useState("");
  const [mostLoved, setMostLoved] = useState("");
  const [advise, setAdvise] = useState("");
  const handleSubmit = () => {
    const data = {
      rating,
      acheived,
      mostLoved,
      advise,
      preference: preferences[preference]?.text,
    };
    const feedBackText = `1. What were you looking to achieve by using Afrilearn? Were you
able to achieve it?: ${acheived}\n
2. What do you love most about Afrilearn?: ${mostLoved}\n
3. What’s one thing you wish we could do, or do better?:${advise}\n
4. What’s your interface preference for your preferred experience
on Afrilearn?: ${preferences[preference]?.text}\n
5. How likely are you to recommend Afrilearn to someone 
you know?: ${rating}`;
    localStorage.setItem("afriLearn:lastFeedBack", new Date());
    dispatch(updateProfile({ feedBack: feedBackText, rating }));
    toggleModal();
  };
  if (!visible) return null;
  return (
    <div className="feedback-pop nunito">
      <div className="feedback-pop-content ">
        <h4 className="bold nunito text-center">
          We'd 💖 your feedback to give you the best learning experience
          possible!
        </h4>
        <div className="feedback-progress-bar my-5">
          <div
            className="feedback-progress"
            style={{ flexBasis: `${(page * 100) / 6}%` }}
          ></div>
          <span style={{ left: `${Math.floor((page * 100) / 6)}%` }}>
            {Math.floor((page * 100) / 6)}%
          </span>
        </div>
        <div className="feedback-message-box">
          {page === 1 && (
            <div>
              <div class="mb-3">
                <label
                  for="exampleFormControlTextarea1"
                  placeholder="Type your answer here"
                  class="form-label nunito bold"
                >
                  What were you looking to achieve by using Afrilearn? Were you
                  able to achieve it?
                </label>
                <textarea
                  onChange={(e) => setAcheived(e.target.value)}
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="8"
                ></textarea>
              </div>{" "}
            </div>
          )}
          {page === 2 && (
            <div>
              <div class="mb-3">
                <label
                  for="exampleFormControlTextarea1"
                  placeholder="Type your answer here"
                  class="form-label nunito bold"
                >
                  What do you love most about Afrilearn?
                </label>
                <textarea
                  onChange={(e) => setMostLoved(e.target.value)}
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="8"
                ></textarea>
              </div>{" "}
            </div>
          )}
          {page === 3 && (
            <div>
              <div class="mb-3">
                <label
                  for="exampleFormControlTextarea1"
                  placeholder="Type your answer here"
                  class="form-label nunito bold"
                >
                  What’s one thing you wish we could do, or do better?
                </label>
                <textarea
                  onChange={(e) => setAdvise(e.target.value)}
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="8"
                ></textarea>
              </div>{" "}
            </div>
          )}
          {page === 4 && (
            <div>
              <div class="mb-3">
                <label
                  for="exampleFormControlTextarea1"
                  placeholder="Type your answer here"
                  class="form-label nunito bold"
                >
                  What’s your interface preference for your preferred experience
                  on Afrilearn?
                </label>
                {preferences.map((i, index) => (
                  <button
                    className={`preference-button ${
                      preference === index && "prefered-button"
                    }`}
                    onClick={() => setPreference(index)}
                  >
                    <div className="preference-button-label">{i.label}</div>
                    <span className="nunito bold">{i.text}</span>
                  </button>
                ))}
              </div>{" "}
            </div>
          )}
          {page === 5 && (
            <div>
              <div class="mb-3">
                <label
                  for="exampleFormControlTextarea1"
                  placeholder="Type your answer here"
                  class="form-label nunito bold"
                >
                  How likely are you to recommend Afrilearn to someone you know?
                </label>
                <div className="d-flex rating-container">
                  {ratings.map((i, index) => (
                    <div
                      key={index}
                      onClick={() => setRating(i)}
                      className={`rating-select ${
                        rating === i && "rating-selected"
                      }`}
                    >
                      {i}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {page === 6 && (
            <div>
              <div class="d-flex justify-content-center align-items-center h-100 w-100 flex-column">
                <h1 className="bold baloo text-center mt-0 mt-md-5">
                  We’re done!
                </h1>
                <h1 className="bold baloo text-center mb-2 mb-md-5">
                  Thank you for sharing your feedback
                </h1>
                <button
                  className="btn btn-lg bg-secondary text-white"
                  onClick={handleSubmit}
                >
                  CLOSE
                </button>
              </div>{" "}
            </div>
          )}
        </div>

        {page !== 6 && (
          <div className="feedback-message-nav d-flex mt-3 mt-md-5 justify-content-between align-items-center">
            <div
              className="underline text-secondary mr-auto"
              onClick={() => setPage((currentValue) => 6)}
            >
              Skip
            </div>
            <button
              className="btn green-bg mx-2 text-white px-4"
              disabled={page === 1}
              onClick={() => setPage((currentValue) => currentValue - 1)}
            >
              Previous
            </button>
            <button
              className="btn green-bg mx-2 text-white px-4"
              disabled={page === 6}
              onClick={() => setPage((currentValue) => currentValue + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}