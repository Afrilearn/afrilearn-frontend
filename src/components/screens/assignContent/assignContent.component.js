import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import event from "../../../assets/img/event.png";
import "./css/style.css";

const assignContent = () => {
  return (
    <div id="assignContentPage">
      <div id="assignContentPageSectionOne">
        <h1 className="font2 text-bottom">Assign Study Content</h1>
        <h4 className="font2">Basic Technology</h4>
      </div>
      <div id="assignContentPageSectionTwo">
        <div class="container-fluid"> 
          <div className="row">
            <div className="col-md-6">
              <div className="input-textarea">
                <div className="row">
                  <div className="col-1">
                    <img src={event} alt="input" />
                  </div>
                  <div className="col-11">
                    <textarea rows="12" placeholder="Input study description" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="attachment">
                <div className="row">
                  <div className="col-6 h5">Attachment</div>
                  <div className="col-6">
                    <FontAwesomeIcon icon={faPlus} style={{ float: "right" }} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-9 ">
                    <p>Geometrical Construction (2): Angles</p>
                    <small className="text-muted">Lesson 1</small>
                  </div>
                  <div className="col-3">
                    <FontAwesomeIcon
                      icon={faTimes}
                      style={{ float: "right", color: "#FF5B5B" }}
                    />
                  </div>
                </div>
              </div>
              <div className="date">
                <h3 className="text-white">Due Date</h3>
                <input type="date" />
              </div>
            </div>
          </div>
          <button>Done</button>
        </div>
      </div>
    </div>
  );
};

export default assignContent;
