import React, { useEffect, useRef, useState } from "react";
// import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { usePaystackPayment } from "react-paystack";
import "./css/style.css";
import { Container, Row, Col, Modal, ModalHeader, ModalBody  } from "reactstrap";
import SubscriptionBox from "../../includes/subscriptionBox/subscriptionBox.component";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  paymentPlans,
  inputChange,
  verifyPayStackPayment,
} from "./../../../redux/actions/paymentActions";
import { Link } from "react-router-dom";
import { getChildren } from "../../../redux/actions/parentActions";
import { getMembersInClass } from "./../../../redux/actions/classActions";
import { getRoles } from "./../../../redux/actions/authActions";
import { getSchoolProfile } from "./../../../redux/actions/schoolActions";
import { clearErrors } from "./../../../redux/actions/errorActions";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import queryString from "query-string";

const Payment = (props) => {
  const parsed = queryString.parse(props.location.search);
  const mounted = useRef();

  const dispatch = useDispatch();
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
  } = props;

  const [selected, setSelected] = useState(null);
  const [childCourses, setchildCourses] = useState([]);
  const [childId, setChildId] = useState("");

  const [courseId, setCourseId] = useState(null);
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
        return <option value={course._id}>{course.name}</option>;
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
        return <option value={course.courseId}>{course.className}</option>;
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
    {
      __v: 1,
      _id: new Date().toString(),
      classCode: "0v000",
      courseId: "2",
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
      name: "Pay for Student",
      updatedAt: "2021-04-16T07:30:43.040Z",
      userId: "60793d2258cbbb0015f28f1d",
    },
  ];

  const classList = () => {
    if (user.classOwnership) {
      if (user.classOwnership.length) {
        return user.classOwnership.map((teacherClass, index) => {
          return (
            <option value={teacherClass.courseId} className={teacherClass.id}>
              {teacherClass.name}
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
  // console.log(classMembersPayment)
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      window.scrollTo(0, 0);
      props.paymentPlans();
      props.getRoles();
      user.classOwnership.push(newClass);
      if (role === "607ededa2712163504210684") {
        dispatch(getSchoolProfile(user.schoolId && user.schoolId._id));
      }
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
    amount: paymentAmount * 100,   
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
      }     
    });
  }

  const initializePayment = usePaystackPayment(config);

  const checkAndMakePayment = (bankPayment=false) => {   
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
      courseId != 1 &&
      !receipientOption &&
      !newClassContent
    ) {
      Swal.fire({
        html: "Please select recipient",
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
    } else if (
      role === "602f3ce39b146b3201c2dc1d" &&
      courseId != 1 &&
      receipientOption == 2 &&
      !selectedStudent
    ) {
      Swal.fire({
        html: "Please select a student to make payment for",
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
    } else if (!paymentAmount) {
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
      if(bankPayment === true){
        toggle()
      }else{
        initializePayment(onSuccess, onClose);
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
    };

    if (nameOfClass) {
      data["newClassName"] = nameOfClass;
    }
    console.log(data);
    props.verifyPayStackPayment(data);
  };

  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };
  return (
    <>
    <div id="selectPaymentPageSectionOne">
      <div class="container">
        <div class="row">
          <div class="col-md-5">
            <div className="box">
              <h3>Unlock Unlimited Access!</h3>
              <p className="one">Video & Audio Lessons</p>
              <p className="two">Rich & Ready Class Notes</p>
              <p className="three">Practice Quizzes & Solutions</p>
              <p className="four">Gain Mastery with Storytelling</p>
              <p className="one">Learn on Any Device, Anytime, Anywhere</p>
              <p className="two">Achieve Academic Excellence</p>
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
                {role === "5fd08fba50964811309722d5" ||
                role === "607ededa2712163504210684" ? (
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
                      }}
                    >
                      <option selected>Select Class</option>
                      {classList()}
                    </select>
                    {courseId && courseId != 1 && !newClassContent ? (
                      <>
                        <select
                          class="form-select form-select-lg mb-3"
                          aria-label=".form-select-lg example"
                          onChange={(e) => {
                            e.preventDefault();
                            setReceipientOption(e.target.value);
                          }}
                        >
                          <option selected>Select Recipient</option>
                          {recipientList()}
                        </select>
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
                          }}
                        >
                          <option selected>Select Class Content</option>
                          {courseList()}
                        </select>
                      </>
                    ) : null}
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
                  {categories.map((paymentPlan) => (
                    <div className="col-6 col-md-3" key={paymentPlan._id}>
                      <SubscriptionBox
                        onClick={() => {
                          props.inputChange(
                            "paymentAmount",
                            paymentPlan.amount
                          );
                          props.inputChange("paymentPlanId", paymentPlan._id);
                          setBB(paymentPlan.amount);
                          setSelected(paymentPlan._id);
                          // setSelected()
                        }}
                        selected={selected}
                        id={paymentPlan._id}
                        title={paymentPlan.name}
                        price={paymentPlan.amount}
                        classname={paymentPlan.name.toLocaleLowerCase().trim()}
                        newClass
                      />
                    </div>
                  ))}
                </div>
              </Container>
            </div>

            <div className="proceed-button">
              <Container>
                <Row>
                  <Col className="whiteButton">
                    <button
                      // disabled={paymentAmount === 0 ? true : false}
                      onClick={checkAndMakePayment.bind(null,true)}
                    >
                      Bank Transfer &rarr;
                    </button>
                  </Col>
                  <Col>
                    <button
                      // disabled={paymentAmount === 0 ? true : false}
                      onClick={checkAndMakePayment}
                    >
                      Proceed with Card &rarr;
                    </button>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal isOpen={modal} toggle={toggle} className="trendingModalClass">
        {/* <ModalHeader toggle={toggle}>&nbsp;</ModalHeader> */}
        <ModalBody>
          <h4>Bank Deposit</h4>
          <img src={require('../../../assets/img/Group 1832.png')} className="threeImg"/>
          <p>Make deposit  using the bank details below:</p>
          <div className="row push1">
            <div className="col-md-4">
               Bank Name:
            </div>
            <div className="col-md-8">
               GTBank
            </div>
          </div>
          <div className="row push1">
            <div className="col-md-4">
               Account Name:
            </div>
            <div className="col-md-8">
              Afrilearn International
            </div>
          </div>
          <div className="row push1">
            <div className="col-md-4">
              Account Number:       
            </div>
            <div className="col-md-8">
              00928485993
            </div>
          </div>
          <div className="row push1">
            <div className="col-md-4">
              Amount to be Paid:       
            </div>
            <div className="col-md-8">            
              <span className="amountBox">N{paymentAmount? numberWithCommas(paymentAmount):0 }</span>
            </div>
          </div>
          <p>Send proof of payment to hello@myafrilearn.com or Whatsapp  +234 805 154 4949 or + 234 802 785 5262 </p> 
          <p>Your subscription will be automatically approved ones payment is confirmed.</p>
          <div className="row">
            <div className="col-md-4">  </div>
            <div className="col-md-4">
              <span className="submitButton"><Link onClick={toggle1}>Okay, Got it!</Link></span>
            </div>
            <div className="col-md-4">  </div>
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
