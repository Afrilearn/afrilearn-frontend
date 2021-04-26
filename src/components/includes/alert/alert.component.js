import React from "react";
import { ReactComponent as Times } from "../../../assets/img/Times.svg";
import './css/style.css'

const Alert = (props) => {
  return (
    <div
      id="alert"
      style={{ ...props.style }}
      className={`${props.className} ${props.type || "success"}`}
    >
      <div dangerouslySetInnerHTML={{ __html: props.message }}></div>
      {props.action}
      <button
        onClick={() => {
          props.onClose();
        }}
      >
        <Times style={{ width: 15 }} />
      </button>
    </div>
  );
};

export default Alert;
