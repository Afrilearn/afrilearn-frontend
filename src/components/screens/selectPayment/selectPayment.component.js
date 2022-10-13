import React, { useEffect, useRef, useState, useContext } from "react";
// import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { usePaystackPayment } from "react-paystack";
import "./css/style.css";
import { Container, Row, Col, Modal, ModalHeader, ModalBody } from "reactstrap";
import SubscriptionBox from "../../includes/subscriptionBox/subscriptionBox.component";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  paymentPlans,
  inputChange,
  verifyPayStackPayment,
  getTeacherPaymentPlans,
} from "./../../../redux/actions/paymentActions";
import { Link } from "react-router-dom";
import { getChildren } from "../../../redux/actions/parentActions";
import { getMembersInClass } from "./../../../redux/actions/classActions";
import { getActiveSubs, getRoles } from "./../../../redux/actions/authActions";
import {
  getSchoolCourses,
  getSchoolProfile,
} from "./../../../redux/actions/schoolActions";
import { clearErrors } from "./../../../redux/actions/errorActions";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import queryString from "query-string";
import { Helmet } from "react-helmet";
import { getCourseSubjects } from "../../../redux/actions/courseActions";
import { ThemeContext } from "../../../App";

const Payment = (props) => {
  const { theme } = useContext(ThemeContext)
  const unselectAll = () => {
    var allInputs = document.getElementsByTagName("input");
    for (var i = 0, max = allInputs.length; i < max; i++) {
      if (allInputs[i].type === "checkbox") allInputs[i].checked = false;
    }
  };
  const parsed = queryString.parse(props.location.search);
  const mounted = useRef();
  const subjectsForSignUp = useSelector(
    (state) => state.course.subjectsForSignUp
  );
  const dispatch = useDispatch();
  const actives = useSelector((state) => state.auth.actives);
  const school = useSelector((state) => state.school.school);
  const {
    categories,
    paymentPlanId,
    paymentAmount,
    userId,
    classMembersPayment,
    email,
    courses,
    children,
    role,
    error,
    user,
    teacherPaymentPlans,
  } = props;
  let paymentPlansToShow = categories;
  if (
    role === "602f3ce39b146b3201c2dc1d" ||
    role === "607ededa2712163504210684"
  ) {
    paymentPlansToShow = teacherPaymentPlans;
  }

  const [selected, setSelected] = useState(null);
  const [childCourses, setchildCourses] = useState([]);
  const [childId, setChildId] = useState("");

  const [courseId, setCourseId] = useState(null);
  const [subjectIds, setSubjectIds] = useState([]);
  const [classToPayFor, setClassToPayFor] = useState(null);
  const [nameOfClass, setNameOfClass] = useState(null);
  const [newClassContent, setNewClassContent] = useState(null);
  const [receipientOption, setReceipientOption] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const toggle1 = () => setModal(false);

  let courseList = () => {
    if (courses.length) {
      return courses.map((course, index) => {
        // if ()
        return (
          <option
            // disabled={
            //   role !== "602f3ce39b146b3201c2dc1d" &&
            //   actives.includes(course._id)
            // }
            value={course._id}
          >
            {course.name}
            {/* {role !== "602f3ce39b146b3201c2dc1d" &&
              actives.includes(course._id) &&
              "(Subscribed)"} */}
          </option>
        );
      });
    }
  };

  if (
    role === "607ededa2712163504210684" &&
    school &&
    school.schoolClassesData &&
    school.schoolClassesData.length
  ) {
    courseList = () => {
      return school.schoolClassesData.map((course, index) => {
        return (
          <option
            value={course.courseId}
            // disabled={actives.includes(course.courseId)}
            className={course._id}
          >
            {course.className}{" "}
            {/* {actives.includes(course.courseId) && "(Subscribed)"} */}
          </option>
        );
      });
    };
  }

  const newClass = {
    __v: 0,
    _id: new Date().toString(),
    classCode: "00000",
    courseId: "1",
    createdAt: "2021-04-16T07:30:43.040Z",
    enrolledCourse: {
      __v: 0,
      _id: "60793d2258cbbb0015f28f1e",
      classId: "60793d2358cbbb0015f28f1f",
      courseId: "5fd12c70e74b15663c5f4c6e",
      createdAt: "2021-04-16T07:30:42.886Z",
      endDate: "2022-04-16T10:36:54.398Z",
      id: "60793d2258cbbb0015f28f1e",
      paymentIsActive: true,
      startDate: "2021-04-16T10:36:54.398Z",
      status: "paid",
      updatedAt: "2021-04-16T10:36:54.435Z",
      userId: "60793d2258cbbb0015f28f1d",
    },
    id: "60793d2358cbbb0015f28f1f",
    name: "Create New Class",
    updatedAt: "2021-04-16T07:30:43.040Z",
    userId: "60793d2258cbbb0015f28f1d",
  };
  const myRecipientListOptions = [
    {
      __v: 0,
      _id: new Date().toString(),
      classCode: "00000",
      courseId: "1",
      createdAt: "2021-04-16T07:30:43.040Z",
      enrolledCourse: {
        __v: 0,
        _id: "60793d2258cbbb0015f28f1e",
        classId: "60793d2358cbbb0015f28f1f",
        courseId: "5fd12c70e74b15663c5f4c6e",
        createdAt: "2021-04-16T07:30:42.886Z",
        endDate: "2022-04-16T10:36:54.398Z",
        id: "60793d2258cbbb0015f28f1e",
        paymentIsActive: true,
        startDate: "2021-04-16T10:36:54.398Z",
        status: "paid",
        updatedAt: "2021-04-16T10:36:54.435Z",
        userId: "60793d2258cbbb0015f28f1d",
      },
      id: "60793d2358cbbb0015f28f1f",
      name: "Personal Payment",
      updatedAt: "2021-04-16T07:30:43.040Z",
      userId: "60793d2258cbbb0015f28f1d",
    },
    // {
    //   __v: 1,
    //   _id: new Date().toString(),
    //   classCode: "0v000",
    //   courseId: "2",
    //   createdAt: "2021-04-16T07:30:43.040Z",
    //   enrolledCourse: {
    //     __v: 0,
    //     _id: "60793d2258cbbb0015f28f1e",
    //     classId: "60793d2358cbbb0015f28f1f",
    //     courseId: "5fd12c70e74b15663c5f4c6e",
    //     createdAt: "2021-04-16T07:30:42.886Z",
    //     endDate: "2022-04-16T10:36:54.398Z",
    //     id: "60793d2258cbbb0015f28f1e",
    //     paymentIsActive: true,
    //     startDate: "2021-04-16T10:36:54.398Z",
    //     status: "paid",
    //     updatedAt: "2021-04-16T10:36:54.435Z",
    //     userId: "60793d2258cbbb0015f28f1d",
    //   },
    //   id: "60793d2358cbbb0015f28f1f",
    //   name: "Pay for Student",
    //   updatedAt: "2021-04-16T07:30:43.040Z",
    //   userId: "60793d2258cbbb0015f28f1d",
    // },
  ];

  const classList = () => {
    if (user.classOwnership) {
      if (user.classOwnership.length) {
        return user.classOwnership.map((teacherClass, index) => {
          return (
            <option
              // disabled={actives.includes(teacherClass.courseId)}
              value={teacherClass.courseId}
              className={teacherClass.id}
            >
              {teacherClass.name}{" "}
              {/* {actives.includes(teacherClass.courseId) && "(Subscribed)"} */}
            </option>
          );
        });
      }
    }
  };
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const recipientList = () => {
    if (myRecipientListOptions.length) {
      return myRecipientListOptions.map((option, index) => {
        return <option value={option.courseId}>{option.name}</option>;
      });
    }
  };

  const classMembersList = () => {
    if (classMembersPayment.length) {
      return classMembersPayment.map((student, index) => {
        if (student.userId) {
          return (
            <option value={student.userId.id}>{student.userId.fullName}</option>
          );
        }
      });
    }
  };

  const childrenList = () => {
    if (children.length) {
      return children.map((child, index) => {
        return <option value={child._id}>{child.fullName}</option>;
      });
    }
  };

  const childCoursesList = () => {
    if (childCourses.length) {
      return childCourses.map((course, index) => {
        return <option value={course._id}>{course.name}</option>;
      });
    }
  };
  if (user.classOwnership?.findIndex((i) => i.id == newClass.id) === -1) {
    user.classOwnership.push(newClass);
  }

  useEffect(() => {
    if (role === "607ededa2712163504210684") {
      dispatch(getSchoolProfile(user.schoolId && user.schoolId._id));

      dispatch(getSchoolCourses(user.schoolId._id));
    }
  }, [role]);

  useEffect(() => {
    if (!mounted.current) {
      if (!childId) {
        dispatch(getActiveSubs(user._id));
      }
      // do componentDidMount logic

      mounted.current = true;
      window.scrollTo(0, 0);
      props.paymentPlans();
      dispatch(getTeacherPaymentPlans());
      props.getRoles();
    } else {
      // do componentDidUpdate logic
      if (error.id === "PAYMENT_VERIFICATION_SUCCESS") {
        const message =
          typeof error.msg === "object" ? error.msg.join("<br/>") : error.msg;
        Swal.fire({
          html: message,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        }).then(function (result) {
          if (role === "602f3ce39b146b3201c2dc1d") {
            window.location = "/classes/teacher";
          } else {
            window.location = "/dashboard";
          }
        });

        props.clearErrors();
      }
    }
  });

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      props.getChildren();
    }
  });

  useEffect(() => {
    let childCourses_ = [];
    if (childId) {
      dispatch(getActiveSubs(childId));
    }

    let children_ = children.filter((c) => c._id === childId);
    let child = children_[0];

    if (child) {
      let subscribedCourses = child.enrolledCourses.filter(
        (course) => course.paymentIsActive
      );
      let subscribedCoursesId = subscribedCourses.map((c) => c.courseId._id);
      let arr = courses.filter((c) => !subscribedCoursesId.includes(c._id));
      childCourses_ = childCourses_.concat(arr);
    }

    setchildCourses(childCourses_);
  }, [children, childId]);

  const setBB = (price) => {
    //change background onClick
    const all = document.querySelectorAll(".item");
    const target = document.getElementById(price);
    for (let index = 0; index < all.length; index++) {
      const element = all[index];
      element.classList.add("active");
    }
    target.classList.remove("active");
  };

  //paystack settings
  const config = {
    reference: new Date().getTime(),
    email,
    amount:
      paymentAmount * 100 * (subjectIds.length > 0 ? subjectIds.length : 1),
    publicKey: "pk_live_a9c31ffce1eca1674882580da27446be439723bf",
    channels: ["card"],
  };

  const bankPayment = () => {
    Swal.fire({
      html: "These is working one",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  };

  const initializePayment = usePaystackPayment(config);

  const checkAndMakePayment = (bankPayment = false) => {
    if (!courseId) {
      Swal.fire({
        html: "Please select a class",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        timer: 3500,
        // position: 'top-end',,
      });
      props.clearErrors();
    } else if (
      role === "602f3ce39b146b3201c2dc1d" &&
      courseId == 1 &&
      !nameOfClass
    ) {
      Swal.fire({
        html: "Please enter the new class name",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        timer: 3500,
        // position: 'top-end',,
      });
      props.clearErrors();
    } else if (
      role === "602f3ce39b146b3201c2dc1d" &&
      courseId == 1 &&
      subjectIds.length === 0
    ) {
      Swal.fire({
        html: "Please select a subject subscribe to.",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        timer: 3500,
        // position: 'top-end',,
      });
      props.clearErrors();
    } else if (role === "607ededa2712163504210684" && subjectIds.length === 0) {
      Swal.fire({
        html: "Please select a subject subscribe to.",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        timer: 3500,
        // position: 'top-end',,
      });
      props.clearErrors();
    }
    // else if (
    //   role === "602f3ce39b146b3201c2dc1d" &&
    //   courseId != 1 &&
    //   !receipientOption &&
    //   !newClassContent
    // ) {
    //   Swal.fire({
    //     html: "Please select recipient",
    //     showClass: {
    //       popup: "animate__animated animate__fadeInDown",
    //     },
    //     hideClass: {
    //       popup: "animate__animated animate__fadeOutUp",
    //     },
    //     timer: 3500,
    //     // position: 'top-end',,
    //   });
    //   props.clearErrors();
    // }
    else if (
      role === "602f3ce39b146b3201c2dc1d" &&
      courseId == 1 &&
      !newClassContent
    ) {
      Swal.fire({
        html: "Please select class content",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        timer: 3500,
        // position: 'top-end',,
      });
      props.clearErrors();
    }
    // else if (
    //   role === "602f3ce39b146b3201c2dc1d" &&
    //   courseId != 1 &&
    //   receipientOption == 2 &&
    //   !selectedStudent
    // )
    // {
    //   Swal.fire({
    //     html: "Please select a student to make payment for",
    //     showClass: {
    //       popup: "animate__animated animate__fadeInDown",
    //     },
    //     hideClass: {
    //       popup: "animate__animated animate__fadeOutUp",
    //     },
    //     timer: 3500,
    //     // position: 'top-end',,
    //   });
    //   props.clearErrors();
    // }
    else if (!paymentAmount) {
      Swal.fire({
        html: "Please select a payment plan",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        timer: 3500,
        // position: 'top-end',,
      });
      props.clearErrors();
    } else if (!childId && role === "606ed82e70f40e18e029165e") {
      Swal.fire({
        html: "Please select a child",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        timer: 3500,
        // position: 'top-end',,
      });
      props.clearErrors();
    } else {
      if (bankPayment === true) {
        toggle();
      } else {
        initializePayment(onSuccess, onClose);
        // onSuccess({ reference: "kjdjdklndkndlkd" });
      }
    }
  };

  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    const data = {
      reference: reference.reference,
      productId: paymentPlanId,
      courseId,
      clientUserId: selectedStudent
        ? selectedStudent
        : childId
        ? childId
        : userId,
      amount: paymentAmount,
    };

    if (nameOfClass) {
      data["newClassName"] = nameOfClass;
    }
    if (classToPayFor) {
      if (role === "607ededa2712163504210684") {
        data["classId"] = classToPayFor.classId;
      } else {
        data["classId"] = classToPayFor._id;
      }
    }
    if (subjectIds) {
      data["subjectIds"] = subjectIds;
      // data["subjectId"] = subjectIds[0];
    }
    props.verifyPayStackPayment(data);
    // console.log("data", data);
  };

  const paymentStyle = {
    dark: {
      backgroundColor: "black",
      color: "white"
    },
    light: {
      backgroundColor: "#e0e0e0",
      color: "black"
    },
    common: {
      transition: 'all 1s ease'
    }
  }

  const themeStyle = {
    ...paymentStyle.common,
    ...(theme === 'light'? paymentStyle.light: paymentStyle.dark)
  }

  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Payment Page | Myafrilearn.com</title>
        <meta name="description" content="Payment Page" />
      </Helmet>
      <div id="selectPaymentPageSectionOne" style={themeStyle}>
        <div class="container">
          <div class="row">
            <div class="col-md-5">
              <div className="box">
                <h3>Unlock With Afrilearn Premium</h3>
                <p className="one">Unlimited Video Lessons</p>              
                <p className="three">Skills (Coding & Vocational)</p>       
                <p className="one">Online Homework Help</p>    
                <p className="four">No Adverts</p>
                <p className="two">School Administrative Features <br/>(Examination, Attendance, Payments, Results etc.)</p>
              </div>
            </div>
            <div class="col-md-7">
              <div className="sub-lenght">
                <Container>
                  {/* for student and teacher */}
                  {role === "5fd08fba50964811309722d5" ||
                  role === "602f3ce39b146b3201c2dc1d" ? (
                    <h3>Step 1: Select Class</h3>
                  ) : null}
                  {/* for student and school*/}
                  {role === "5fd08fba50964811309722d5" ? (
                    <select
                      class="form-select form-select-lg mb-3"
                      aria-label=".form-select-lg example"
                      onChange={(e) => {
                        e.preventDefault();
                        setCourseId(e.target.value);
                      }}
                    >
                      <option selected>Select Class</option>
                      {courseList()}
                    </select>
                  ) : null}

                  {/* for teacher */}
                  {role === "602f3ce39b146b3201c2dc1d" ? (
                    <>
                      <select
                        class="form-select form-select-lg mb-3"
                        aria-label=".form-select-lg example"
                        onChange={(e) => {
                          e.preventDefault();
                          setCourseId(e.target.value);
                          setNewClassContent(null);
                          if (e.target.value != 1) {
                            props.getMembersInClass(
                              e.target.options[e.target.options.selectedIndex]
                                .className,
                              true
                            );
                          }
                          const cc = user.classOwnership.find(
                            (i) =>
                              i._id ===
                              e.target.options[e.target.options.selectedIndex]
                                .className
                          );
                          unselectAll();
                          if (role === "602f3ce39b146b3201c2dc1d") {
                            setClassToPayFor(cc);
                            dispatch(getCourseSubjects(e.target.value));
                            setSubjectIds([]);
                          } else {
                            setClassToPayFor(null);
                            setSubjectIds([]);
                          }
                        }}
                      >
                        <option selected>Select Class</option>
                        {classList()}
                      </select>
                      {courseId && courseId != 1 && !newClassContent ? (
                        <>
                          {subjectsForSignUp.length > 0 && (
                            <div>
                              <label>Select Multiple Subjects</label>
                              <div class="checkbox-box form-control">
                                {subjectsForSignUp.map((i, index) => (
                                  <div
                                    key={index}
                                    className="checkbox-box-item"
                                  >
                                    <input
                                      type="checkbox"
                                      id={i._id}
                                      name="vehicle1"
                                      value={i._id}
                                      defaultChecked={subjectIds.includes(
                                        i._id
                                      )}
                                      onChange={(e) => {
                                        const init = subjectIds;
                                        const index = init.findIndex(
                                          (i) => i === e.target.value
                                        );
                                        if (index !== -1) {
                                          init.splice(index, 1);
                                          setSubjectIds(init);
                                        } else {
                                          init.push(e.target.value);
                                          setSubjectIds(init);
                                        }
                                      }}
                                    />
                                    <label for={i._id}>
                                      {i.mainSubjectId.name}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          {/* <select
                            class="form-select form-select-lg mb-3"
                            aria-label=".form-select-lg example"
                            onChange={(e) => {
                              e.preventDefault();
                              setReceipientOption(e.target.value);
                            }}
                          >
                            <option selected>Select Recipient</option>
                            {recipientList()}
                          </select> */}
                          {receipientOption && receipientOption == "2" ? (
                            <select
                              class="form-select form-select-lg mb-3"
                              aria-label=".form-select-lg example"
                              onChange={(e) => {
                                e.preventDefault();
                                setSelectedStudent(e.target.value);
                              }}
                            >
                              <option selected>Select Student</option>
                              {classMembersList()}
                            </select>
                          ) : null}
                        </>
                      ) : (courseId && courseId == 1) || newClassContent ? (
                        <>
                          <input
                            className="form-control"
                            placeholder="Enter new class name"
                            onChange={(e) => {
                              setNameOfClass(e.target.value);
                            }}
                          />
                          <select
                            class="form-select form-select-lg mb-3"
                            aria-label=".form-select-lg example"
                            onChange={(e) => {
                              e.preventDefault();
                              setCourseId(e.target.value);
                              setNewClassContent(e.target.value);
                              dispatch(getCourseSubjects(e.target.value));
                            }}
                          >
                            <option selected>Select Class Content</option>
                            {courseList()}
                          </select>
                          {subjectsForSignUp.length > 0 && (
                            <div>
                              <label>Select Multiple Subjects</label>
                              <div class="checkbox-box form-control">
                                {subjectsForSignUp.map((i, index) => (
                                  <div
                                    key={index}
                                    className="checkbox-box-item"
                                  >
                                    <input
                                      type="checkbox"
                                      id={i._id}
                                      name="vehicle1"
                                      value={i._id}
                                      defaultChecked={subjectIds.includes(
                                        i._id
                                      )}
                                      onChange={(e) => {
                                        const init = subjectIds;
                                        const index = init.findIndex(
                                          (i) => i === e.target.value
                                        );
                                        if (index !== -1) {
                                          init.splice(index, 1);
                                          setSubjectIds(init);
                                        } else {
                                          init.push(e.target.value);
                                          setSubjectIds(init);
                                        }
                                      }}
                                    />
                                    <label for={i._id}>
                                      {i.mainSubjectId.name}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      ) : null}
                    </>
                  ) : null}
                  {/* for school */}
                  {role === "607ededa2712163504210684" ? (
                    <>
                      <select
                        class="form-select form-select-lg mb-3"
                        aria-label=".form-select-lg example"
                        onChange={(e) => {
                          e.preventDefault();
                          setCourseId(e.target.value);
                          setNewClassContent(null);

                          const cc = school.schoolClassesData.find(
                            (i) => i.courseId === e.target.value
                          );
                          unselectAll();
                          setClassToPayFor(cc);
                          dispatch(getCourseSubjects(e.target.value));
                          setSubjectIds([]);
                        }}
                      >
                        <option selected disabled>
                          Select Class
                        </option>
                        {courseList()}
                      </select>
                      {courseId && courseId != 1 && (
                        <>
                          {subjectsForSignUp.length > 0 && (
                            <div>
                              <label>Select Multiple Subjects</label>
                              <div class="checkbox-box form-control">
                                {subjectsForSignUp.map((i, index) => (
                                  <div
                                    key={index}
                                    className="checkbox-box-item"
                                  >
                                    <input
                                      type="checkbox"
                                      id={i._id}
                                      name="vehicle1"
                                      value={i._id}
                                      defaultChecked={subjectIds.includes(
                                        i._id
                                      )}
                                      onChange={(e) => {
                                        const init = subjectIds;
                                        const index = init.findIndex(
                                          (i) => i === e.target.value
                                        );
                                        if (index !== -1) {
                                          init.splice(index, 1);
                                          setSubjectIds(init);
                                        } else {
                                          init.push(e.target.value);
                                          setSubjectIds(init);
                                        }
                                      }}
                                    />
                                    <label for={i._id}>
                                      {i.mainSubjectId.name}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  ) : null}

                  {/* parent section */}
                  {role === "606ed82e70f40e18e029165e" && (
                    <h3>Step 1: Subscription For</h3>
                  )}
                  {role === "606ed82e70f40e18e029165e" && (
                    <div>
                      <select
                        class="form-select form-select-lg mb-4"
                        aria-label=".form-select-lg example"
                        onChange={(e) => {
                          e.preventDefault();
                          setChildId(e.target.value);
                        }}
                      >
                        <option selected>Select Child</option>
                        {childrenList()}
                      </select>
                      <select
                        class="form-select form-select-lg mb-3"
                        aria-label=".form-select-lg example"
                        onChange={(e) => {
                          e.preventDefault();
                          setCourseId(e.target.value);
                        }}
                      >
                        <option selected>Select Class</option>
                        {childCoursesList()}
                      </select>
                    </div>
                  )}

                  <h3>
                    {!parsed.courseId && "Step 2: "}Select Subscription Length
                  </h3>
                  <div className="row">
                    {paymentPlansToShow.map((paymentPlan) => {
                      if (paymentPlan.duration > 0) {
                        return (
                          <div className="col-6 col-md-3" key={paymentPlan._id}>
                            <SubscriptionBox
                              onClick={() => {
                                props.inputChange(
                                  "paymentAmount",
                                  paymentPlan.amount
                                );
                                props.inputChange(
                                  "paymentPlanId",
                                  paymentPlan._id
                                );
                                setBB(paymentPlan.amount);
                                setSelected(paymentPlan._id);
                                // setSelected()
                              }}
                              selected={selected}
                              id={paymentPlan._id}
                              title={paymentPlan.name}
                              price={paymentPlan.amount}
                              classname={paymentPlan.name
                                .toLocaleLowerCase()
                                .trim()}
                              newClass
                            />
                          </div>
                        );
                      }
                    })}
                  </div>
                </Container>
              </div>

              <div className="proceed-button">
                <Container>
                  <Row>
                    <Col>
                      <button
                        // disabled={paymentAmount === 0 ? true : false}
                        onClick={checkAndMakePayment}
                      >
                        Proceed with Card &rarr;
                      </button>
                    </Col>
                    <Col className="whiteButton">
                      <button
                        // disabled={paymentAmount === 0 ? true : false}
                        onClick={checkAndMakePayment.bind(null, true)}
                      >
                        Bank Transfer &rarr;
                      </button>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggle} className="paymentModalClass">
        {/* <ModalHeader toggle={toggle}>&nbsp;</ModalHeader> */}
        <ModalBody>
          <h4>Bank Deposit</h4>
          <img
            src={require("../../../assets/img/Group 1832.png")}
            className="threeImg"
          />
          <p>Make deposit using the bank details below:</p>
          <div className="row push1">
            <div className="col-md-4">Bank Name:</div>
            <div className="col-md-8">GTBank</div>
          </div>
          <div className="row push1">
            <div className="col-md-4">Account Name:</div>
            <div className="col-md-8">Afrilearn International</div>
          </div>
          <div className="row push1">
            <div className="col-md-4">Account Number:</div>
            <div className="col-md-8">0538617241</div>
          </div>
          <div className="row push1">
            <div className="col-md-4">Amount to be Paid:</div>
            <div className="col-md-8">
              <span className="amountBox">
                N{paymentAmount ? numberWithCommas(paymentAmount) : 0}
              </span>
            </div>
          </div>
          <p>
            Send proof of payment to hello@myafrilearn.com or Whatsapp +234 805
            154 4949{" "}
          </p>
          <p>
            Your subscription will be automatically approved ones payment is
            confirmed.
          </p>
          <div className="row">
            <div className="col-md-4"> </div>
            <div className="col-md-4">
              <span className="submitButton">
                <Link onClick={toggle1}>Okay, Got it!</Link>
              </span>
            </div>
            <div className="col-md-4"> </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

Payment.propTypes = {
  paymentPlans: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired,
  getRoles: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  getMembersInClass: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  teacherPaymentPlans: state.payment.teacherPaymentPlans,
  categories: state.payment.paymentPlans,
  paymentPlanId: state.payment.paymentPlanId,
  paymentAmount: state.payment.paymentAmount,
  userId: state.auth.userId,
  activeEnrolledCourseId: state.auth.activeEnrolledCourseId,
  email: state.auth.email,
  courses: state.auth.classes,
  children: state.parent.children,
  role: state.auth.role,
  error: state.error,
  user: state.auth.user,
  classMembersPayment: state.class.classMembersPayment,
});

export default connect(mapStateToProps, {
  paymentPlans,
  inputChange,
  verifyPayStackPayment,
  getRoles,
  getChildren,
  clearErrors,
  getMembersInClass,
})(Payment);
