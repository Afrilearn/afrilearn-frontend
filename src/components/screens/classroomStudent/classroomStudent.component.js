import React, { useEffect, useState } from "react";
import "./css/style.css";
import dots from "../../../assets/img/dots.png";
import user from "../../../assets/img/user.png";
import usertwo from "../../../assets/img/usertwo.png";
import event from "../../../assets/img/event.png";
import man from "../../../assets/img/man.png";
import woman from "../../../assets/img/woman.png";
import ellipse from "../../../assets/img/Ellipse.png";
import sendicon from "../../../assets/img/sendicon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDotCircle,
  faEnvelope,
  faMailBulk,
  faPlaneArrival,
} from "@fortawesome/free-solid-svg-icons";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";

const ClassroomStudent = (props) => {
  const [activeTab, setActiveTab] = useState("1");
  const [activeVerticalTab, setActiveVerticalTab] = useState("1");
  useEffect(() => {
    showTab("0");
  }, [activeVerticalTab]);
  const [classItems, setclassItems] = useState([
    { _id: 1, name: "Mathematics" },
    { _id: 2, name: "English Language" },
    { _id: 3, name: "Business Studies" },
    { _id: 4, name: "Business Studies" },
  ]);
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
    const items = document.querySelectorAll(".tab-nav-item");
    const item = document.querySelector(".tab-nav-item-" + tab);
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      item.style.borderBottom = "none";
    }
    item.style.borderBottom = "4px solid #26AA76";
  };

  const showTab = (tabNum) => {
    const tabLink = document.querySelector(".vertical-nav-" + tabNum);
    const tabLinks = document.querySelectorAll(".vertical-nav-item");
    for (let index = 0; index < tabLinks.length; index++) {
      const link = tabLinks[index];
      link.classList.remove("active");
    }
    tabLink.classList.add("active");
  };
  return (
    <div>
      <div id="classroomStudentSectionOne"></div>
      <div id="classroomStudentSectionTwo">
        <div class="circle">
          <img class="ellipse" src={ellipse}></img>
          <img class="woman" src={woman}></img>
        </div>
        <div className="tab">
          <Nav tabs>
            <NavItem className=" tab-nav-item tab-nav-item-1">
              <NavLink
                onClick={() => {
                  toggle("1");
                }}
              >
                Announcements
              </NavLink>
            </NavItem>
            <NavItem className="tab-nav-item tab-nav-item-2">
              <NavLink
                onClick={() => {
                  toggle("2");
                }}
              >
                Classwork
              </NavLink>
            </NavItem>
            <NavItem className="tab-nav-item tab-nav-item-3">
              <NavLink
                onClick={() => {
                  toggle("3");
                }}
              >
                People
              </NavLink>
            </NavItem>
          </Nav>
        </div>
        <div className="content-section">
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <div className="announcements">
                <aside>
                  <div className="student-details">
                    <h2>Alaka Feyikemi</h2>
                    <p>feyikemi199@gmail.com</p>
                    <Button className="button-green button-p-20" size="sm">
                      JSS 1
                    </Button>
                  </div>
                  <div className="upcoming-events">
                    <h4>Upcoming</h4>
                    <div className="item">
                      <img src={event}></img>
                      <div>
                        <p>Posted: 03 Sept 2020</p>
                        <p>Due Date: 06 Sept 2020</p>
                      </div>
                    </div>
                    <a href="/classes">View All</a>
                  </div>
                </aside>
                <main>
                  <article>
                    <div className="pic-text-heading">
                      <img src={man} />
                      <div>
                        <p>Announcements from teacher</p>
                      </div>
                    </div>
                  </article>
                  <section>
                    <div className="chat-block">
                      <div class="sender">
                        <div className="sender-head">
                          <div className="pic-text-heading">
                            <img src={man} />
                            <div>
                              <p>Mr Abraham O.(Teacher) </p>
                              <small className="small-grey">06 Sept 2020</small>
                            </div>
                          </div>
                          <img src={dots} />
                        </div>
                        <p className="sender-message">
                          Huloo! <br />
                          Well done to those that were able to complete the
                          video lessons for this week.
                          <br />
                          <br />
                          Cheers!
                        </p>
                      </div>
                      <div className="comments">
                        <small>1 class comment</small>
                        <div className="pic-text-heading">
                          <img src={man} />
                          <div>
                            <p>
                              Mr Abraham O.(Teacher) &nbsp;
                              <span className="small-grey">06 Sept 2020</span>
                            </p>
                            <p>
                              Course to be read for second week will be shared
                              soon
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="send">
                        <img src={woman} />
                        <div className="send-input">
                          <input />
                          <img src={sendicon} />
                        </div>
                      </div>
                    </div>
                    <div className="notification-block">
                      <div className="pic-text-heading">
                        <img src={event} />
                        <div>
                          <p>
                            Mr Abraham O.(Teacher) posted a new study link:
                            Hello everyone, here is the video ...
                          </p>
                          <p>
                            <small className="small-grey">03 Sept 2020</small>
                          </p>
                        </div>
                      </div>
                      <img src={dots} />
                    </div>
                    <div className="chat-block">
                      <div class="sender">
                        <div className="sender-head">
                          <div className="pic-text-heading">
                            <img src={man} />
                            <div>
                              <p>Mr Abraham O.(Teacher) </p>
                              <small className="small-grey">02 Sept 2020</small>
                            </div>
                          </div>
                          <img src={dots} />
                        </div>
                        <p className="sender-message">
                          Hello Everyone, Congratulations for successfully
                          joining Class MxH8902 . This is a class for JSS One
                          student. Feel free to ask questions and answers shall
                          be provided accordingly
                          <br />
                          <br />
                          Cheers!
                        </p>
                      </div>
                      <div className="comments">
                        <small>5 class comments</small>
                        <div className="pic-text-heading">
                          <img src={user} />
                          <div>
                            <p>
                              Alli Olatunbosun &nbsp;
                              <span className="small-grey">06 Sept 2020</span>
                            </p>
                            <p>Thank you sir</p>
                          </div>
                        </div>
                        <div className="pic-text-heading">
                          <img src={usertwo} />
                          <div>
                            <p>
                              John Muhammed &nbsp;
                              <span className="small-grey">06 Sept 2020</span>
                            </p>
                            <p>okay</p>
                          </div>
                        </div>
                        <div className="pic-text-heading">
                          <img src={user} />
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
                        <img src={woman} />
                        <div className="send-input">
                          <input />
                          <img src={sendicon} />
                        </div>
                      </div>
                    </div>
                  </section>
                </main>
              </div>
            </TabPane>
            <TabPane tabId="2">
              <div className="classwork">
                <nav>
                  <p
                    onClick={() => showTab(0)}
                    className="vertical-nav-item vertical-nav-0"
                  >
                    All Subjeccts
                  </p>
                  {classItems.map((item) => (
                    <p
                      onClick={() => showTab(item._id)}
                      className={`vertical-nav-item vertical-nav-${item._id}`}
                    >
                      {item.name}
                    </p>
                  ))}
                </nav>
                <main>
                  {classItems.map((item) => (
                    <div className="class-item">
                      <h5>{item.name}</h5>
                      <div class="items">
                        <Link
                          to={`/classes/9u09xunr90/jhdiujbep/dbuidhudo`}
                          className="item"
                        >
                          <div className="pic-text-heading first-section">
                            <img src={event} />
                            <div>
                              <p>
                                Attached is the link,complete the video lesson
                                for Algebrai...
                              </p>
                              <small className="small-grey">
                                Posted: 02 Sept 2020
                              </small>
                            </div>
                          </div>
                          <p className="small-grey no-margin">
                            Due 06 Sept 2020
                          </p>
                          <img className="more" src={dots} />
                        </Link>
                        <Link
                          to={`/classes/9u09xunr90/jhdiujbep/dbuidhudo`}
                          className="item"
                        >
                          <div className="pic-text-heading first-section">
                            <img src={event} />
                            <div>
                              <p>
                                Attached is the link,complete the video lesson
                                for Algebrai...
                              </p>
                              <small className="small-grey">
                                Posted: 02 Sept 2020
                              </small>
                            </div>
                          </div>
                          <p className="small-grey">Due 06 Sept 2020</p>
                          <img className="more" src={dots} />
                        </Link>
                        <Link
                          to={`/classes/9u09xunr90/jhdiujbep/dbuidhudo`}
                          className="item"
                        >
                          <div className="pic-text-heading first-section">
                            <img src={event} />
                            <div>
                              <p>
                                Attached is the link,complete the video lesson
                                for Algebrai...
                              </p>
                              <small className="small-grey">
                                Posted: 02 Sept 2020
                              </small>
                            </div>
                          </div>
                          <p className="small-grey">Due 06 Sept 2020</p>
                          <img className="more" src={dots} />
                        </Link>
                      </div>
                    </div>
                  ))}{" "}
                </main>
              </div>
            </TabPane>
            <TabPane tabId="3">
              <div className="people">
                <section>
                  <div className="heading">
                    <h5>Teacher</h5>
                  </div>
                  <div className="pupil">
                    <img src={man} />
                    <p>Mr Abraham O.</p>
                  </div>
                </section>
                <section>
                  <div className="heading">
                    <h5>Classmates</h5>
                    <p>46 pupils</p>
                  </div>
                  <div className="pupil">
                    <img src={man} />
                    <p>Alli Olatunbosun</p>
                  </div>
                  <div className="pupil">
                    <img src={man} />
                    <p>John Muhammed</p>
                  </div>
                  <div className="pupil">
                    <img src={man} />
                    <p>Alli Olatunbosun</p>
                  </div>
                  <div className="pupil">
                    <img src={man} />
                    <p>John Muhammed</p>
                  </div>
                  <div className="pupil">
                    <img src={man} />
                    <p>Alli Olatunbosun</p>
                  </div>
                  <div className="pupil">
                    <img src={man} />
                    <p>John Muhammed</p>
                  </div>
                  <div className="pupil">
                    <img src={man} />
                    <p>Alli Olatunbosun</p>
                  </div>
                  <div className="pupil">
                    <img src={man} />
                    <p>John Muhammed</p>
                  </div>
                  <div className="pupil">
                    <img src={man} />
                    <p>Alli Olatunbosun</p>
                  </div>
                  <div className="pupil">
                    <img src={man} />
                    <p>John Muhammed</p>
                  </div>
                  <div className="pupil">
                    <img src={man} />
                    <p>Alli Olatunbosun</p>
                  </div>
                  <div className="pupil">
                    <img src={man} />
                    <p>John Muhammed</p>
                  </div>
                </section>
              </div>
            </TabPane>
          </TabContent>
        </div>
      </div>
    </div>
  );
};

export default ClassroomStudent;
