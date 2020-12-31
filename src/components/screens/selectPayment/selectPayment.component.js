import React, { useEffect, useState } from "react";
import "./css/style.css";
import { Container, Row, Col } from "reactstrap";
import cc from "../../../assets/img/cc.png";
import bankicon from "../../../assets/img/bankicon.png";
import { Link } from "react-router-dom";
import SubscriptionBox from "../../includes/subscriptionBox/subscriptionBox.component";

const Payment = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const [payType, setPayType] = useState("pay-in-bank");
  const handlePayType = (selectedType, classname) => {
    const items = document.querySelectorAll(".pay-methods .item");
    const item = document.querySelector("." + classname);
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      item.classList.remove("active");
    }
    item.classList.add("active");
    setPayType(selectedType);
  };
  return (
    <div id="selectPaymentPageSectionOne">
      <div className="sub-lenght">
        <h4>Step 1: Select Subscription Length</h4>
        <Container>
          <div className="row">
            <div className="col-6 col-md-3">
              <SubscriptionBox title="Montly" price="500" classname="monthly" />
            </div>
            <div className="col-6 col-md-3">
              <SubscriptionBox
                title="Quarterly"
                price="1500"
                classname="quaterly"
              />
            </div>
            <div className="col-6 col-md-3">
              <SubscriptionBox
                title="Bi- Annual"
                price="3000"
                classname="bi-annual"
              />
            </div>
            <div className="col-6 col-md-3">
              <SubscriptionBox title="Yearly" price="6000" classname="yearly" />
            </div>
          </div>
        </Container>
      </div>
      <div className="pay-methods">
        <h4>Step 2: Select Payment Method</h4>
        <Container>
          <Row>
            <Col>
              <div
                className="item deposit"
                onClick={() => handlePayType("pay-in-bank", "deposit")}
              >
                <img src={bankicon} alt="bankicon" />
                <span>Bank Deposit</span>
              </div>
            </Col>
            <Col>
              <div
                className="item card-pay"
                onClick={() => handlePayType("pay-with-card", "card-pay")}
              >
                <img src={cc} alt="cc" />
                <span>Debit/Credit Card</span>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="proceed-button">
        <Container>
          <Row>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col>
              <Link to={`/${payType}`}>
                <button>Proceed &rarr;</button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Payment;
