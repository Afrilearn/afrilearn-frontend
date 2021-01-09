import React, { useEffect, useRef, useState } from "react";
import "./css/style.css";
import dots from "../../../assets/img/dots.png";
import user from "../../../assets/img/user.png";
import usertwo from "../../../assets/img/usertwo.png";
import event from "../../../assets/img/event.png";
import man from "../../../assets/img/man.png";
import woman from "../../../assets/img/woman.png";
import sendicon from "../../../assets/img/sendicon.png";
import addstudent from "../../../assets/img/addstudent.png";
import { connect } from "react-redux";
import { inputChange } from "../../../redux/actions/authActions";
import PropTypes from "prop-types";
import Box from "./../../includes/subjectBadgeForSlick/subjectBox.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Popover, PopoverBody, Modal, ModalBody } from "reactstrap";

const ClassroomTeacher = (props) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      window.scrollTo(0, 0);
    } else {
      // do componentDidUpdate logic
    }
  });
  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={toggleModal}
        className="addStudentItemPopUp"
      >
        <ModalBody>
          <div class="popup-body">
            <FontAwesomeIcon
              icon={faTimes}
              style={{ position: "absolute", top: "5px", right: "10px" }}
              onClick={toggleModal}
            />
            <h4>Add students to your classroom</h4>
            <img src={addstudent} alt="mail" />
            <label for="username" class="form-label">
              Invite via email
            </label>
            <div class="input-group mb-3" id="username">
              <input
                type="text"
                class="form-control"
                placeholder="enail address"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              <button class="btn c-green-bg" type="button" id="button-addon2">
                Send Invite
              </button>
            </div>
            <label for="copyLink" class="form-label ">
              Copy link
            </label>
            <input
              type="text"
              id="copyLink"
              class="form-control"
              aria-describedby="copyLinkText"
              placeholder="thurieo/js1/uriouti/5768"
            />
            <small id="copyLinkText" class="form-text text-right c-green">
              Copy link
            </small>
          </div>
        </ModalBody>
      </Modal>
      <div id="classroomTeacherSectionOne"></div>
      <div id="classroomTeacherSectionTwo">
        <img src={man} className="image" alt="user" />
        <div className="welcome">
          <h1 className="font2">Welcome Abraham</h1>
          <p>
            <b>JSS One</b>
          </p>
          <small>Class code MxH8902</small>
        </div>
        <div className="text">
          <FontAwesomeIcon
            icon={faLink}
            style={{ fontSize: "20px", marginRight: "10px" }}
          />
          <span>
            <u>Copy Class Link</u>
          </span>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Popover
            placement="bottom"
            isOpen={popoverOpen}
            target="Popover1"
            toggle={toggle}
          >
            <PopoverBody>Add student to classroom</PopoverBody>
          </Popover>
          <span
            className="btn btn-success"
            id="Popover1"
            onMouseOver={() => setPopoverOpen("true")}
            onMouseLeave={toggle}
            onClick={toggleModal}
          >
            <FontAwesomeIcon icon={faPlus} />
          </span>
        </div>

        <div className="content-section">
          <div id="classes" className="container-fluid relative subjects">
            <h4>My Subjects</h4>
            <div className="row">
              <Box
                image={require("../../../assets/img/maths.png")}
                singleClass={true}
                dashboard={true}
              />
              <Box
                image={require("../../../assets/img/english.png")}
                singleClass={true}
                dashboard={true}
              />
              <Box
                image={require("../../../assets/img/health.png")}
                singleClass={true}
                dashboard={true}
              />
              <Box
                image={require("../../../assets/img/science.png")}
                singleClass={true}
                dashboard={true}
              />
              <Box
                image={require("../../../assets/img/Civic.png")}
                singleClass={true}
                dashboard={true}
              />
              <Box
                image={require("../../../assets/img/science.png")}
                singleClass={true}
                dashboard={true}
              />
              <Box
                image={require("../../../assets/img/health_two.png")}
                singleClass={true}
                dashboard={true}
              />
              <Box
                image={require("../../../assets/img/english_two.png")}
                singleClass={true}
                dashboard={true}
              />
              <Box
                image={require("../../../assets/img/health.png")}
                singleClass={true}
                dashboard={true}
              />
              <Box
                image={require("../../../assets/img/Civic.png")}
                singleClass={true}
                dashboard={true}
              />             
              <Box
                image={require("../../../assets/img/health_two.png")}
                singleClass={true}
                dashboard={true}
              />
               <Box
                image={require("../../../assets/img/health_two.png")}
                singleClass={true}
                dashboard={true}
              />
              <Box
                image={require("../../../assets/img/english_two.png")}
                singleClass={true}
                dashboard={true}
              />
            </div>
          </div>
          <div className="announcements ">
            <main>
              <article>
                <div className="pic-text-heading">
                  <img src={man} alt="announce" />
                  <div>
                    <p>Announcements from teacher</p>
                  </div>
                </div>
              </article>
              <section>
                <div className="chat-block">
                  <div className="sender">
                    <div className="sender-head">
                      <div className="pic-text-heading">
                        <img src={man} alt="sender" />
                        <div>
                          <p>Mr Abraham O.(Teacher) </p>
                          <small className="small-grey">06 Sept 2020</small>
                        </div>
                      </div>
                      <img src={dots} alt="see-more" />
                    </div>
                    <p className="sender-message">
                      Huloo! <br />
                      Well done to those that were able to complete the video
                      lessons for this week.
                      <br />
                      <br />
                      Cheers!
                    </p>
                  </div>
                  <div className="comments">
                    <small>1 class comment</small>
                    <div className="pic-text-heading">
                      <img src={man} alt="comment" />
                      <div>
                        <p>
                          Mr Abraham O.(Teacher) &nbsp;
                          <span className="small-grey">06 Sept 2020</span>
                        </p>
                        <p>
                          Course to be read for second week will be shared soon
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="send">
                    <img src={woman} alt="sender" />
                    <div className="send-input">
                      <input />
                      <img src={sendicon} alt="send" />
                    </div>
                  </div>
                </div>
                <div className="notification-block">
                  <div className="pic-text-heading">
                    <img src={event} alt="event" />
                    <div>
                      <p>
                        Mr Abraham O.(Teacher) posted a new study link: Hello
                        everyone, here is the video ...
                      </p>
                      <p>
                        <small className="small-grey">03 Sept 2020</small>
                      </p>
                    </div>
                  </div>
                  <img src={dots} alt="see-more" />
                </div>
                <div className="chat-block">
                  <div className="sender">
                    <div className="sender-head">
                      <div className="pic-text-heading">
                        <img src={man} alt="sender" />
                        <div>
                          <p>Mr Abraham O.(Teacher) </p>
                          <small className="small-grey">02 Sept 2020</small>
                        </div>
                      </div>
                      <img src={dots} alt="see-more" />
                    </div>
                    <p className="sender-message">
                      Hello Everyone, Congratulations for successfully joining
                      Class MxH8902 . This is a class for JSS One student. Feel
                      free to ask questions and answers shall be provided
                      accordingly
                      <br />
                      <br />
                      Cheers!
                    </p>
                  </div>
                  <div className="comments">
                    <small>5 class comments</small>
                    <div className="pic-text-heading">
                      <img src={user} alt="user" />
                      <div>
                        <p>
                          Alli Olatunbosun &nbsp;
                          <span className="small-grey">06 Sept 2020</span>
                        </p>
                        <p>Thank you sir</p>
                      </div>
                    </div>
                    <div className="pic-text-heading">
                      <img src={usertwo} alt="user" />
                      <div>
                        <p>
                          John Muhammed &nbsp;
                          <span className="small-grey">06 Sept 2020</span>
                        </p>
                        <p>okay</p>
                      </div>
                    </div>
                    <div className="pic-text-heading">
                      <img src={user} alt="user" />
                      <div>
                        <p>
                          Victoria Johnson &nbsp;
                          <span className="small-grey">06 Sept 2020</span>
                        </p>
                        <p>Nice. Thank you sir!</p>
                      </div>
                    </div>
                  </div>
                  <div className="send">
                    <img src={woman} alt="sender" />
                    <div className="send-input">
                      <input />
                      <img src={sendicon} alt="send" />
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

ClassroomTeacher.propTypes = {
  inputChange: PropTypes.func.isRequired,
};

export default connect(null, { inputChange })(ClassroomTeacher);
