import React, { Component } from "react";
import ClassesSlide from "../../includes/classesSlide.component";
import "./css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

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
import {
  faAngleDown,
  faAngleUp,
  faMicrophone,
  faPlay,
  faTimes,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";

export default class Classes extends Component {
  state = {
    popUp: 1,
    terms: [
      {
        _id: 1,
        name: "First Term",
        classes: [{ _id: 1 }, { _id: 2 }, { _id: 3 }],
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
    classes: [
      {
        _id: 1,
        name: "Primary One",
        data: [
          { _id: 2, image: maths },
          { _id: 4, image: health },
          { _id: 1, image: classnote },
          { _id: 3, image: english },
          { _id: 8, image: health_two },
          { _id: 9, image: english_two },
          { _id: 6, image: Civic },
          { _id: 5, image: science },
          { _id: 7, image: social },
        ],
      },
      {
        _id: 2,
        name: "Primary Two",
        data: [
          { _id: 3, image: english },
          { _id: 4, image: health },
          { _id: 6, image: Civic },
          { _id: 7, image: social },
          { _id: 5, image: science },
          { _id: 2, image: maths },
          { _id: 8, image: health_two },
          { _id: 1, image: classnote },
          { _id: 9, image: english_two },
        ],
      },
      {
        _id: 3,
        name: "Primary Three",
        data: [
          { _id: 5, image: science },
          { _id: 6, image: Civic },
          { _id: 7, image: social },
          { _id: 8, image: health_two },
          { _id: 2, image: maths },
          { _id: 4, image: health },
          { _id: 9, image: english_two },
          { _id: 3, image: english },
          { _id: 1, image: classnote },
        ],
      },
      {
        _id: 4,
        name: "Primary Four",
        data: [
          { _id: 1, image: classnote },
          { _id: 2, image: maths },
          { _id: 3, image: english },
          { _id: 4, image: health },
          { _id: 5, image: science },
          { _id: 6, image: Civic },
          { _id: 7, image: social },
          { _id: 8, image: health_two },
          { _id: 9, image: english_two },
        ],
      },
      {
        _id: 5,
        name: "Primary Five",
        data: [
          { _id: 1, image: classnote },
          { _id: 2, image: maths },
          { _id: 3, image: english },
          { _id: 4, image: health },
          { _id: 5, image: science },
          { _id: 6, image: Civic },
          { _id: 7, image: social },
          { _id: 8, image: health_two },
          { _id: 9, image: english_two },
        ],
      },
      {
        _id: 6,
        name: "Primary Six",
        data: [
          { _id: 1, image: classnote },
          { _id: 2, image: maths },
          { _id: 3, image: english },
          { _id: 4, image: health },
          { _id: 5, image: science },
          { _id: 6, image: Civic },
          { _id: 7, image: social },
          { _id: 8, image: health_two },
          { _id: 9, image: english_two },
        ],
      },
      {
        _id: 7,
        name: "JSS One",
        data: [
          { _id: 1, image: classnote },
          { _id: 2, image: maths },
          { _id: 3, image: english },
          { _id: 4, image: health },
          { _id: 5, image: science },
          { _id: 6, image: Civic },
          { _id: 7, image: social },
          { _id: 8, image: health_two },
          { _id: 9, image: english_two },
        ],
      },
      {
        _id: 8,
        name: "JSS Two",
        data: [
          { _id: 1, image: classnote },
          { _id: 2, image: maths },
          { _id: 3, image: english },
          { _id: 4, image: health },
          { _id: 5, image: science },
          { _id: 6, image: Civic },
          { _id: 7, image: social },
          { _id: 8, image: health_two },
          { _id: 9, image: english_two },
        ],
      },
      {
        _id: 9,
        name: "JSS Three",
        data: [
          { _id: 1, image: classnote },
          { _id: 2, image: maths },
          { _id: 3, image: english },
          { _id: 4, image: health },
          { _id: 5, image: science },
          { _id: 6, image: Civic },
          { _id: 7, image: social },
          { _id: 8, image: health_two },
          { _id: 9, image: english_two },
        ],
      },
      {
        _id: 10,
        name: "SSS One",
        data: [
          { _id: 1, image: classnote },
          { _id: 2, image: maths },
          { _id: 3, image: english },
          { _id: 4, image: health },
          { _id: 5, image: science },
          { _id: 6, image: Civic },
          { _id: 7, image: social },
          { _id: 8, image: health_two },
          { _id: 9, image: english_two },
        ],
      },
      {
        _id: 11,
        name: "SSS Two",
        data: [
          { _id: 1, image: classnote },
          { _id: 2, image: maths },
          { _id: 3, image: english },
          { _id: 4, image: health },
          { _id: 5, image: science },
          { _id: 6, image: Civic },
          { _id: 7, image: social },
          { _id: 8, image: health_two },
          { _id: 9, image: english_two },
        ],
      },
      {
        _id: 12,
        name: "SSS Three",
        data: [
          { _id: 1, image: classnote },
          { _id: 2, image: maths },
          { _id: 3, image: english },
          { _id: 4, image: health },
          { _id: 5, image: science },
          { _id: 6, image: Civic },
          { _id: 7, image: social },
          { _id: 8, image: health_two },
          { _id: 9, image: english_two },
        ],
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
    const page = document.getElementById("classes_page");
    const popUp = document.getElementById("class_pop_up");
    page.style.backgroundColor = "black";
    popUp.style.display = "block";
    // setTimeout(() => {
    //   console.log(this.state.popUp);
    // }, 200);
  };
  seeMore = (event) => {
    event.preventDefault();
    const page = document.getElementById("classes_page");
    const popUp = document.getElementById("class_pop_up");
    const seeLess = document.querySelector(".seeLess");
    const terms = document.querySelectorAll(
      ".classes_page_class_pop_up_page_term"
    );
    const seeMoreButtons = document.querySelectorAll(
      ".classes_page_class_pop_up_page_term_item_see_more"
    );
    const termClass = document.querySelector(
      ".classes_page_class_pop_up_page_terms"
    );
    seeLess.style.display = "flex";
    termClass.style.borderBottom = "1px solid #fff";
    page.style.backgroundColor = "black";
    popUp.style.display = "block";
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
    const page = document.getElementById("classes_page");
    const popUp = document.getElementById("class_pop_up");
    const seeLess = document.querySelector(".seeLess");
    const termClass = document.querySelector(
      ".classes_page_class_pop_up_page_terms"
    );
    const terms = document.querySelectorAll(
      ".classes_page_class_pop_up_page_term"
    );
    const seeMoreButtons = document.querySelectorAll(
      ".classes_page_class_pop_up_page_term_item_see_more"
    );
    seeLess.style.display = "none";
    termClass.style.borderBottom = "none";
    page.style.backgroundColor = "black";
    popUp.style.display = "block";
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
      <div className="classes_page" id="classes_page">
        <div className="classes_page_head_section">
          <h1 className="classes_page_head_section_head">Classes</h1>
          <div className="classes_page_head_section_classList">
            {this.state.classes.map((clazz) => (
              <Link
                to="/classes/98y98yx9r"
                key={clazz._id}
                className="classes_page_head_section_classList_item"
              >
                {clazz.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="classes_page_classlist_section">
          {this.state.classes.map((clazz) => (
            <div
              key={clazz._id}
              className="classes_page_classlist_section_class"
            >
              <div className="classes_page_classlist_section_class_head">
                <h4>{clazz.name}</h4>
                <p id="explore_more">Explore more &rarr;</p>
              </div>
              <div className="classes_page_classlist_section_class_subjects">
                <ClassesSlide data={clazz.data} handlePopUp={this.popClassUp} />
              </div>
            </div>
          ))}
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
                  </span>
                  &nbsp; &nbsp; &nbsp;Junior Sceondary School One
                </p>
                <p>
                  <span className="classes_page_class_pop_up_page_subject_details_left_key">
                    Lessons:
                  </span>
                  &nbsp; &nbsp; &nbsp; 116 Video Lessons
                </p>
                <p>
                  <span className="classes_page_class_pop_up_page_subject_details_left_key">
                    Students:
                  </span>
                  &nbsp; &nbsp; &nbsp; 13,000 Registered Students
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
                            <Link
                              to="/content/ljdn9836z3n"
                              className="classes_page_class_pop_up_page_term_item_left_bottom_item"
                            >
                              <FontAwesomeIcon
                                onClick={this.hidePopUp}
                                icon={faPlay}
                              />
                              <button>Lesson 1</button>
                            </Link>
                            <Link
                              to="/content/ljdn9836z3n"
                              className="classes_page_class_pop_up_page_term_item_left_bottom_item"
                            >
                              <FontAwesomeIcon
                                onClick={this.hidePopUp}
                                icon={faPlay}
                              />
                              <button>Lesson 1</button>
                            </Link>
                            <Link
                              to="/content/ljdn9836z3n"
                              className="classes_page_class_pop_up_page_term_item_left_bottom_item"
                            >
                              <FontAwesomeIcon
                                onClick={this.hidePopUp}
                                icon={faPlay}
                              />
                              <button>Lesson 1</button>
                            </Link>
                            <div
                              to="/content/ljdn9836z3n"
                              className="classes_page_class_pop_up_page_term_item_left_bottom_item"
                            >
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
