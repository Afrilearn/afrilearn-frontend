import React from "react";
import "./css/style.css";
import subcircle from "../../../assets/img/subcircle.png";

const SubscriptionBox = (props) => {
  return (
    <div id="subscriptionBox">
      <div className={"item " + props.classname}>
        <div className="top">
          <span>{props.title}</span>
          <img src={subcircle} alt='subcircle' />
        </div>
        <small>₦{props.price}</small>
      </div>
    </div>
  );
};

export default SubscriptionBox;
