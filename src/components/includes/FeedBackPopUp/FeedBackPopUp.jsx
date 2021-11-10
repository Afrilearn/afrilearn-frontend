import React, { useState } from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../../redux/actions/authActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

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

  const handleSubmit = () => {
    const data = {
      rating,
      acheived,
      mostLoved,
      advise,
      preference: preferences[preference]?.text,
    };
    const feedBackText = `
    <ol>
    <li>How likely are you to recommend Afrilearn to someone you know?&nbsp;<strong>${rating}</strong></li>
    <li>
    <p>What were you looking to achieve by using Afrilearn? Were you able to achieve it?</p>
    <p><strong>${acheived}</strong></p>
    </li>
    <li>
    <p>What do you love most about Afrilearn?</p>
    <p><strong>${mostLoved}</strong></p>
    </li>
    <li>
    <div>&nbsp;What's one thing you wish we could do, or do better?</div>
    <div>&nbsp;</div>
    <div>
    <div><strong>${advise}</strong></div>
    <div>
    <div>&nbsp;</div>
    </div>
    </div>
    </li>
    </ol>
    `;
    localStorage.setItem("afriLearn:lastFeedBack", new Date());
    dispatch(updateProfile({ feedBack: feedBackText }));
    toggleModal();
    // console.log("feedBackText", feedBackText);
  };
  if (!visible) return null;
  return (
    <div className="feedback-pop nunito">
      <div className="feedback-pop-content ">
        <FontAwesomeIcon
          icon={faTimes}
          size="lg"
          className="feedback-pop-content-close cursor"
          onClick={() => {
            localStorage.setItem("afriLearn:lastFeedBack", new Date());
            toggleModal();
          }}
        />
        <h4 className="bold nunito text-center">
          We'd 💖 your feedback to give you the best learning experience
          possible!
        </h4>
        <div className="feedback-progress-bar my-5">
          <div
            className="feedback-progress"
            style={{ flexBasis: `${(page * 100) / 5}%` }}
          ></div>
          <span style={{ left: `${Math.floor((page * 100) / 5)}%` }}>
            {Math.floor((page * 100) / 5)}%
          </span>
        </div>
        <div className="feedback-message-box">
          {page === 2 && (
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
                  rows="6"
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
                  What do you love most about Afrilearn?
                </label>
                <textarea
                  onChange={(e) => setMostLoved(e.target.value)}
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="6"
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
                  What’s one thing you wish we could do, or do better?
                </label>
                <textarea
                  onChange={(e) => setAdvise(e.target.value)}
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="6"
                ></textarea>
              </div>{" "}
            </div>
          )}

          {page === 1 && (
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
          {page === 5 && (
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

        {page !== 5 && (
          <div className="feedback-message-nav d-flex mt-3 mt-md-5 justify-content-between align-items-center">
            <div
              className="underline text-secondary mr-auto cursor"
              onClick={() => {
                localStorage.setItem("afriLearn:lastFeedBack", new Date());
                toggleModal();
              }}
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
              disabled={page === 5}
              // onClick={() => setPage((currentValue) => currentValue + 1)}
              onClick={() => {
                if (page === 2 && !acheived) {
                  showWarning(
                    "Please tell us, What were you looking to achieve by using Afrilearn? Were you able to achieve it?"
                  );
                } else if (page === 3 && !mostLoved) {
                  showWarning(
                    "Please tell us, What do you love most about Afrilearn?"
                  );
                } else if (page === 4 && !advise) {
                  showWarning(
                    "Please tell us, What’s one thing you wish we could do, or do better?"
                  );
                } else if (page === 1 && !rating) {
                  showWarning(
                    "Please tell us, How likely are you to recommend Afrilearn to someone you know?"
                  );
                } else {
                  setPage((currentValue) => currentValue + 1);
                }
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
