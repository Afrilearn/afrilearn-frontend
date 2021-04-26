import React, { Component } from "react";
import "./css/style.css";

import { ReactComponent as Times } from "../../../assets/img/Times.svg";

class Modal extends Component {
  updateModal = (val) => {
    this.props.modal(val);
  };

  render() {
    const { activator, children, show } = this.props;
    return (
      <div id="modal">
        <div className={`modal-overlay ${!show ? "m-hidden" : ""}`}>
          <div
            style={{
              maxWidth: this.props.maxWidth
            }}
            id={this.props.id}
            className={`content pl-5 pr-5`}
          >
            <div style={{ position: "sticky", top: "0px", textAlign: "right" }}>
              {!this.props.removeCloseBtn &&
                <button
                  type="button"
                  id="close-button"
                  onClick={() => {
                    this.props.onClose();
                  }}
                >
                  <Times style={{
                    minWidth: '1em',
                    maxWidth: '1em'
                  }} />
                </button>
              }
            </div>
            <div style={{ marginTop: "-32px" }}>{children}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
