import React, { useEffect, useRef } from "react";
import "./css/style.css";
import SubjectBoxSlide from "../../includes/subjectBadgeForSlick/subjectBadgeForSlick.component";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCourses } from "./../../../redux/actions/courseActions";
import PropTypes from "prop-types";

const Classes = (props) => {
  const { courses } = props;

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      window.scrollTo(0, 0);

      if (!courses.length) {
        props.getCourses();
      }
    } else {
      // do componentDidUpdate logic
    }
  });

  const courseTitleList = () => {
    if (courses.length) {
      return courses.map((item, index) => {
        return (
          <div
            className={`col-2 ${
              index === 0 || index === 6 || index === 12 ? "borderLeftOff" : ""
            }`}
          >
            <Link to={`/classes/${item._id}`}>{item.name}</Link>
          </div>
        );
      });
    }
  };

  const courseList = () => {
    if (courses.length) {
      return courses.map((item, index) => { 
        return (
          <div className="row secondSection">
            <div className="col-md-12 heading">
              <h6>{item.name}</h6>
            </div>
            <div className="col-md-12">
              <div className="row">
                <SubjectBoxSlide id={item._id} />
              </div>
            </div>
          </div>
        );
      });
    }
  };

  return (
    <div id="classes" className="classes1 container-fluid relative">
      <div className="row firstSection">
        <div className="col-md-2 paddingRightOff">
          <h3>Classes</h3>
        </div>
        <div className="col-md-6 partTwo desktopOnly">
          <div className="row myclasses">{courseTitleList()}</div>
        </div>
        <div className="col-md-2"></div>
      </div>
      {courseList()}
    </div>
  );
};

Classes.propTypes = {
  getCourses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  courses: state.course.courses,
});
export default connect(mapStateToProps, { getCourses })(Classes);
