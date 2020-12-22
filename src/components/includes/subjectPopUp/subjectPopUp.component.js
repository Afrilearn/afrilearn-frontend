import {
  faAngleUp,
  faMicrophone,
  faPlay,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import technology from "../../../assets/img/technology.png";

import "./css/style.css";
import LessonItem from "../lessonItem/lessonItem.component";
const SubjectPopUp = (props) => {
  const { onToggle, show, terms } = props;

  const seeMore = (event) => {
    event.preventDefault();
    const seeLess = document.querySelector("#subjectPopUp .seeLess");
    const termPage = document.querySelector("#subjectPopUp .terms");
    const terms = document.querySelectorAll(".term");
    const seeMoreButtons = document.querySelectorAll(".term_item_see_more");
    seeLess.style.display = "flex";
    termPage.style.borderBottom = "1px solid #fff";
    for (let index = 0; index < terms.length; index++) {
      const term = terms[index];
      term.style.display = "block";
    }
    for (let index = 0; index < seeMoreButtons.length; index++) {
      const seeMoreButton = seeMoreButtons[index];
      seeMoreButton.style.display = "none";
    }
  };
  const seeLess = (event) => {
    event.preventDefault();
    const seeLess = document.querySelector(".seeLess");
    const termsCount = document.querySelectorAll(".term");
    const seeMoreButtons = document.querySelectorAll(".term_item_see_more");
    const termPage = document.querySelector("#subjectPopUp .terms");
    seeLess.style.display = "none";
    termPage.style.borderBottom = "none";
    for (let index = 1; index < termsCount.length; index++) {
      const term = termsCount[index];
      term.style.display = "none";
    }
    for (
      let index = terms[0].classes.length - 1;
      index < seeMoreButtons.length;
      index++
    ) {
      const seeMoreButton = seeMoreButtons[index];
      seeMoreButton.style.display = "flex";
    }
  };
  return ( 
    <div>
      <Modal isOpen={show} className="subjectPopClass">
        <ModalHeader toggle={onToggle}>Modal title</ModalHeader>
        <ModalBody>
          <div id="subjectPopUp">
            <div
              className="video"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)),url(${technology})`,
              }}
            >
              <div className="video_bottom_left">
                <div className="video_play_button">
                  <FontAwesomeIcon
                    icon={faPlay}
                    style={{ marginRight: "5px" }}
                  />
                  Play
                </div>
                <FontAwesomeIcon icon={faMicrophone} className="microphone" />
              </div>
              <h1 className="video_middle_right">
                Basic <br /> Technology
              </h1>
              <FontAwesomeIcon
                icon={faVolumeUp}
                className="video_bottom_right"
              />
            </div>
            <div className="subject_details">
              <div className="subject_details_right">
                <div className="subject_details_right_head">
                  <h4>Basic Technology</h4>
                  <span>03</span>
                  <p>Terms</p>
                </div>
                <p>
                  Basic Technology is a very important subject in todays
                  curriculum for students especially at the junior secondary
                  level as knowledge impacted prepares them for the various
                  experiences at the senior level not withstanding their carrier
                  paths.
                </p>
              </div>
              <div className="subject_details_left">
                <p>
                  <span className="subject_details_left_key">Class:</span>{" "}
                  Junior Sceondary School One{" "}
                </p>
                <p>
                  <span className="subject_details_left_key">Lessons:</span> 116
                  Video Lessons{" "}
                </p>
                <p>
                  <span className="subject_details_left_key">Students:</span>{" "}
                  13,000 Registered Students{" "}
                </p>
              </div>
            </div>
            <div className="terms">
              {terms.map((term) => (
                <div key={term._id} className="term">
                  <h4 className="term_head">{term.name}</h4>
                  <div className="term_list">
                    {term.classes.map((clazz) => (
                      <div key={clazz._id} className="lesson-list">
                        <LessonItem clazz={clazz} seeMore={seeMore} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <span className="seeLess">
                <FontAwesomeIcon onClick={seeLess} icon={faAngleUp} />
              </span>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default SubjectPopUp;
