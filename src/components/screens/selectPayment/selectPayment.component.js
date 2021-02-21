import React, { useEffect, useRef, useState } from "react";
// import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { usePaystackPayment } from "react-paystack";
import "./css/style.css";
import { Container, Row, Col } from "reactstrap";
import SubscriptionBox from "../../includes/subscriptionBox/subscriptionBox.component";
import { connect } from "react-redux";
import {
  paymentPlans,
  inputChange,
  createTransaction,
} from "./../../../redux/actions/paymentActions";
import { getCourses } from "./../../../redux/actions/courseActions";
import { addClass } from "./../../../redux/actions/classActions";
import { getRoles } from "./../../../redux/actions/authActions";
import { clearErrors } from "./../../../redux/actions/errorActions";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const Payment = (props) => {
  const mounted = useRef();

  const {
    categories,
    paymentPlanId,
    paymentAmount,
    userId,
    activeEnrolledCourseId,
    email,
    courses,
    role,
    error,
  } = props;
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      window.scrollTo(0, 0);
      props.paymentPlans();
      props.getCourses();
    } else {
      // do componentDidUpdate logic
      if (error.id === "CREATE_PAYMENT_TRANSACTION_SUCCESS") {
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
          timer: 3500,
          // position: 'top-end',,
        });
        props.clearErrors();
      }
    }
  });

  /*flutterwave settings*/
  // const config = {
  //   public_key: "FLWPUBK-eebfdb05b05f2db521a8b0c9043bf248-X",
  //   tx_ref: Date.now() + userId,
  //   amount: 5,
  //   currency: "NGN",
  //   payment_options: "card,mobilemoney,ussd",
  //   customer: {
  //     email,
  //   },
  //   customizations: {
  //     title: "Subscribe to Course",
  //     description: "Payment for course Access",
  //     logo: "https://afrilearn.s3.amazonaws.com/logo.png",
  //   },
  //   redirect_url: "/dashboard",
  // };
  // const handleFlutterPayment = useFlutterwave(config);

  const setBB = (price) => {
    //change background onClick
    const all = document.querySelectorAll(".item");
    const target = document.getElementById(price);
    for (let index = 0; index < all.length; index++) {
      const element = all[index];
      element.classList.remove("active");
    }
    target.classList.add("active");
  };

  const [courseId, setCourseId] = useState(null);
  const [nameOfClass, setNameOfClass] = useState(null);

  // const initializePayment = () => {
  //   //initialize flutterwave payment
  //   handleFlutterPayment({
  //     callback: (response) => {
  //       const data = {
  //         tx_ref: response.tx_ref,
  //         userId,
  //         enrolledCourseId: activeEnrolledCourseId,
  //         courseId,
  //         paymentPlanId,
  //         amount: 5,
  //       };
  //       props.createTransaction(data);
  //       closePaymentModal(); // this will close the modal programmatically
  //     },
  //     onClose: () => {},
  //   });
  // };

  //paystack settings
  const config = {
    reference: new Date().getTime(),
    email,
    amount: 1 * 100,
    publicKey: "pk_live_4e4e4cab12e53739389f962da5d2d9e38468fba3",
  };

  // you can call this function anything
  const onSuccess = (reference) => { 
    // Implementation for whatever you want to do with reference and after success call.
    const data = {
      tx_ref: reference.reference,
      userId,
      enrolledCourseId: activeEnrolledCourseId,
      courseId,
      paymentPlanId,
      amount: paymentAmount,
    };
    console.log(reference);
    props.createTransaction(data);
    if (role && role === "602f3ce39b146b3201c2dc1d") {
      props.addClass(courseId, nameOfClass);
    }
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const initializePayment = usePaystackPayment(config);
  const courseList = () => {
    if (courses.length) {
      return courses.map((course, index) => {
        return <option value={course._id}>{course.name}</option>;
      });
    }
  };

  const checkAndMakePayment = () => {
    if (!paymentAmount) {
      Swal.fire({
        html: "Select amount to pay",
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
    } else if (!courseId) {
      Swal.fire({
        html: "Select a course",
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
    } else if (role && role === "602f3ce39b146b3201c2dc1d" && !nameOfClass) {
      Swal.fire({
        html: "Name of class cannnot be empty",
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
      initializePayment(onSuccess, onClose);
    }
  };

  return (
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
                <h3>Step 1: Select Class </h3>
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
                <h3>Step 2: Select Subscription Length</h3>
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
                  {role && role === "5fc8cc978e28fa50986ecac9" && (
                    <Col>
                      <input
                        className="form-control"
                        placeholder="Add class name"
                        onChange={(e) => {
                          setNameOfClass(e.target.value);
                        }}
                      />
                    </Col>
                  )}
                  <Col>
                    <button
                      disabled={paymentAmount === 0 ? true : false}
                      onClick={checkAndMakePayment}
                    >
                      Proceed &rarr;
                    </button>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Payment.propTypes = {
  paymentPlans: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired,
  getCourses: PropTypes.func.isRequired,
  getRoles: PropTypes.func.isRequired,
  addClass: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.payment.paymentPlans,
  paymentPlanId: state.payment.paymentPlanId,
  paymentAmount: state.payment.paymentAmount,
  userId: state.auth.userId,
  activeEnrolledCourseId: state.auth.activeEnrolledCourseId,
  email: state.auth.email,
  courses: state.course.courses,
  role: state.auth.role,
  error: state.error,
});

export default connect(mapStateToProps, {
  paymentPlans,
  inputChange,
  createTransaction,
  getCourses,
  getRoles,
  addClass,
  clearErrors,
})(Payment);
