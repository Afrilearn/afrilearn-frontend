import React from "react";
import "./css/style.css";
import subcircle from "../../../assets/img/subcircle.png";

const SubscriptionBox = (props) => {
  return (
    <div className="subscriptionBox" onClick={() => props.onClick()}>
      <div className={"item " + props.classname} id={props.price}>
        <div className="top">
          <h4>{props.title}</h4>
          <img src={subcircle} alt="subcircle" />
        </div>
        <small>₦{props.price}</small>
      </div>
    </div>
  );
};

export default SubscriptionBox;
