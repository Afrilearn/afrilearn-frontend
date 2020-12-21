import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faBookReader,
  faMicrophone,
  faUser,
  faUserAlt,
  faAngleDown,
  faTimes,
  faVolumeUp,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";

import "./css/style.css";
import pencil from "../../../assets/img/pencil.png";
import technology from "../../../assets/img/technology.png";
import classnote from "../../../assets/img/classnote.png";
import maths from "../../../assets/img/maths.png";
import english from "../../../assets/img/english.png";
import health from "../../../assets/img/health.png";
import science from "../../../assets/img/science.png";
import Civic from "../../../assets/img/Civic.png";
import social from "../../../assets/img/social.png";
import health_two from "../../../assets/img/health_two.png";
import english_two from "../../../assets/img/english_two.png";
import firstterm from "../../../assets/img/firstterm.png";
class ClassPage extends Component {
  state = {
    data: [
      { _id: 1, image: pencil },
      { _id: 2, image: technology },
      { _id: 3, image: classnote },
      { _id: 4, image: maths },
      { _id: 5, image: english },
      { _id: 6, image: health },
      { _id: 7, image: science },
      { _id: 8, image: Civic },
      { _id: 9, image: social },
      { _id: 10, image: health_two },
      { _id: 11, image: english_two },
      { _id: 12, image: firstterm },
      { _id: 13, image: firstterm },
      { _id: 14, image: firstterm },
    ],
    terms: [
      {
        _id: 1,
        name: "First Term",
        classes: [{ _id: 1 }, { _id: 2 }],
      },
      {
        _id: 2,
        name: "Second Term",
        classes: [{ _id: 1 }, { _id: 2 }, { _id: 3 }],
      },
      {
        _id: 3,
        name: "Third Term",
        classes: [{ _id: 1 }, { _id: 2 }, { _id: 3 }],
      },
    ],
  };
  hidePopUp = () => {
    const popUp = document.getElementById("class_pop_up");
    popUp.style.display = "none";
  };
  popClassUp = (classId) => {
    this.setState({
      popUp: classId,
    });
    const popUp = document.getElementById("class_pop_up");
    popUp.style.display = "block";
    // setTimeout(() => {
    //   console.log(this.state.popUp);
    // }, 200);
  };
  popUp = (id) => {
    const ipop = document.getElementById(id);
    ipop.style.display = "block";
  };
  removePopUp = (id) => {
    const ipop = document.getElementById(id);
    ipop.style.display = "none";
  };
  seeMore = (event) => {
    event.preventDefault();
    const popUp = document.getElementById("class_pop_up");
    const seeLess = document.querySelector(".seeLess");
    const termPage = document.querySelector(
      ".classes_page_class_pop_up_page_terms"
    );
    const terms = document.querySelectorAll(
      ".classes_page_class_pop_up_page_term"
    );
    const seeMoreButtons = document.querySelectorAll(
      ".classes_page_class_pop_up_page_term_item_see_more"
    );
    popUp.style.display = "block";
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
  seeLess = (event) => {
    event.preventDefault();
    const popUp = document.getElementById("class_pop_up");
    const seeLess = document.querySelector(".seeLess");
    const terms = document.querySelectorAll(
      ".classes_page_class_pop_up_page_term"
    );
    const seeMoreButtons = document.querySelectorAll(
      ".classes_page_class_pop_up_page_term_item_see_more"
    );
    const termPage = document.querySelector(
      ".classes_page_class_pop_up_page_terms"
    );
    popUp.style.display = "block";
    seeLess.style.display = "none";
    termPage.style.borderBottom = "none";
    for (let index = 1; index < terms.length; index++) {
      const term = terms[index];
      term.style.display = "none";
    }
    for (
      let index = this.state.terms[0].classes.length - 1;
      index < seeMoreButtons.length;
      index++
    ) {
      const seeMoreButton = seeMoreButtons[index];
      seeMoreButton.style.display = "flex";
    }
  };
  render() {
    return (
      <div>
        <div
          id="classPageFirstSection"
          style={{
            backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.17), rgba(0, 0, 0, 0.99)),
      url(${pencil})`,
          }}
        >
          <h1>JSS - ONE</h1>
          <div className="list">
            <div className="item">
              <div className="icon">
                <FontAwesomeIcon icon={faPlay} />
              </div>
              <div>116 Video Lessons</div>
            </div>
            <div className="item">
              <div className="icon">
                <FontAwesomeIcon icon={faMicrophone} />
              </div>
              <div>93 Audio Lessons</div>
            </div>
            <div className="item">
              <div className="whiteIcon">
                <FontAwesomeIcon icon={faBookReader} />
              </div>
              <div>14 Subjects</div>
            </div>
            <div className="item">
              <div className="whiteIcon">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div>13,000 Registered Students</div>
            </div>
          </div>
          <div className="subHead">JSS One Subjects</div>
        </div>
        <div id="classPageSecondSection">
          <div className="list">
            {this.state.data.map((item) => (
              <div
                className="item"
                onMouseOver={() => this.popUp(item._id)}
                onMouseLeave={() => this.removePopUp(item._id)}
                key={item._id}
                onClick={this.popClassUp}
              >
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
                        <div className="icon_popup">
                          13,000 Registered Students
                        </div>
                        <FontAwesomeIcon icon={faUserAlt} />
                      </div>
                      <div className="icon last_icon">
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
            ))}
          </div>
        </div>
        <div className="classes_page_class_pop_up" id="class_pop_up">
          <div className="classes_page_class_pop_up_page">
            <FontAwesomeIcon
              onClick={this.hidePopUp}
              className="classes_page_class_pop_up_close"
              icon={faTimes}
            />
            <div
              className="classes_page_class_pop_up_page_video"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)),url(${technology})`,
              }}
            >
              <div className="classes_page_class_pop_up_page_video_bottom_left">
                <div className="classes_page_class_pop_up_page_video_play_button">
                  <FontAwesomeIcon icon={faPlay} className="play" />
                  Play
                </div>
                <FontAwesomeIcon icon={faMicrophone} className="microphone" />
              </div>
              <h1 className="classes_page_class_pop_up_page_video_middle_right">
                Basic <br /> Technology
              </h1>
              <FontAwesomeIcon
                icon={faVolumeUp}
                className="classes_page_class_pop_up_page_video_bottom_right"
              />
            </div>
            <div className="classes_page_class_pop_up_page_subject_details">
              <div className="classes_page_class_pop_up_page_subject_details_right">
                <div className="classes_page_class_pop_up_page_subject_details_right_head">
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
              <div className="classes_page_class_pop_up_page_subject_details_left">
                <p>
                  <span className="classes_page_class_pop_up_page_subject_details_left_key">
                    Class:
                  </span>{" "}
                  Junior Sceondary School One{" "}
                </p>
                <p>
                  <span className="classes_page_class_pop_up_page_subject_details_left_key">
                    Lessons:
                  </span>{" "}
                  116 Video Lessons{" "}
                </p>
                <p>
                  <span className="classes_page_class_pop_up_page_subject_details_left_key">
                    Students:
                  </span>{" "}
                  13,000 Registered Students{" "}
                </p>
              </div>
            </div>
            <div className="classes_page_class_pop_up_page_terms">
              {this.state.terms.map((term) => (
                <div
                  key={term._id}
                  className="classes_page_class_pop_up_page_term"
                  // id="terms"
                >
                  <h4 className="classes_page_class_pop_up_page_term_head">
                    {term.name}
                  </h4>
                  <div className="classes_page_class_pop_up_page_term_list">
                    {term.classes.map((clazz) => (
                      <div
                        key={clazz._id}
                        className="classes_page_class_pop_up_page_term_item"
                      >
                        <div className="classes_page_class_pop_up_page_term_item_right">
                          <img src={firstterm} alt="see this"></img>
                        </div>
                        <div className="classes_page_class_pop_up_page_term_item_left">
                          <h5 className="classes_page_class_pop_up_page_term_item_left_top">
                            Geometrical Construction (1): Lines
                          </h5>
                          <div className="classes_page_class_pop_up_page_term_item_left_bottom">
                            <div className="classes_page_class_pop_up_page_term_item_left_bottom_item">
                              <FontAwesomeIcon
                                onClick={this.hidePopUp}
                                className="play"
                                icon={faPlay}
                              />
                              <button>Lesson 1</button>
                            </div>
                            <div className="classes_page_class_pop_up_page_term_item_left_bottom_item">
                              <FontAwesomeIcon
                                onClick={this.hidePopUp}
                                className="play"
                                icon={faPlay}
                              />
                              <button>Lesson 1</button>
                            </div>
                            <div className="classes_page_class_pop_up_page_term_item_left_bottom_item">
                              <FontAwesomeIcon
                                onClick={this.hidePopUp}
                                className="play"
                                icon={faPlay}
                              />
                              <button>Lesson 1</button>
                            </div>
                            <div className="classes_page_class_pop_up_page_term_item_left_bottom_item">
                              <button>Quiz</button>
                            </div>
                          </div>
                        </div>
                        <span
                          className="classes_page_class_pop_up_page_term_item_see_more"
                          onClick={this.seeMore}
                        >
                          <FontAwesomeIcon
                            onClick={this.hidePopUp}
                            icon={faAngleDown}
                          />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <span className="seeLess">
                <FontAwesomeIcon onClick={this.seeLess} icon={faAngleUp} />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ClassPage;
