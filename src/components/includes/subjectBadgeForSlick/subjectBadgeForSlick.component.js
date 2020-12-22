import {
  faAngleDown,
  faBookReader,
  faPlay,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ModalExample from "../subjectPopUp/subjectPopUp.component";
import "./css/style.css";

const SubjectBadgeForSlick = (props) => {
  const { item, terms } = props;
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);
  return (
    <div id="subjectBadgeForSlick">
      <div className="item" key={item._id}>
        <div className="itemImage">
          <img src={item.image} alt="class"></img>
        </div>
        <div className="itemPop" id={item._id}>
          <div className="image">
            <img src={item.image} alt="class"></img>
          </div>
          <div className="details">
            <div className="icons">
              <div className="icon">
                <FontAwesomeIcon icon={faPlay} />
              </div>
              <div className="icon">
                <div className="icon_popup">1300 Compiled Notes</div>
                <FontAwesomeIcon icon={faBookReader} />
              </div>
              <div className="icon">
                <div className="icon_popup">13,000 Registered Students</div>
                <FontAwesomeIcon icon={faUserAlt} />
              </div>
              <div className="icon last_icon" onClick={toggle}>
                <div className="icon_popup">More Info</div>
                <FontAwesomeIcon icon={faAngleDown} />
              </div>
            </div>
            <p className="para">116 Video Lessons</p>
            <div className="terms">
              <span>03</span> Terms
            </div>
          </div>
        </div>
      </div>
      <ModalExample onToggle={() => toggle()} show={show} terms={terms} />
    </div>
  );
};

export default SubjectBadgeForSlick;
