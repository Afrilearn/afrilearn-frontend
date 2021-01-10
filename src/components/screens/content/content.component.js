import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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
import LessonItem from "../../includes/lessonItem/lessonItem.component";
class Content extends Component {
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
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  seeMore = (event) => {
    event.preventDefault();
    const terms = document.querySelectorAll(".term");
    const seeMoreButtons = document.querySelectorAll(".term_item_see_more");
    const seeLessButtons = document.querySelector(".term_item_see_less");
    const border = document.querySelector(".terms");
    seeLessButtons.style.display = "flex";
    border.style.borderBottom = "1px solid grey";
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
    const terms = document.querySelectorAll(".term");
    const seeMoreButtons = document.querySelectorAll(".term_item_see_more");
    const seeLessButtons = document.querySelector(".term_item_see_less");
    const border = document.querySelector(".terms");
    border.style.borderBottom = "none";
    seeLessButtons.style.display = "none";
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
          id="contentPageFirstSection"
          style={{
            backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.17), rgba(0, 0, 0, 0.99)),
      url(${pencil})`,
          }}
        >
          <h1>JSS - ONE</h1>
          <div className="subHead">Basic Technology</div>
          <div className="subHeadTwo">Explore the fun in learning</div>
        </div>
        <div id="contentPageSecondSection">
          <div class="container-fluid">
            <div className="details row">
              <div className="right1 col-md-7">
                <div className="right_head">
                  <h4>Basic Technology</h4>
                  <span>03</span>
                  <p>Terms</p>
                </div>
                <p className="right_para">
                  Basic Technology is a very important subject in todays
                  curriculum for students especially at the junior secondary
                  level as knowledge impacted prepares them for the various
                  experiences at the senior level not withstanding their carrier
                  paths.
                </p>
                <p className="red_text">Subscribe to Unlock Content</p>
              </div>
              <div className="col-md-1"></div>
              <div className="left col-md-4">
                <p>
                  <span className="left_key">Class:</span>
                  &nbsp; &nbsp; Junior Sceondary School One
                </p>
                <p>
                  <span className="left_key">Lessons:</span>
                  &nbsp; &nbsp; 116 Video Lessons
                </p>
                <p>
                  <span className="left_key">Students:</span>
                  &nbsp; &nbsp; 13,000 Registered Students
                </p>               
              </div>
              
            </div>
          </div>
          <div class="container-fluid">
            <div className="terms">
              {this.state.terms.map((term) => (
                <div key={term._id} className="term">
                  <h4 className="term_head">{term.name}</h4>
                  <div className="term_list">
                    {term.classes.map((clazz) => (
                      <LessonItem clazz={clazz} seeMore={this.seeMore} />
                    ))}
                  </div>
                </div>
              ))}
              <span className="term_item_see_less" onClick={this.seeLess}>
                <FontAwesomeIcon icon={faAngleUp} />
              </span>
            </div>
          </div>{" "}
        </div>
      </div>
    );
  }
}

export default Content;
