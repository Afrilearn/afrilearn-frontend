import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, Tooltip } from "reactstrap";
import Info from "../../../assets/img/Info.svg";
import ThumbUp from "../../../assets/img/thumbs.gif";
import paymentIcon from "../../../assets/img/lockIcon.svg";

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
      <ModalBody className="bg-white">
        <div className="container">
          <div className="p-3 center paymentBox">
            <img className="mb-2" src={paymentIcon} />
            <h3 className="my-2">
              You need to subscribe to access this content!
            </h3>
            <h5 className="my-2">
              Subscribe now to unlock all videos, class notes, tests & more in
              this class
            </h5>
            <Link to={actionLink}>Subscribe Now</Link>
            <Link
              className="activeButton"
              onClick={(e) => {
                e.preventDefault();
                toggle();
              }}
            >
              Subscribe Later
            </Link>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default TakeActionPopUp;
