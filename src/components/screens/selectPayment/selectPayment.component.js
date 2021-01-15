import React, { useEffect, useRef } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import "./css/style.css";
import { Container, Row, Col } from "reactstrap";
import SubscriptionBox from "../../includes/subscriptionBox/subscriptionBox.component";
import { connect } from 'react-redux';
import { paymentPlans, inputChange, createTransaction } from './../../../redux/actions/paymentActions';
import PropTypes from 'prop-types';

const Payment = props => {
  const mounted = useRef();

  const { 
    categories,
    paymentPlanId,
    paymentAmount,
    userId,
    activeEnrolledCourseId,
    email
   } = props;

  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      window.scrollTo(0, 0);
      props.paymentPlans()
    } else {
      // do componentDidUpdate logic
    }
  });

  /*flutterwave settings*/
  const config = {
    public_key: "FLWPUBK-eebfdb05b05f2db521a8b0c9043bf248-X",
    tx_ref: Date.now()+userId,
    amount: 5,
    // amount: paymentAmount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email   
    },
    customizations: {
      title: "Subscribe to Class",
      description: "Payment for class Access",
      logo: "https://afrilearn.s3.amazonaws.com/logo.png",
    },
    // redirect_url:'/dashboard'
  };
  const handleFlutterPayment = useFlutterwave(config);

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

  const initializePayment = () => {
    //initialize flutterwave payment
    handleFlutterPayment({
      callback: (response) => {
        const data = {
          tx_ref: response.tx_ref,
          userId,
          enrolledCourseId:activeEnrolledCourseId,
          paymentPlanId,
          amount:paymentAmount
        }      
        console.log('am here')
        props.createTransaction(data)
        closePaymentModal(); // this will close the modal programmatically
      },
      onClose: () => {},
    });
  };
  return (
    <div id="selectPaymentPageSectionOne">
      <div className="sub-lenght">
        <h3> Select Subscription Length</h3>
        <Container>
          <div className="row">
            {categories.map((paymentPlan) => (
              <div className="col-6 col-md-3" key={paymentPlan._id}>
                <SubscriptionBox
                  onClick={() => {
                    props.inputChange('paymentAmount', paymentPlan.amount)
                    props.inputChange('paymentPlanId', paymentPlan._id)                  
                    setBB(paymentPlan.amount);
                  }}
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
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col>
              <button
                disabled={paymentAmount === 0 ? true : false}
                onClick={initializePayment}
              >
                Proceed &rarr;
              </button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

Payment.propTypes = {
  paymentPlans: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  categories: state.payment.paymentPlans,
  paymentPlanId: state.payment.paymentPlanId,
  paymentAmount: state.payment.paymentAmount,
  userId: state.auth.userId,
  activeEnrolledCourseId: state.auth.activeEnrolledCourseId,
  email: state.auth.email
});

export default connect(mapStateToProps, { paymentPlans, inputChange, createTransaction })(Payment);

