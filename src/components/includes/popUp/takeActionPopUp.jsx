import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, Tooltip } from "reactstrap";
import Info from "../../../assets/img/Info.svg";
import ThumbUp from "../../../assets/img/thumbs.gif";

import "./css/style.css";

const TakeActionPopUp = ({
  modal,
  toggle,
  headingText,
  subText,
  smallText,
  closeText = "Cancel",
  actionText,
  actionLink,
  showActionButton,
  showCloseButton = true,
}) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalBody className="take-action-pop-up">
        <FontAwesomeIcon
          className="close-take-action-pop-up"
          icon={faTimes}
          onClick={toggle}
        />
        <img src={Info} alt="" />
        <h3>{headingText}</h3>
        <p>{subText}</p>
        <span>{smallText}</span>
        {showCloseButton && (
          <button className="cancel-button" onClick={toggle}>
            {closeText}
          </button>
        )}{" "}
        {showActionButton && (
          <Link to={actionLink}>
            <button>{actionText}</button>
          </Link>
        )}
      </ModalBody>
    </Modal>
  );
};

export default TakeActionPopUp;
