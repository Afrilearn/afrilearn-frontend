import { faAngleDown, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import firstterm from "../../../assets/img/firstterm.png";
import "./css/style.css"

const LessonItem = (props) => {
  const { clazz, seeMore } = props;
  return (
    <div key={clazz._id} className="term_item">
      <div className="term_item_right">
        <img src={firstterm} alt="see this"></img>
      </div>
      <div className="term_item_left">
        <h5 className="term_item_left_top">
          Geometrical Construction (1): Lines
        </h5>
        <div className="term_item_left_bottom">
          <div className="term_item_left_bottom_item">
            <FontAwesomeIcon icon={faPlay} />
            <button>Lesson 1</button>
          </div>
          <div className="term_item_left_bottom_item">
            <FontAwesomeIcon icon={faPlay} />
            <button>Lesson 1</button>
          </div>
          <div className="term_item_left_bottom_item">
            <FontAwesomeIcon icon={faPlay} />
            <button>Lesson 1</button>
          </div>
          <div className="term_item_left_bottom_item">
            <button>Quiz</button>
          </div>
        </div>
      </div>
      <span className="term_item_see_more" onClick={seeMore}>
        <FontAwesomeIcon icon={faAngleDown} />
      </span>
    </div>
  );
};

export default LessonItem;
