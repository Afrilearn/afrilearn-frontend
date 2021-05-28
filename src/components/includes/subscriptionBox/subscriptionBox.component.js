import React from "react";
import "./css/style.css";
import subcircle from "../../../assets/img/subcircle.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const SubscriptionBox = (props) => {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <div className="subscriptionBox" onClick={() => props.onClick()}>
      <div className={"item " + props.classname} id={props.price}>
        {props.selected === props.id && (
          <FontAwesomeIcon
            icon={faCheckCircle}
            color="black"
            className={`checkOnClick ${props.price}`}
          />
        )}
        <div className="top">
          <h4>{props.title}</h4>
          <img src={subcircle} alt="subcircle" className="subcircle" />
        </div>
        <small>₦{numberWithCommas(props.price)}</small>
      </div>
    </div>
  );
};

export default SubscriptionBox;
