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
import { addClass } from "./../../../redux/actions/classActions";
import { getRoles } from "./../../../redux/actions/authActions";
import { clearErrors } from "./../../../redux/actions/errorActions";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import queryString from "query-string";

const Payment = (props) => {
  const parsed = queryString.parse(props.location.search);
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
      // if (!courses) {
      props.getRoles();
      // }
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

  const [courseId, setCourseId] = useState(null);
  const [nameOfClass, setNameOfClass] = useState(null);

  //paystack settings
  const config = {
    reference: new Date().getTime(),
    email,
    // amount: paymentAmount * 100,
    amount: 2 * 100,
    publicKey: "pk_live_a9c31ffce1eca1674882580da27446be439723bf",
    channels: ["card"],
  };

  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    const data = {
      tx_ref: reference.reference,
      userId,
      enrolledCourseId: activeEnrolledCourseId,
      courseId: courseId || parsed.courseId,
      paymentPlanId,
      amount: paymentAmount,
      status: "paid",
    };

    props.createTransaction(data);
    if (role && role === "602f3ce39b146b3201c2dc1d") {
      props.addClass(courseId, nameOfClass);
    }
    if (role && role === "602f3ce39b146b3201c2dc1d") {
      window.location = "/classes/teacher";
    } else {
      window.location = "/dashboard";
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
    } else if (!courseId && !parsed.courseId) {
      Swal.fire({
        html: "Select a class",
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
      role &&
      role === "602f3ce39b146b3201c2dc1d" &&
      !parsed.courseId &&
      !nameOfClass
    ) {
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
                {!parsed.courseId && <h3>Step 1: Select Class </h3>}
                {!parsed.courseId && (
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
                  {role &&
                    role === "602f3ce39b146b3201c2dc1d" &&
                    !parsed.courseId && (
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
  courses: state.auth.classes,
  role: state.auth.role,
  error: state.error,
});

export default connect(mapStateToProps, {
  paymentPlans,
  inputChange,
  createTransaction,
  getRoles,
  addClass,
  clearErrors,
})(Payment);
