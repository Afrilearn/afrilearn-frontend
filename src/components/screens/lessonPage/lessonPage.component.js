import React, { Component } from "react";
import movie from "../../../assets/video/video.mp4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faBook,
  faMicrophone,
  faThumbsUp,
  faDotCircle,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

import "./css/style.css";
import firstterm from "../../../assets/img/firstterm.png";

class LessonPage extends Component {
  state = {};
  openPopOne = () => {
    const popOne = document.getElementById("lessonPagePopUpOne");
    popOne.style.display = "flex";
  };
  openPopTwo = () => {
    const popTwo = document.getElementById("lessonPagePopUpTwo");
    popTwo.style.display = "flex";
  };
  closePopOne = () => {
    const popOne = document.getElementById("lessonPagePopUpOne");
    popOne.style.display = "none";
  };
  closePopTwo = () => {
    const popTwo = document.getElementById("lessonPagePopUpTwo");
    popTwo.style.display = "none";
  };
  render() {
    return (
      <React.Fragment>
        <div id="lessonPageSectionOne">
          <div className="negative_margin"></div>
          <video controls>
            <source src={movie} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div id="lessonPageSectionTwo">
          <div className="left">
            <div className="top">
              <div className="button" onClick={this.openPopOne}>
                <FontAwesomeIcon
                  icon={faPlay}
                  style={{ marginRight: "10px" }}
                />
                Lesson 2
              </div>
              <div className="icon">
                <FontAwesomeIcon icon={faBook} />
              </div>
              <div className="icon">
                <FontAwesomeIcon icon={faMicrophone} />
                <div className="icon_pop">
                  <p>Audio Lesson</p>
                  <span></span>
                </div>
              </div>
              <div className="icon" onClick={this.openPopTwo}>
                <FontAwesomeIcon icon={faThumbsUp} />
                <div className="icon_pop">
                  <p>I like this content</p>
                  <span></span>
                </div>
              </div>
              <div className="icon">
                <FontAwesomeIcon icon={faDotCircle} />
                <div className="icon_pop">
                  <p>Community</p>
                  <p>Bookmark</p>
                  <p>Share</p>
                  <span></span>
                </div>
              </div>
            </div>
            <a href="#">Hide Transcript</a>
            <h4>Geometrical Construction (2): Angles</h4>
            <p>
              "Construction" in Geometry means to draw shapes, angles or lines
              accurately. These constructions use only compass, straightedge
              (i.e. ruler) and a pencil. straightedge. T.his is the "pure" form
              of geometric construction: no numbers involved!
            </p>
            <h5> Angles</h5>
            <p>
              And it is useful to know how to do 30°, 45° and 60° angles. We can
              use the angle bisector method (above) to create other angles such
              as 15°, etc.
            </p>
            <h5> Angles</h5>
            <p>
              And it is useful to know how to do 30°, 45° and 60° angles. We can
              use the angle bisector method (above) to create other angles such
              as 15°, etc.
            </p>
            <p>
              "Construction" in Geometry means to draw shapes, angles or lines
              accurately. These constructions use only compass, straightedge
              (i.e. ruler) and a pencil. straightedge. T.his is the "pure" form
              of geometric construction: no numbers involved!
            </p>
            <p>
              "Construction" in Geometry means to draw shapes, angles or lines
              accurately. These constructions use only compass, straightedge
              (i.e. ruler) and a pencil. straightedge. T.his is the "pure" form
              of geometric construction: no numbers involved!
            </p>
          </div>
          <div className="right">
            <div className="top">
              <p>
                <span>Class:&nbsp;&nbsp; &nbsp; </span> Junior Sceondary School
                One
              </p>
              <p>
                <span>Subject:&nbsp;&nbsp; &nbsp; </span> Basic Technology
              </p>
              <p>
                <span>Term:&nbsp;&nbsp; &nbsp; </span> First Term
              </p>
              <p>
                <span>Date Created:&nbsp;&nbsp; &nbsp; </span> 14th Seotember
                2020
              </p>
            </div>
            <div className="mid">
              <h4>Related Videos</h4>
              <div className="item">
                <div className="img">
                  <img src={firstterm} alt="see this"></img>
                </div>
                <div className="right">
                  <p>Geometrical Construction (1): Lines</p>
                  <div className="button">
                    <FontAwesomeIcon
                      icon={faPlay}
                      style={{ marginRight: "5px" }}
                    />
                    Lesson 2
                  </div>
                </div> 
              </div>
              <div className="item">
                <div className="img">
                  <img src={firstterm} alt="see this"></img>
                </div>
                <div className="right">
                  <p>Geometrical Construction (1): Lines</p>
                  <div className="button">
                    <FontAwesomeIcon
                      icon={faPlay}
                      style={{ marginRight: "5px" }}
                    />
                    Lesson 2
                  </div>
                </div>
              </div>
            </div>
            <div className="mid">
              <h4>Related Videos</h4>
              <div className="item">
                <div className="img">
                  <img src={firstterm} alt="see this"></img>
                </div>
                <div className="right">
                  <p>Geometrical Construction (1): Lines</p>
                  <div className="button">
                    <FontAwesomeIcon
                      icon={faPlay}
                      style={{ marginRight: "5px" }}
                    />
                    Lesson 2
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="img">
                  <img src={firstterm} alt="see this"></img>
                </div>
                <div className="right">
                  <p>Geometrical Construction (1): Lines</p>
                  <div className="button">
                    <FontAwesomeIcon
                      icon={faPlay}
                      style={{ marginRight: "5px" }}
                    />
                    Lesson 2
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="img">
                  <img src={firstterm} alt="see this"></img>
                </div>
                <div className="right">
                  <p>Geometrical Construction (1): Lines</p>
                  <div className="button">
                    <FontAwesomeIcon
                      icon={faPlay}
                      style={{ marginRight: "5px" }}
                    />
                    Lesson 2
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="lessonPagePopUpOne">
          <span className="closePopUp" onClick={this.closePopOne}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
          <FontAwesomeIcon icon={faInfoCircle} style={{ fontSize: "40px" }} />
          <h3>
            This action takes you to the complete <br /> class note page
          </h3>
          <button>Yes! Proceed to Class Note</button>
          <a href="#">Share your progress</a>
        </div>
        <div id="lessonPagePopUpTwo">
          <span className="closePopUp" onClick={this.closePopTwo}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
          <h3>Yay Feyikemi ! You are doing well</h3>
          <p>Keep up the good work</p>
          <button>Proceed to Lesson 3</button>
          <a href="#">Share your progress</a>
        </div>
      </React.Fragment>
    );
  }
}

export default LessonPage;
