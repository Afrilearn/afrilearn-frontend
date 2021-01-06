import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./css/style.css";
import trash from "../../../assets/img/trash.png";

const StudentListItem = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  return (
    <React.Fragment>
      <Modal isOpen={modal} toggle={toggle} className="studentItemPopUp">
        <ModalBody>
          <div class="popup-body">
            <FontAwesomeIcon
              icon={faTimes}
              style={{ position: "absolute", top: "5px", right: "10px" }}
              onClick={toggle}
            />
            <h4>Remove Alli Olatunbosun from your classroom</h4>
            <img src={trash} alt="trash" />
            <div class="call-to-action">
              <span>Confirm</span>
              <button onClick={toggle}>Cancel</button>
            </div>
          </div>
        </ModalBody>
      </Modal>
      <div id="studentListItem">
        <div className="row main-row">
          <div className="col-4 col-sm-6">
            <div className="row">
              <div className="col-1">
                <img src={props.image} alt="user" />
              </div>
              <div className="col-8 text-left username">{props.username}</div>
            </div>
          </div>
          <div className="col-4  col-sm-3 text-center middle-txt">
            View Performance
          </div>
          <div
            className="col-4 col-sm-3 text-right remove-link"
            onClick={toggle}
          >
            Remove
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default StudentListItem;
