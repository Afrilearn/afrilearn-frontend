import React, { Component } from "react";
import ClassesSlide from "../../includes/classesSlide.component";
import "./css/style.css";
import { Link } from "react-router-dom";

import classnote from "../../../assets/img/classnote.png";
import maths from "../../../assets/img/maths.png";
import english from "../../../assets/img/english.png";
import health from "../../../assets/img/health.png";
import science from "../../../assets/img/science.png";
import Civic from "../../../assets/img/Civic.png";
import social from "../../../assets/img/social.png";
import health_two from "../../../assets/img/health_two.png";
import english_two from "../../../assets/img/english_two.png";


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
      </div>
    );
  }
}
