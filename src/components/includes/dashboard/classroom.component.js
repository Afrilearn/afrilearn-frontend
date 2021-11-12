import React from "react";
import { inputChange } from "./../../../redux/actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Bullet1 from "../../../assets/img/redBullet.png";
import Bullet2 from "../../../assets/img/greenBullet.png";

const Box = (props) => {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div className="row bottomBorder push9 myClassroom">
      <div className="col-md-4">
        <span>
          <img
            src={props.bullet2 ? Bullet2 : Bullet1}
            alt="classroom"
            className="bullet"
          />
          &nbsp;&nbsp;{capitalizeFirstLetter(props.className)} - {props.classCode}
        </span>
      </div>
      <div className="col-md-4">
        <span className="instructor">Instructor: &nbsp;</span>
        {props.teacher ? props.teacher : "Anonymous"}
      </div>
      {props.item.status === "approved" ? (
        <div className="col-md-4 right">
          <Link
            className="view"
            to={`/classroom/${props.classId}`}
            onClick={() => {
              props.inputChange("inClass", true);
            }}
          >
            Enter classroom
          </Link>
        </div>
      ) : (
        <div className="col-md-4 right ">
          <button className="view" disabled>
            {capitalizeFirstLetter(props.item.status)}
          </button>
        </div>
      )}
    </div>
  );
};

Box.propTypes = {
  inputChange: PropTypes.func.isRequired,
};

export default connect(null, {
  inputChange,
})(Box);
