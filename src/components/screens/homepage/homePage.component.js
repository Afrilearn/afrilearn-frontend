import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./css/style.css";
import AppreciationBox from "../../includes/appreciationSlick.component";
import Particles from "react-tsparticles";
import { connect } from 'react-redux';
import { inputChange, getRoles } from './../../../redux/actions/authActions';
import PropTypes from 'prop-types';
import PaticleOption from '../../../assets/js/particles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faFighterJet, faGraduationCap, faStar} from '@fortawesome/free-solid-svg-icons';

const Homepage = (props) => {
  const {
    classLabel,
    classes,
    email
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

  const handleChange = (e)=> {
    const target = e.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    props.inputChange(name, value);
}
 
  return (
    <span id="homepage">
      <div className="container-fluid bannerSection">
        <div className="row">
          <div className="col-md-3"> </div>
          <div className="col-md-6 box">
            <h1>Get Ahead with Afrilearn!</h1> 
            <h4>We provide every Nigerian Primary and Secondary School Student (Primary 1-6 & JSS1-SS3) freedom to learn curriculum-relevant subjects and topics anytime, anywhere.</h4>         
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
        <div className="row row2 landingPageAdd relative">   
        <h1 className="hOne">Why Afrilearn works…</h1>         
            <div className="col-md-4">
                <div className="row">
                    <div className="col-2">
                        <FontAwesomeIcon icon={faFighterJet} />
                    </div>
                    <div className="col-10 paddingLeftOff">
                        <h5>Genius Content.</h5> 
                        <p>Enjoy unlimited video lessons, class notes, practice quizzes created by top tutors for high-flying students.</p>
                    </div>
                </div>
                <div className="row push">
                    <div className="col-2">
                        <FontAwesomeIcon icon={faGamepad} />
                    </div>
                    <div className="col-10 paddingLeftOff">
                        <h5>Personalised Education.</h5> 
                        <p>Understand how you learn best, where to focus, and study at your unique pace.</p>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <img src={require('../../../assets/img/animation_500_kgtd8u9z.gif')}  className="banner1" alt="banner"/>
            </div>
            <div className="col-md-4">
                <div className="row">
                    <div className="col-2">
                        <FontAwesomeIcon icon={faGraduationCap} />
                    </div>
                    <div className="col-10 paddingLeftOff">
                        <h5>Examination Success.</h5> 
                        <p>Prepare effectively for best results in WASSCE, JSSCE, NECO, GCE, UTME, SAT, and more.</p>
                    </div>
                </div>
                <div className="row push">
                    <div className="col-2">
                        <FontAwesomeIcon icon={faStar} />
                    </div>
                    <div className="col-10 paddingLeftOff">
                        <h5>Engaging Classroom.</h5> 
                        <p>School or Teacher? Access ready video lessons and class notes to accelerate your students’ learning.</p>
                    </div>
                </div>
            </div>
        </div>               
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
              Download your favorite videos to watch offline and always have something to learn.
            </h3>
            <Link className="startLearning" to="/register">Start Learning</Link>
          </div>
        </div>
        <div className="row students relative">      
          <div className="col-md-6">
            <h1> 90,000+ Star Students, Schools & Teachers love Afrilearn! </h1>   
            <h3>
              Nigeria's largest curriculum-specific education resource, with new additions daily!
            </h3>        
          </div>
          <div className="col-md-6">
            <div className="row push">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-4">
                    <img
                      className="fullWidth"
                      src={require("../../../assets/img/19 - Presentation.png")}
                      alt="Next big thing"
                    />
                  </div>
                  <div className="col-md-8 paddingLeftOff">
                    <h3>1500+</h3>
                    <p>Video & Audio Lessons</p>
                  </div>
                </div>                
              </div> 
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-4">
                    <img
                      className="fullWidth"
                      src={require("../../../assets/img/16 - Analytics.png")}
                      alt="Next big thing"
                    />
                  </div>
                  <div className="col-md-8 paddingLeftOff">
                    <h3>350,000+</h3>
                    <p>Practice Quizzes & Solutions</p>
                  </div>
                </div>                
              </div> 
            </div>
            <div className="row push">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-4">
                    <img
                      className="fullWidth"
                      src={require("../../../assets/img/5 - Presentation.png")}
                      alt="Next big thing"
                    />
                  </div>
                  <div className="col-md-8 paddingLeftOff">
                    <h3>4500+</h3>
                    <p>Rich & Ready Class Notes</p>
                  </div>
                </div>                
              </div> 
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-4">
                    <img
                      className="fullWidth"
                      src={require("../../../assets/img/4 - Connection.png")}
                      alt="Next big thing"
                    />
                  </div>
                  <div className="col-md-8 paddingLeftOff">
                    <h3>345,948+</h3>
                    <p>Engagements</p>
                  </div>
                </div>                
              </div> 
            </div>
        
          </div>
        </div>
        <div className="row relative">      
          <div className="col-md-5">
            <h1>Gamified experience with rewards.</h1>
            <h3>
              Fun exam practice to ace WASSCE, JSSCE, GCE, NECO and more like a pro!
            </h3>
          </div>
          <div className="col-md-7">
            <img
              className="bigThing floatRight"
              src={require("../../../assets/img/gamified.gif")}
              alt="Next big thing"
            />
          </div>
        </div>
       
        <div className="row mobile relative">
          <Particles
            id="tsparticles"
            options={PaticleOption}
          
          /> 
          <div className="col-md-6">
            <img
                className="bigThing floatLeft"
                src={require("../../../assets/img/Homepage-mockup-web.png")}
                alt="Learn on any device."
            />
          </div>
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
        </div>
        <div className="row appreciation">
          <AppreciationBox />
        </div>
        <div className="row"> 
          <h1 className="hOne">Frequently Asked Questions</h1>         
          <div className="col-md-2">  </div>  
          <div className="col-md-8">
            <div className="accordion md-accordion" id="accordionEx" role="tablist" aria-multiselectable="true">
              <div className="card">
                <div className="card-header" role="tab" id="headingOne1">
                  <a data-toggle="collapse" data-parent="#accordionEx" href="#collapseOne1" aria-expanded="true"
                    aria-controls="collapseOne1">
                    <h5 className="mb-0">
                      What is Afrilearn?
                    </h5>
                  </a>
                </div>
                <div id="collapseOne1" className="collapse show" role="tabpanel" aria-labelledby="headingOne1"
                  data-parent="#accordionEx">
                  <div className="card-body">
                    Afrilearn is a world-class streaming service that provides West African Primary and Secondary School Students (Primary 1-6 & JSS1-SS3) freedom to learn curriculum-relevant subjects and topics anytime, anywhere. With Afrilearn, there's always something exciting to learn as new contents are added daily!
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" role="tab" id="headingTwo2">
                  <a className="collapsed" data-toggle="collapse" data-parent="#accordionEx" href="#collapseTwo2"
                    aria-expanded="false" aria-controls="collapseTwo2">
                    <h5 className="mb-0">
                      What is included in Afrilearn subscription?
                    </h5>
                  </a>
                </div> 
                <div id="collapseTwo2" className="collapse" role="tabpanel" aria-labelledby="headingTwo2"
                  data-parent="#accordionEx">
                  <div className="card-body">
                    Subscription includes unlimited access to all video lessons, audio lessons, class notes, practice quizzes, lives classes and more, covering all subjects and topics, in your chosen class. Brace yourself for a profoundly life-changing experience.
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header" role="tab" id="headingThree3">
                  <a className="collapsed" data-toggle="collapse" data-parent="#accordionEx" href="#collapseThree3"
                    aria-expanded="false" aria-controls="collapseThree3">
                    <h5 className="mb-0">
                      How much does Afrilearn cost?
                    </h5>
                  </a>
                </div>
                <div id="collapseThree3" className="collapse" role="tabpanel" aria-labelledby="headingThree3"
                  data-parent="#accordionEx">
                  <div className="card-body">
                    Afrilearn has a variety of plans to suit your learning goals. Subscription Plans include Monthly - ₦999 ($2.99), Quarterly - ₦2499 ($6.99), Bi-Annual - ₦4999 ($13.99), Annual - ₦9999 ($26.99).
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" role="tab" id="headingFour4">
                  <a className="collapsed" data-toggle="collapse" data-parent="#accordionEx" href="#collapseFour4"
                    aria-expanded="false" aria-controls="collapseFour4">
                    <h5 className="mb-0">
                      Where can I watch?
                    </h5>
                  </a>
                </div>
                <div id="collapseFour4" className="collapse" role="tabpanel" aria-labelledby="headingFour4"
                  data-parent="#accordionEx">
                  <div className="card-body">
                    You can learn on Afrilearn via your smartphone, tablet, Smart TV, laptop, or streaming device. Learn as much as you want, whenever you want without a single commercial – all for one low monthly price.
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" role="tab" id="headingFive5">
                  <a className="collapsed" data-toggle="collapse" data-parent="#accordionEx" href="#collapseFive5"
                    aria-expanded="false" aria-controls="collapseFive5">
                    <h5 className="mb-0">
                      How do I cancel?
                    </h5>
                  </a>
                </div>
                <div id="collapseFive5" className="collapse" role="tabpanel" aria-labelledby="headingFive5"
                  data-parent="#accordionEx">
                  <div className="card-body">
                    Our focus is to transform users into ambassadors through the best learning experience possible. You can easily cancel your subscription in two clicks. If you have more questions, please click contact us. We’re super happy to help!
                  </div>
                </div>
              </div>
            </div>
          </div>  
          <div className="col-md-2">  </div>         
        </div>
        <div className="row relative">       
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <h6 className="center">
              Ready to learn? Enter your email to signup
            </h6>
            <div className="row">
              <div className="col-8 paddingRightOff">
                <input type="email" placeholder="Email Address" name="email" value={email} onChange={handleChange}/>
              </div>
              <div className="col-4 paddingLeftOff">
                <Link to="/register"><input type="submit" value="Start Learning" /></Link>
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
  classLabel: state.auth.classLabel,
  email: state.auth.email, 
});
export default connect(mapStateToProps, {inputChange, getRoles})(Homepage);
