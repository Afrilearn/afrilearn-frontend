import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCourse } from "./../../../redux/actions/courseActions";
import { getSubjectAndRelatedLessons } from "./../../../redux/actions/subjectActions";

import "./css/style.css";
import pencil from "../../../assets/img/pencil.png";
import LessonItem from "../../includes/lessonItem/lessonItem.component";
import { Link } from "react-router-dom";

const Content = (props) => {
  const { subject, role, activeCoursePaidStatus } = props;
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      window.scrollTo(0, 0);

      props.getSubjectAndRelatedLessons(
        props.match.params.courseId,
        props.match.params.subjectId
      );
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

  const terms = [];

  const termIds = [
    { id: "5fc8d1b20fae0a06bc22db5c", name: "First Term" },
    { id: "600047f67cabf80f88f61735", name: "Second Term" },
    { id: "600048197cabf80f88f61736", name: "Third Term" },
  ];

  termIds.forEach((item) => {
    const lessons =
      subject.relatedLessons &&
      subject.relatedLessons.filter((les) => les.termId === item.id);
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
        <h1>{subject.courseId ? subject.courseId.name.toUpperCase() : "Hi"}</h1>
        <div className="subHead">
          {subject.mainSubjectId && subject.mainSubjectId.name}
        </div>
        <div className="subHeadTwo">Explore the fun in learning</div>
      </div>
      <div id="contentPageSecondSection">
        <div class="container-fluid">
          <div className="details row">
            <div className="right1 col-md-7">
              <div className="right_head">
                <h4>{subject.mainSubjectId && subject.mainSubjectId.name}</h4>
                <span>0{terms.length && terms.length}</span>
                <p>Terms</p>
              </div>
              <p className="right_para">
                {subject.mainSubjectId && subject.mainSubjectId.introText}
              </p>
              {!activeCoursePaidStatus ? (
                <Link to="/select-pay">
                  <p className="red_text">Subscribe to Unlock Content</p>
                </Link>
              ) : (
                ""
              )}
            </div>
            <div className="col-md-1"></div>
            <div className="left col-md-4">
              <p>
                <span className="left_key">Class:</span>
                &nbsp; &nbsp; {subject.courseId && subject.courseId.alias}
              </p>
              <p>
                <span className="left_key">Lessons:</span>
                &nbsp; &nbsp;{" "}
                {subject && subject.relatedLessons
                  ? subject.relatedLessons.length
                  : 0}
                &nbsp;Video Lessons
              </p>
              <p>
                <span className="left_key">Students:</span>
                &nbsp; &nbsp; 13,000 Registered Students
              </p>
              {role && role === "5fc8cc978e28fa50986ecac9" && (
                <Link to="/assign-content">
                  <p className="teacher-assign-content-green">
                    Assign study content to students
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div class="container-fluid">
          <div className="terms">
            {subject &&
            terms &&
            terms[0].length !== 0 &&
            terms[1].length !== 0 &&
            terms[2].length !== 0 ? (
              terms.map((term, id) => (
                <div key={term.id} className="term">
                  <h4 className="term_head">{term.name}</h4>
                  <div className="term_list accordion" id="lessonsAccordion">
                    {term.lessons &&
                      term.lessons.map((clazz, index) => (
                        <LessonItem
                          key={clazz._id}
                          lesson={clazz}
                          seeMore={seeMore}
                          unlocked={index === 0}
                          relatedLessons={subject.relatedLessons}
                          index={index}
                          term={term.name}
                        />
                      ))}
                  </div>
                </div>
              ))
            ) : (
              <p>No lessons found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Content.propTypes = {
  getCourse: PropTypes.func.isRequired,
  getSubjectAndRelatedLessons: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course.course,
  subject: state.subject.subject,
  role: state.auth.user.role,
  activeCoursePaidStatus: state.auth.activeCoursePaidStatus,
});
export default connect(mapStateToProps, {
  getCourse,
  getSubjectAndRelatedLessons,
})(Content);
