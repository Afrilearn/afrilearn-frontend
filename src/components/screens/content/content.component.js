import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import { getCourse } from "./../../../redux/actions/courseActions";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

import "./css/style.css";
import pencil from "../../../assets/img/pencil.png";
import LessonItem from "../../includes/lessonItem/lessonItem.component";
import { Link } from "react-router-dom";

const Content = (props) => {
  const { course } = props;
  const subject =
    course.relatedSubjects &&
    course.relatedSubjects.find(
      (su) => su.courseId === props.match.params.courseId
    );

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      window.scrollTo(0, 0);

      if (!course.length) {
        props.getCourse(props.match.params.courseId);
      }
    } else {
      // do componentDidUpdate logic
    }
  });

  const seeMore = (event) => {
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

  const seeLess = (event) => {
    event.preventDefault();
    const termsTarget = document.querySelectorAll(".term");
    const seeMoreButtons = document.querySelectorAll(".term_item_see_more");
    const seeLessButtons = document.querySelector(".term_item_see_less");
    const border = document.querySelector(".terms");
    border.style.borderBottom = "none";
    seeLessButtons.style.display = "none";
    for (let index = 1; index < termsTarget.length; index++) {
      const term = termsTarget[index];
      term.style.display = "none";
    }
    if (terms[0].lessons) {
      for (
        let index = terms[0].lessons.length - 1;
        index < seeMoreButtons.length;
        index++
      ) {
        const seeMoreButton = seeMoreButtons[index];
        seeMoreButton.style.display = "flex";
      }
    }
  };

  const terms = [];
  const termIds = [
    { id: "5fc8d1b20fae0a06bc22db5c", name: "First Term" },
    { id: "600047f67cabf80f88f61735", name: "Second Term" },
    { id: "600048197cabf80f88f61736", name: "Third Term" },
  ];
  termIds.forEach((item) => {
    const lessons =
      subject && subject.relatedLessons.filter((les) => les.termId === item.id);
    terms.push({ id: item.id, name: item.name, lessons });
  });

  /*
  
  */

  return (
    <div>
      <div
        id="contentPageFirstSection"
        style={{
          backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.17), rgba(0, 0, 0, 0.99)),
      url(${pencil})`,
        }}
      >
        <h1>{course.name ? course.name.toUpperCase() : course.name}</h1>
        <div className="subHead">{subject && subject.mainSubjectId.name}</div>
        <div className="subHeadTwo">Explore the fun in learning</div>
      </div>
      <div id="contentPageSecondSection">
        <div class="container-fluid">
          <div className="details row">
            <div className="right1 col-md-7">
              <div className="right_head">
                <h4>{subject && subject.mainSubjectId.name}</h4>
                <span>0{terms.length && terms.length}</span>
                <p>Terms</p>
              </div>
              <p className="right_para">
                {subject && subject.mainSubjectId.introText}
              </p>
              <Link to="/select-pay">
                <p className="red_text">Subscribe to Unlock Content</p>
              </Link>
            </div>
            <div className="col-md-1"></div>
            <div className="left col-md-4">
              <p>
                <span className="left_key">Class:</span>
                &nbsp; &nbsp; {course.name}
              </p>
              <p>
                <span className="left_key">Lessons:</span>
                &nbsp; &nbsp;{" "}
                {course &&
                  subject &&
                  course.relatedSubjects.length *
                    subject.relatedLessons.length}{" "}
                Video Lessons
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
            {course.relatedSubjects &&
              terms.map((term, index) => (
                <div key={term.id} className="term">
                  <h4 className="term_head">{term.name}</h4>
                  <div className="term_list">
                    {term.lessons &&
                      term.lessons.map((clazz) => (
                        <LessonItem
                          key={clazz._id}
                          lesson={clazz}
                          seeMore={seeMore}
                        />
                      ))}
                  </div>
                </div>
              ))}
            <span className="term_item_see_less" onClick={seeLess}>
              <FontAwesomeIcon icon={faAngleUp} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

Content.propTypes = {
  getCourse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course.course,
});
export default connect(mapStateToProps, { getCourse })(Content);
