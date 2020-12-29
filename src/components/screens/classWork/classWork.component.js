import React from "react";
import "./css/style.css";
import dots from "../../../assets/img/dots.png";
import event from "../../../assets/img/event.png";
import sendicon from "../../../assets/img/sendicon.png";
import woman from "../../../assets/img/woman.png";

const ClassWork = (props) => {
  return (
    <div>
      <div id="classroomWorkSectionOne"></div>
      <div id="classroomWorkSectionTwo">
        <main>
          <img src={dots} className="more" alt="see more" />
          <div className="question">
            <img src={event} alt="event" />
            <div>
              <p>Hello Everyone!</p>
              <p>
                Here is the link to Simplified Algebraic Expression
                <span>http://simpliyurJ1</span>
                Watch video lessons and read class note on this topic Discussion
                on this topic will be on 07 Sept,2020
                <br />
                <br />
                Cheers!
              </p>
              <p className="small-grey">Mr Abraham O.(Teacher) 04 Sept 2020</p>
              <p>Due 06 Sept 2020</p>
            </div>
          </div>
          <div className="class-comment">
            <h6>Class comments</h6>
            <div className="comment-input">
              <img className="user-image" src={woman} alt="user" />
              <div>
                <input placeholder="Add class comment" />
                <img src={sendicon} alt="send" />
              </div>
            </div>
          </div>
        </main>
        <aside>
          <div className="class-comment">
            <h6>Private Comments</h6>
            <div className="comment-input">
              <img className="user-image" src={woman} alt="user" />
              <div>
                <input placeholder="Add private comment" />
                <img src={sendicon} alt="send" />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ClassWork;
