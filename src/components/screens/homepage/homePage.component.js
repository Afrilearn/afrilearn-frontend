import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./css/style.css";
import AppreciationBox from "../../includes/appreciationSlick.component";
import Particles from "react-tsparticles";
import { connect } from 'react-redux';
import { inputChange, getRoles } from './../../../redux/actions/authActions';
import PropTypes from 'prop-types';
import PaticleOption from '../../../assets/js/particles'

const Homepage = (props) => {
  const {
    classLabel,
    classes
  } =props;

  const mounted = useRef();

  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      window.scrollTo(0, 0);
      props.inputChange('redirect', false)
      props.inputChange('dashboardRoute', false)      
      if(!classes.length){
        props.getRoles();  
      }
    } else {
      // do componentDidUpdate logic
    }
  });

  const classSet = () => {
    if (classes.length) {         
      return classes.map((item) => {
        return <li><Link to={`/classes/${item._id}`}>{item.name}</Link></li>
      });
    }
  };
 
  return (
    <span id="homepage">
      <div className="container-fluid bannerSection">
        <div className="row">
          <div className="col-md-3"> </div>
          <div className="col-md-6 box">
            <h1>
              Welcome to the future
              <br className="desktopOnly"/> of fun learning!
            </h1>           
            <div className="row courseSelectSection">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-8 paddingRightOff">
                    <ul>
                      <li className="relative myDrop">
                        <Link className="myPlaceholder">
                          {classLabel}
                          <img
                            className="downArrow"
                            src={require("../../../assets/img/downarrow.png")}
                            alt="down arrow"
                          />
                        </Link>
                        <ul className="courseSelectSectionDropDown">
                           {classSet()}
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="col-4 paddingLeftOff">
                    <Link to="/register">
                      <input
                        type="submit"
                        value="JOIN FOR FREE"
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
        <div className="row relative">
        <Particles
        id="tsparticles"
        options={PaticleOption}       
        />    
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
            <Link className="startLearning" to="/register">Start Learning</Link>
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
              src={require("../../../assets/img/gamified.gif")}
              alt="Next big thing"
            />
          </div>
        </div>
        <div className="row students relative">
        <Particles
        id="tsparticles"
        options={PaticleOption}
        /> 
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
              src={require("../../../assets/img/personified.gif")}
              alt="Personalised learning."
            />
          </div>
          <div className="col-md-6">
            <h1>Personalised learning.</h1>
            <h3>
              Understand how you learn best, where to focus, and practice at
              your own pace.
            </h3>
            <Link className="startLearning" to="/register">Start Learning</Link>
          </div>
        </div>
        <div className="row mobile relative">
        <Particles
        id="tsparticles"
        options={PaticleOption}
        /> 
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
              src={require("../../../assets/img/exambly-mockup-for-website.png")}
              alt="Learn on any device."
            />
          </div>
        </div>
        <div className="row appreciation">
          <AppreciationBox />
        </div>
        <div className="row relative">
        <Particles
        id="tsparticles"
        options={PaticleOption}
      
      /> 
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

Homepage.propTypes = {
  inputChange: PropTypes.func.isRequired,
  getRoles: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  classes: state.auth.classes,
  classLabel: state.auth.classLabel
});
export default connect(mapStateToProps, {inputChange, getRoles})(Homepage);
