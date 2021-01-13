import React, { useEffect, useRef, useState } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import "./css/style.css";
import { Container, Row, Col } from "reactstrap";
// import cc from "../../../assets/img/cc.png";
// import bankicon from "../../../assets/img/bankicon.png";
import SubscriptionBox from "../../includes/subscriptionBox/subscriptionBox.component";

const Payment = () => {
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      window.scrollTo(0, 0);
    } else {
      // do componentDidUpdate logic
    }
  });
  const [paymentDetails, setPaymentDetails] = useState({
    amount: 0,
  });
  const [paymentPlans] = useState([
    {
      _id: "5fc90039d4c5950e84f72ab0",
      name: "Monthly",
      amount: 500,
      createdAt: "2020-12-03T15:11:53.649Z",
      updatedAt: "2020-12-03T15:11:53.649Z",
      __v: 0,
    },
    {
      _id: "5ffe8f34de0bdb47f826fe9f",
      name: "Quarterly",
      amount: 1500,
      createdAt: "2020-12-03T15:11:53.649Z",
      updatedAt: "2020-12-03T15:11:53.649Z",
      __v: 0,
    },
    {
      _id: "5ffe8f5bde0bdb47f826fea0",
      name: "Bi-Annual",
      amount: 3000,
      createdAt: "2020-12-03T15:11:53.649Z",
      updatedAt: "2020-12-03T15:11:53.649Z",
      __v: 0,
    },
    {
      _id: "5ffe8f7dde0bdb47f826fea1",
      name: "Yearly",
      amount: 6000,
      createdAt: "2020-12-03T15:11:53.649Z",
      updatedAt: "2020-12-03T15:11:53.649Z",
      __v: 0,
    },
  ]);

  /*flutterwave settings*/

  const config = {
    public_key: "FLWPUBK_TEST-5120f20f66db336ffc0f6131bcc49936-X",
    tx_ref: Date.now(),
    amount: paymentDetails.amount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: "user@gmail.com",
      phonenumber: "07064586146",
      name: "joel ugwumadu",
      id: paymentDetails._id,
    },
    customizations: {
      title: "Subscribe to Class",
      description: "Payment for class Access",
      logo: "https://afrilearn.s3.amazonaws.com/logo.png",
    },
  };
  const handleFlutterPayment = useFlutterwave(config);

  /*flutterwave settings*/

  /*Pay in the bank*/

  // const [payType, setPayType] = useState("pay-in-bank");
  // const handlePayType = (selectedType, classname) => {
  //   const items = document.querySelectorAll(".pay-methods .item");
  //   const item = document.querySelector("." + classname);
  //   for (let index = 0; index < items.length; index++) {
  //     const item = items[index];
  //     item.classList.remove("active");
  //   }
  //   item.classList.add("active");
  //   setPayType(selectedType);
  // };

  /*Pay in the bank*/

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
        console.log(response);
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
            {paymentPlans.map((paymentPlan) => (
              <div className="col-6 col-md-3" key={paymentPlan._id}>
                <SubscriptionBox
                  onClick={() => {
                    setPaymentDetails({
                      amount: paymentPlan.amount,
                      _id: paymentPlan._id,
                    });
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
      {/* <div className="pay-methods">
        <h4>Step 2: Select Payment Method</h4>
        <Container>
          <Row> 
            <Col>
              <div
                className="item deposit"
                onClick={() => handlePayType("pay-in-bank", "deposit")}
              >
                <img src={bankicon} alt="bankicon" />
                <h4>Bank Deposit</h4>
              </div>
            </Col>
            <Col>
              <div
                className="item card-pay"
                onClick={() => handlePayType("pay-with-card", "card-pay")}
              >
                <img src={cc} alt="cc" />
                <h4>Debit/Credit Card</h4>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      */}
      <div className="proceed-button">
        <Container>
          <Row>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col>
              <button
                disabled={paymentDetails.amount === 0 ? true : false}
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

export default Payment;

/*

amount: 6000
currency: "NGN"
customer: {name: "joel ugwumadu", email: "user@gmail.com", phone_number: undefined}
flw_ref: "FLW-MOCK-11109f20474d0edd077436f15fe9f700"
status: "successful"
transaction_id: 1834663
tx_ref: 1610516024458

*/
