import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faBookReader,
  faMicrophone,
  faUser,
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
import SubjectBadge from "../../includes/subjectBadge/subjectBadge.component";
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
              <SubjectBadge item={item} terms={this.state.terms} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ClassPage;
