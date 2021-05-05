import React, { useState, useRef, useEffect } from "react";
import Box from "./../../includes/subjectBadgeForSlick/subjectBox.component";
import PastQuestionsBox from "../../includes/pastQuestions/box.component";
import {
  getChildren,
  getCurrentCourseSubjects,
} from "../../../redux/actions/parentActions";
import { getSubjectAndRelatedLessons } from "../../../redux/actions/subjectActions";
import { clearErrors } from "../../../redux/actions/errorActions";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./css/style.css";
import {
  getSchoolCourses,
  getSchoolProfile,
  uploadSchoolCoverPhoto,
} from "../../../redux/actions/schoolActions";
import { inputChange } from "../../../redux/actions/authActions";

const padWithZero = (num) => (num > 9 ? num : "0" + num);

const dashboardData = {
  enrolledCourse: {
    courseId: {
      _id: "uniqueId",
      name: "JSS ONE",
      relatedSubjects: [
        {
          mainSubjectId: {
            name: "Mathematics",
            imageUrl:
              "https://afrilearn-media.s3.eu-west-3.amazonaws.com/subject-images/maths.png",
          },
        },
        {
          mainSubjectId: {
            name: "English",
            imageUrl:
              "https://afrilearn-media.s3.eu-west-3.amazonaws.com/subject-images/english.png",
          },
        },
        {
          mainSubjectId: {
            name: "Physics",
            imageUrl:
              "https://afrilearn-media.s3.eu-west-3.amazonaws.com/subject-images/Physics.png",
          },
        },
        {
          mainSubjectId: {
            name: "Chemistry",
            imageUrl:
              "https://afrilearn-media.s3.eu-west-3.amazonaws.com/subject-images/chemistry.png",
          },
        },
        {
          mainSubjectId: {
            name: "Biology",
            imageUrl:
              "https://afrilearn-media.s3.eu-west-3.amazonaws.com/subject-images/biology.png",
          },
        },
        {
          mainSubjectId: {
            name: "Economics",
            imageUrl:
              "https://afrilearn-media.s3.eu-west-3.amazonaws.com/subject-images/economics.png",
          },
        },
      ],
      relatedPastQuestions: [
        { pastQuestionTypes: [{ name: "WASSCE", categoryId: "1" }] },
        { pastQuestionTypes: [{ name: "NECO", categoryId: "2" }] },
        { pastQuestionTypes: [{ name: "JAMB", categoryId: "3" }] },
      ],
    },
  },
  relatedCourses: [
    { name: "Primary One", teachers: 1, _id: "1" },
    { name: "Primary Two", teachers: 2, _id: "2" },
    { name: "Primary Three", teachers: 2, _id: "3" },
    { name: "Primary Four", teachers: 3, _id: "4" },
    { name: "Primary Five", teachers: 2, _id: "5" },
    { name: "Primary Six", teachers: 4, _id: "6" },
  ],
};

const SchoolDashboard = (props) => {
  const { user } = props;
  const [lessonsCourseId, setLessonsCourseId] = useState("");

  const mounted = useRef(false);

  const dispatch = useDispatch();
  const school = useSelector((state) => state.school.school);
  const courses = useSelector((state) => state.school.courses);
  const profile = useSelector((state) => state.school.profile);
  const coverPhoto = useSelector((state) => state.school.coverPhoto);
  console.log("profile", profile);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      dispatch(getSchoolProfile(user.schoolId));
      dispatch(getSchoolCourses(user.schoolId));
    }
  });
  const [courseIndex, setCourseIndex] = useState(0);

  const indexincourses = (id) =>
    courses.findIndex((course) => course._id === id);

  const subjectList = () => {
    if (courses[courseIndex]) {
      let subjects = courses[courseIndex].relatedSubjects;
      return subjects.map((item) => {
        return (
          <Box
            image={item.mainSubjectId.imageUrl}
            singleClass={true}
            dashboard={true}
            compiledNotes={3000}
            registeredUsers={50000}
            subjectName={item.mainSubjectId.name}
            courseId={dashboardData.enrolledCourse.courseId._id}
            introText={item.mainSubjectId.introText || "This is the intro text"}
            courseName={dashboardData.enrolledCourse.courseId.name}
            subjectId={item._id}
          />
        );
      });
    } else {
      return <h6>No Subject list yet</h6>;
    }
  };

  const pastQuestionsList = () => {
    if (courses[courseIndex]) {
      let pastQuestions = courses[courseIndex].relatedPastQuestions;
      return pastQuestions.map((item, index) => {
        return (
          <PastQuestionsBox
            title={item.pastQuestionTypes[0].name}
            other={index % 2 === 0 ? true : false}
            categoryId={item.pastQuestionTypes[0].categoryId}
            categoryName={item.pastQuestionTypes[0].name}
          />
        );
      });
    } else {
      return <h6>No past questions yet</h6>;
    }
  };

  return (
    <div id="school-dashboard" className="negative-top dashboard">
      <div
        className="top-display"
        style={{
          backgroundImage: `url(${coverPhoto})`,
        }}
      >
        {!coverPhoto && (
          <label>
            <input
              type="file"
              onChange={(e) => {
                e.preventDefault();
                const data = new FormData();
                data.append("coverPhoto", e.target.files[0]);
                dispatch(uploadSchoolCoverPhoto(profile._id, data));
              }}
            />
            Upload Header Image
          </label>
        )}
      </div>
      <div className="px-3 px-sm-4 px-md-5">
        <div className="d-flex justify-content-center mx-auto">
          <div
            className="d-flex flex-column flex-md-row align-items-center"
            style={{
              maxWidth: 650,
              width: "100%",
              marginTop: "-80px",
              position: "relative",
            }}
          >
            <img
              src={profile.logo}
              alt="Profile pic"
              style={{
                width: "150px",
                objectFit: "cover",
                height: "150px",
                borderRadius: "50%",
                position: "relative",
                zIndex: 1,
              }}
            />
            <div className="stat-display">
              <div>
                <div style={{ minHeight: "2em" }} className="font2">
                  Teachers
                </div>
                <div style={{ fontSize: "1.4em", color: "rgba(0,0,0,.49)" }}>
                  {padWithZero(school.numOfTeachers || 0)}
                </div>
              </div>
              <div>
                <div style={{ minHeight: "2em" }} className="font2">
                  Students
                </div>
                <div style={{ fontSize: "1.4em", color: "rgba(0,0,0,.49)" }}>
                  {padWithZero(school.numOfStudents || 0)}
                </div>
              </div>
              <div
                style={{ position: "absolute", bottom: "-40px" }}
                className="d-flex justify-content-around w-100"
              >
                <Link
                  to={`/add-teacher?schoolId=${profile._id}`}
                  className="underlined"
                  style={{
                    fontSize: ".9em",
                    color: "rgba(38, 170, 118, 1)",
                  }}
                >
                  +Add New Teacher
                </Link>
                <Link
                  to={`/add-student?schoolId=${profile._id}`}
                  className="underlined"
                  style={{
                    fontSize: ".9em",
                    color: "rgba(38, 170, 118, 1)",
                  }}
                >
                  +Add New Student
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-5">
          <div className="w-100" style={{ maxWidth: "100%" }}>
            <div className="container-fluid relative mt-3 mt-md-0">
              <div className="d-flex mb-3 align-items-center">
                <h4 className="font2 mr-4 my-0">Subjects</h4>
                <select
                  className="general mt-0 py-2 pl-3 pr-2 select-class"
                  style={{
                    maxWidth: "160px",
                    backgroundColor: "rgba(38, 170, 118, 0.28)",
                    color: "rgba(38, 170, 118, 1)",
                    borderRadius: 7,
                  }}
                  value={lessonsCourseId}
                  onInput={(e) => {
                    setLessonsCourseId(e.target.value);
                    setCourseIndex(indexincourses(e.target.value));
                  }}
                >
                  <option disabled value="">
                    {(school &&
                      school.schoolClassesData &&
                      school.schoolClassesData[0] &&
                      school.schoolClassesData[0].className) ||
                      "Select Class"}
                  </option>
                  {school &&
                    school.schoolClassesData &&
                    school.schoolClassesData.map((course) => (
                      <option value={course.courseId} key={course._id}>
                        {course.className}
                      </option>
                    ))}
                </select>
              </div>
              <div
                id="classes"
                // className="container-fluid relative"
              >
                <div className="row">{subjectList()}</div>
              </div>

              <div className="mt-5">
                <h4 className="font2">Past Questions</h4>
                <div className="row jj">{pastQuestionsList()}</div>
              </div>

              <div className="mt-5 p-3 pb-4 gradient-bg">
                <div className="row mx-0">
                  <div className="col-sm-6">
                    <h4>Classes</h4>
                  </div>
                  <div
                    className="col-sm-3 d-none d-sm-block"
                    style={{ overflow: "visible" }}
                  >
                    <h4 className="nowrap">Number of Teachers</h4>
                  </div>
                </div>
                {school &&
                  school.schoolClassesData &&
                  school.schoolClassesData.map((course, index) => (
                    <div
                      className="row py-3 mx-0"
                      style={{ borderTop: "1px solid rgba(79, 79, 79, 1)" }}
                    >
                      <div className="col-sm-6">{course.className}</div>
                      <div className="col-sm-3 text-sm-center">
                        <span
                          style={{ color: "rgba(255,255,255,.7)" }}
                          className="d-sm-none"
                        >
                          No of teachers:{" "}
                        </span>
                        {padWithZero(course.numOfClassTeachers || 0)}
                      </div>
                      <div className="col-sm-3">
                        <Link
                          to={`/add-teacher?schoolId=${profile._id}&classId=${course.classId}`}
                          className="underlined"
                          style={{
                            fontSize: ".9em",
                            color: "rgba(38, 170, 118, 1)",
                          }}
                          onClick={(e) => {
                            dispatch(
                              inputChange("className", course.className)
                            );
                          }}
                        >
                          +Add New Teacher
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  children: state.parent.children,
  currentCourse: state.parent.currentCourse,
  courseSubjects: state.parent.courseSubjects,
  subject: state.subject.subject,
  user: state.auth.user,
  error: state.error,
  success: state.success,
});

export default connect(mapStateToProps, {
  clearErrors,
  getChildren,
  getCurrentCourseSubjects,
  getSubjectAndRelatedLessons,
})(SchoolDashboard);
