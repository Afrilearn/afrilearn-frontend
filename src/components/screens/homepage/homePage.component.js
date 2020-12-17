import React, { useEffect, useRef } from "react";
import Typed from "react-typed";
import { Link } from "react-router-dom";
import "./css/style.css";
import AppreciationBox from "../../includes/appreciationSlick.component";
// import Particles from 'react-particles-js';

const Homepage = (props) => {
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
    <span id="homepage">
      <div className="container-fluid bannerSection">
        <div className="overlay"></div>
        <img
          className="banner desktopOnly"
          src={require("../../../assets/img/sample.jpg")}
          alt="homepage banner"
        />
        <img
          className="banner mobileOnly"
          src={require("../../../assets/img/sample.jpg")}
          alt="homepage banner"
        />
        <div className="row">
          <div className="col-md-3"> </div>
          <div className="col-md-6 box">
            <h1>
              Welcome to the future
              <br /> of fun learning!
            </h1>
            <h3 className="center">
              <Typed
                strings={[
                  "Afrilearn is on a mission to provide affordable, world-class education for Africans, anywhere.",
                  "Because every child deserves a chance to quality education.",
                ]}
                typeSpeed={60}
                backSpeed={50}
                loop
              ></Typed>
            </h3>
            <div className="row courseSelectSection">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-8 paddingRightOff">
                    <ul>
                      <li className="relative myDrop">
                        <Link className="myPlaceholder">
                          Select a Class
                          <img
                            className="downArrow"
                            src={require("../../../assets/img/downarrow.png")}
                            alt="down arrow"
                          />
                        </Link>
                        <ul className="courseSelectSectionDropDown">
                          <li>
                            <Link>Primary One</Link>
                          </li>
                          <li>
                            <Link>Primary Two</Link>
                          </li>
                          <li>
                            <Link>Primary Three</Link>
                          </li>
                          <li>
                            <Link>Primary Four</Link>
                          </li>
                          <li>
                            <Link>Primary Five</Link>
                          </li>
                          <li>
                            <Link>Primary Six</Link>
                          </li>
                          <li>
                            <Link>JSS One</Link>
                          </li>
                          <li>
                            <Link>JSS Two</Link>
                          </li>
                          <li>
                            <Link>JSS Three</Link>
                          </li>
                          <li>
                            <Link>SSS One</Link>
                          </li>
                          <li>
                            <Link>SSS Two</Link>
                          </li>
                          <li>
                            <Link>SSS Three</Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="col-4 paddingLeftOff">
                    <Link to="/classes/9u09xunr90">
                      <input
                        type="submit"
                        value="GET STARTED"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3"> </div>
        </div>
      </div>
      <div className="container-fluid afterBanner relative">
        {/* <Particles/>              */}
        <div className="row">
          <div className="col-md-6">
            <iframe
              width="456"
              title="Scale of perference"
              height="266"
              src="https://www.youtube.com/embed/F8XFbBiyrLc"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div className="col-md-6 shiftVideo">
            <h1>Enjoy unlimited video lessons!</h1>
            <h3>
              Download your favorite videos to watch offline and always have
              something to learn.
            </h3>
            <Link className="startLearning">Start Learning</Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <h1>Gamified experience with rewards.</h1>
            <h3>
              Fun exam practice to ace WAEC, JAMB, NECO and more like a pro!
            </h3>
          </div>
          <div className="col-md-6">
            <img
              className="bigThing floatRight"
              src={require("../../../assets/img/Gamified experience with rewards.jpg")}
              alt="Next big thing"
            />
          </div>
        </div>
        <div className="row students">
          <div className="col-md-8">
            <h1>
              Students love using
              <br className="desktopOnly" /> Afrilearn
            </h1>
            <h2 className="green">105,784</h2>
            <h4 className="green">Happy Students</h4>
          </div>
          <div className="col-md-4">
            <div className="row push">
              <div className="col-4">
                <img
                  className="iconSet"
                  src={require("../../../assets/img/video.png")}
                  alt="video lessons"
                />
              </div>
              <div className="col-8">
                <h2>178,345,948</h2>
                <h5>Video Lessons</h5>
              </div>
            </div>
            <div className="row push">
              <div className="col-4">
                <img
                  className="iconSet"
                  src={require("../../../assets/img/questions.png")}
                  alt="questions"
                />
              </div>
              <div className="col-8">
                <h2>120,984,030</h2>
                <h5>Practice Questions</h5>
              </div>
            </div>
            <div className="row push">
              <div className="col-4">
                <img
                  className="iconSet"
                  src={require("../../../assets/img/topics.png")}
                  alt="topics"
                />
              </div>
              <div className="col-8">
                <h2>104,384,231</h2>
                <h5>Topic Quizzes</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <img
              className="bigThing other"
              src={require("../../../assets/img/27920-thanks-message.gif")}
              alt="Personalised learning."
            />
          </div>
          <div className="col-md-6">
            <h1>Personalised learning.</h1>
            <h3>
              Understand how you learn best, where to focus, and practice at
              your own pace.
            </h3>
            <Link className="startLearning">Start Learning</Link>
          </div>
        </div>
        <div className="row mobile">
          <div className="col-md-6 partOne">
            <h1>Learn on any device.</h1>
            <h3>Anywhere, everywhere. Cancel anytime.</h3>
            <div className="row push2">
              <div className="col-6">
                <img
                  className=""
                  src={require("../../../assets/img/playstore.png")}
                  alt="playstore"
                />
              </div>
              <div className="col-6">
                <img
                  className=""
                  src={require("../../../assets/img/applestore.png")}
                  alt="applestore"
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <img
              className="bigThing floatRight"
              src={require("../../../assets/img/Enjoy unlimited video lessons(1).jpg")}
              alt="Learn on any device."
            />
          </div>
        </div>
        <div className="row appreciation">
          <AppreciationBox />
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <h6 className="center">
              Interested? Enter your email and we’ll keep you in the loop!
            </h6>
            <div className="row">
              <div className="col-8 paddingRightOff">
                <input type="email" placeholder="Email Address" />
              </div>
              <div className="col-4 paddingLeftOff">
                <input type="submit" value="Send" />
              </div>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </span>
  );
};

export default Homepage;
