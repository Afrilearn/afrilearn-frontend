import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./css/style.css";
import AppreciationBox from "../../includes/appreciationSlick.component";
import SupportersSlide from "../../includes/supportersSlide.component";
import Footer from "../../includes/footer/footer.component";
import Particles from "react-tsparticles";
import { connect } from "react-redux";
import { inputChange, getRoles } from "./../../../redux/actions/authActions";
import {  
  populateAfrilearnTopTenVideos 
} from "./../../../redux/actions/courseActions";
import SubjectLoader from "../../includes/Loaders/subjectListLoader.component";
import norecent from "../../../assets/img/norecent.png";
import TopTen from "../../includes/dashboard/topTen.component";
import PropTypes from "prop-types";
import PaticleOption from "../../../assets/js/particles";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap_white.css";
import slugify from "react-slugify";
// import VideoThumbnail from 'react-video-thumbnail';
// import VideoPlayer from 'simple-react-video-thumbnail'

const Homepage = (props) => {

  const {
    classLabel,
    classes,
    email,
    numberOfClassNote,
    numberOfQuizQuestions,
    students,
    teachers,
    allUsers,
    afrilearnTopTenVideos,
    afrilearnTopTenVideoLoader,
    rolesLoader    
  } = props;

  const mounted = useRef();

  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      window.scrollTo(0, 0);
      props.inputChange("redirect", false);
      props.inputChange("dashboardRoute", false);

      if(!classes.length){
        props.getRoles(true);
      } 

      props.populateAfrilearnTopTenVideos();
     
    } else {
      // do componentDidUpdate logic
      
    }
  });
  
  const classSet = () => {
    if (classes.length) {          
      return classes.map((item) => {
        return (
          <li>
            <Link to={`/classes/${slugify(item.name)}?classId=${item._id}`}>
              {item.name}
            </Link>
          </li>
        );
      });
    }
  };

  const handleChange1 = (e) => {   
      const target = e.target;
      const name = target.name;
      const value = target.type === "checkbox" ? target.checked : target.value;
      props.inputChange(name, value);     
  };

  const handleChange = (role=false, e) => {    
      props.inputChange('role', role);   
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  const topTenList = () => {
    if (
      afrilearnTopTenVideos.lessons &&     
      afrilearnTopTenVideos.lessons.length
    ) {      
      // eslint-disable-next-line array-callback-return
      let counter = 0;
      return afrilearnTopTenVideos.lessons.map((item, index) => {  
        if(counter<4){
          ++counter
          return (
            <TopTen item= {item} homepage={true}/>
          );     
        } 
      });
    } else {
      return (
        <div className="empty-class-state-2">
          <img src={norecent} /> <p>No top ten videos</p>
        </div>
      );
    }
  };
 
  return (
    <span id="homepage">     
      <div className="container-fluid bannerSection">
        <div className="row">
          <div className="col-md-3"> </div>
          <div className="col-md-6 box">
            <h1>Get Ahead with Afrilearn!</h1>
            <h4>
              We provide every Secondary School Student freedom to
              learn complete curriculum-relevant subjects and topics anytime, anywhere.
            </h4>
           
            <div className="row courseSelectSection">
             {rolesLoader?
               <img src={require("../../../assets/img/loading.gif")} className="centerImage rolesLoader"/>
              :
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
                      <input type="submit" value="JOIN FOR FREE" />
                    </Link>
                  </div>
                </div>
              </div>
              }
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
                <img
                  src={require("../../../assets/img/Group 68.png")}
                  className="myIcon"
                  alt="Genius Content"
                />
              </div>
              <div className="col-10 paddingLeftOff">
                <h5>Genius Content</h5>
                <p>
                  Enjoy unlimited videos, class notes, practice quizzes
                  by top tutors for high-flying students.
                </p>
              </div>
            </div>
            <div className="row push">
              <div className="col-2">
                <img
                  src={require("../../../assets/img/Group 69.png")}
                  className="myIcon"
                  alt="Genius Content"
                />
              </div>
              <div className="col-10 paddingLeftOff">
                <h5>Examination Success</h5>
                <p>
                  Prepare effectively for best results in WASSCE, IGCSE, JSSCE,
                  NECO, GCE, UTME, SAT.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <img
              src={require("../../../assets/img/animation_500_klge8ksp.gif")}
              className="imageCenter"
              alt="banner"
            />
          </div>
          <div className="col-md-4">
            <div className="row">
              <div className="col-2">
                <img
                  src={require("../../../assets/img/Group 72.png")}
                  className="myIcon"
                  alt="Genius Content"
                />
              </div>
              <div className="col-10 paddingLeftOff">
                <h5>Personalised Education</h5>
                <p>
                  Understand how you learn best, where to focus, and study at
                  your unique pace.
                </p>
              </div>
            </div>
            <div className="row push">
              <div className="col-2">
                <img
                  src={require("../../../assets/img/Group 70.png")}
                  className="myIcon"
                  alt="Genius Content"
                />
              </div>
              <div className="col-10 paddingLeftOff">
                <h5>Engaging Classroom</h5>
                <p>
                  School or Teacher? Access ready-made contents
                  to accelerate your students’ learning.
                </p>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="row fourProfiles">         
          <div className="col-md-3">
            <span className="profile">
              <img src={require('../../../assets/img/student.gif')} alt="student" className="profileImg"/>
              <div className="row box">
                <div className="col-12">
                  <h4>STUDENTS</h4>
                </div>
                <div className="col-12">
                  <div className="row bulletRow">
                    <div className="col-1">
                      <img src={require('../../../assets/img/Group 2295.png')} alt="bullet"/>
                    </div>
                    <div className="col-10 paddingRightOff">
                      Learn through your syllabus at your unique pace💃✍️
                    </div>
                  </div>                  
                </div>                
                <div className="col-12">
                  <div className="row bulletRow">
                    <div className="col-1">
                      <img src={require('../../../assets/img/Group 2295.png')} alt="bullet"/>
                    </div>
                    <div className="col-10 paddingRightOff">
                      Achieve best grades & pass WAEC, JAMB, BECE easily💯
                    </div>
                  </div>                  
                </div>
                <div className="col-12">
                  <div className="row bulletRow">
                    <div className="col-1">
                      <img src={require('../../../assets/img/Group 2295.png')} alt="bullet"/>
                    </div>
                    <div className="col-10 paddingRightOff">
                     Interact with top tutors & become a high-flying student👩‍
                    </div>
                  </div>                  
                </div>
                <div className="col-12 center">                  
                  <Link className="myButton" to="/register" onClick={handleChange.bind(null,'5fd08fba50964811309722d5')}>
                    Create Free Student Account
                  </Link>
                </div>
              </div>
            </span>
          </div>
          <div className="col-md-3">
            <span className="profile">
              <img src={require('../../../assets/img/teacher.gif')} alt="student" className="profileImg"/>
              <div className="row box">
                <div className="col-12">
                  <h4>TEACHERS</h4>
                </div>
                <div className="col-12">
                  <div className="row bulletRow">
                    <div className="col-1">
                      <img src={require('../../../assets/img/Group 2295.png')} alt="bullet"/>
                    </div>
                    <div className="col-10 paddingRightOff">
                      Save time, stress, and paper<br className="desktopOnly"/> work⏳
                    </div>
                  </div>                  
                </div>               
                <div className="col-12">
                  <div className="row bulletRow">
                    <div className="col-1">
                      <img src={require('../../../assets/img/Group 2295.png')} alt="bullet"/>
                    </div>
                    <div className="col-10 paddingRightOff">
                      Improve classroom engagement & performance⚡
                    </div>
                  </div>                  
                </div>
                <div className="col-12">
                  <div className="row bulletRow">
                    <div className="col-1">
                      <img src={require('../../../assets/img/Group 2295.png')} alt="bullet"/>
                    </div>
                    <div className="col-10 paddingRightOff">
                      Become an award-winning <br className="desktopOnly"/>teacher🏆
                    </div>
                  </div>                  
                </div>
                <div className="col-12 center">                  
                  <Link className="myButton" to="/register" onClick={handleChange.bind(null,'602f3ce39b146b3201c2dc1d')}>
                    Create Free Teacher Account
                  </Link>
                </div>
              </div>
            </span>
          </div>
          <div className="col-md-3">
            <span className="profile">
              <img src={require('../../../assets/img/parent.gif')} alt="student" className="profileImg"/>
              <div className="row box">
                <div className="col-12">
                  <h4>PARENTS</h4>
                </div>
                <div className="col-12">
                  <div className="row bulletRow">
                    <div className="col-1">
                      <img src={require('../../../assets/img/Group 2295.png')} alt="bullet"/>
                    </div>
                    <div className="col-10 paddingRightOff">
                      Track your child’s strengths and progress💪
                    </div>
                  </div>                  
                </div>                
                <div className="col-12">
                  <div className="row bulletRow">
                    <div className="col-1">
                      <img src={require('../../../assets/img/Group 2295.png')} alt="bullet"/>
                    </div>
                    <div className="col-10 paddingRightOff">
                      Engage your child for success in school and life🎖️
                    </div>
                  </div>                  
                </div>
                <div className="col-12">
                  <div className="row bulletRow">
                    <div className="col-1">
                      <img src={require('../../../assets/img/Group 2295.png')} alt="bullet"/>
                    </div>
                    <div className="col-10 paddingRightOff">
                      Transform your child’s life with world-class education🎓
                    </div>
                  </div>                  
                </div>
                <div className="col-12 center">                  
                  <Link className="myButton" to="/register" onClick={handleChange.bind(null,'606ed82e70f40e18e029165e')}>
                    Create Free Parent Account
                  </Link>
                </div>
              </div>
            </span>
          </div>
          <div className="col-md-3">
            <span className="profile">
              <img src={require('../../../assets/img/school.gif')} alt="student" className="profileImg"/>
              <div className="row box">
                <div className="col-12">
                  <h4>SCHOOLS</h4>
                </div>
                <div className="col-12">
                  <div className="row bulletRow">
                    <div className="col-1">
                      <img src={require('../../../assets/img/Group 2295.png')} alt="bullet"/>
                    </div>
                    <div className="col-10 paddingRightOff">
                      Discover how your students learn best, where to focus✨ 
                    </div>
                  </div>                  
                </div>
                
                <div className="col-12">
                  <div className="row bulletRow">
                    <div className="col-1">
                      <img src={require('../../../assets/img/Group 2295.png')} alt="bullet"/>
                    </div>
                    <div className="col-10 paddingRightOff">
                      Empower your school with advanced technologies📲
                    </div>
                  </div>                  
                </div>
                <div className="col-12">
                  <div className="row bulletRow">
                    <div className="col-1">
                      <img src={require('../../../assets/img/Group 2295.png')} alt="bullet"/>
                    </div>
                    <div className="col-10 paddingRightOff">
                      Improve enrollment & learning outcomes🧑🏻‍🤝‍🧑🏻
                    </div>
                  </div>                  
                </div>
                <div className="col-12 center">                  
                  <Link className="myButton" to="/register" onClick={handleChange.bind(null,'607ededa2712163504210684')}>
                    Create Free School Account
                  </Link>
                </div>
              </div>
            </span>
          </div>
        </div>
        <div className="row relative">
          <Particles id="tsparticles" options={PaticleOption} />
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
            <Link className="startLearning" to="/register">
              Start Learning
            </Link>
          </div>
        </div>
        <div className="row push10 resumePlaying myTopTen kkj"> 
        <h1 className="hOne">Trending on Afrilearn</h1>     
          { afrilearnTopTenVideoLoader ? (
              <SubjectLoader />
          ) : (
            topTenList()
          )}
          
        </div>
        <div className="row students relative">
        {rolesLoader?
          <img src={require("../../../assets/img/loading.gif")} className="centerImage rolesLoader"/>
          :
          <>
            <div className="col-md-6">
              <h1>
                {" "}
                {students && students > 0
                  ? numberWithCommas(allUsers)
                  : 0}
                + Star Students, Schools & Teachers love Afrilearn!{" "}
              </h1>
              <h3>New content added every week!</h3>
            </div>
            <div className="col-md-6">
              <div className="row push">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-4">
                      <img
                        className="fullWidth"
                        src={require("../../../assets/img/videoLessons.svg")}
                        alt="Next big thing"
                      />
                    </div>
                    <div className="col-md-8 paddingLeftOff">
                      <h3>{numberWithCommas(1500)}+</h3>
                      <p>Video & Audio Lessons</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-4">
                      <img
                        className="fullWidth"
                        src={require("../../../assets/img/practice questions.svg")}
                        alt="Next big thing"
                      />
                    </div>
                    <div className="col-md-8 paddingLeftOff">
                      <h3>
                        {numberOfQuizQuestions && numberOfQuizQuestions > 0
                          ? numberWithCommas(22122 + numberOfQuizQuestions)
                          : 0}
                        +{" "}
                      </h3>
                      <p>Practice Questions</p>
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
                        src={require("../../../assets/img/classnote.svg")}
                        alt="Next big thing"
                      />
                    </div>
                    <div className="col-md-8 paddingLeftOff">
                      <h3>
                        {numberOfClassNote && numberOfClassNote > 0
                          ? numberWithCommas(numberOfClassNote)
                          : 0}
                        +{" "}
                      </h3>
                      <p>Rich & Ready Class Notes</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-4">
                      <img
                        className="fullWidth"
                        src={require("../../../assets/img/engagements.svg")}
                        alt="Next big thing"
                      />
                    </div>
                    <div className="col-md-8 paddingLeftOff">
                      <h3>345,948+</h3>
                      <p>Learning Minutes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
        </div>
        <div className="row relative">
          <div className="col-md-5">
            <h1>Gamified experience with rewards.</h1>
            <h3>
              Fun exam practice to ace WASSCE, JSSCE, GCE, NECO and more like a
              pro!
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
          <Particles id="tsparticles" options={PaticleOption} />
          <div className="col-md-6">
            <img
              className="bigThing floatLeft"
              src={require("../../../assets/img/learn on any device mockup.png")}
              alt="Learn on any device."
            />
          </div>
          <div className="col-md-6 partOne">
            <h1>Learn on any device.</h1>
            <h3>Anywhere, everywhere. Cancel anytime.</h3>
            <div className="row push2">
              <div className="col-6">
               <a href="https://play.google.com/store/apps/details?id=com.afrilearn" target="_blank">
                  <img
                    className=""
                    src={require("../../../assets/img/playstore.png")}
                    alt="playstore"
                  />
               </a>
              </div>
              <div className="col-6 right">
                <Tooltip
                  placement="top"
                  trigger={["hover"]}
                  overlay={<span>Coming soon!</span>}
                >
                  <img
                    className=""
                    src={require("../../../assets/img/applestore.png")}
                    alt="applestore"
                  />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        <div className="row appreciation">
          <AppreciationBox />
        </div>
        <div className="row">
          <h1 className="hOne">Frequently Asked Questions</h1>
          <div className="col-md-2"> </div>
          <div className="col-md-8">
            {/* New  */}
            <div class="accordion" id="accordionExample">
              <div class="card">
                <h2 class="accordion-header text-white" id="headingOne">
                  <button
                    class="accordion-button text-white collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                  >
                    What is Afrilearn?
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    Afrilearn is an education streaming service that provides Nigerian and
                    West African Secondary School Students (JSS1-SS3) freedom to learn complete curriculum-relevant
                    subjects and topics anytime, anywhere. With Afrilearn,
                    there's always something exciting to learn as new contents
                    are added weekly!
                  </div>
                </div>
              </div>
              <div class="card">
                <h2 class="accordion-header text-white" id="headingTwo">
                  <button
                    class="accordion-button text-white collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    What is included in Afrilearn subscription?
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    Subscription includes unlimited access to all video lessons,
                    audio lessons, class notes, practice quizzes, live classes
                    and more, covering all subjects and topics, in your chosen
                    class. Brace yourself for a profoundly life-changing
                    experience.
                  </div>
                </div>
              </div>
              <div class="card">
                <h2 class="accordion-header text-white" id="headingThree">
                  <button
                    class="accordion-button text-white collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    How much does Afrilearn cost?
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    Afrilearn has a variety of plans to suit your learning
                    goals. Subscription Plans include Monthly - ₦999 ($2.99),
                    Quarterly - ₦2499 ($6.99), Bi-Annual - ₦4999 ($13.99),
                    Annual - ₦9999 ($26.99).
                  </div>
                </div>
              </div>
              <div class="card">
                <h2 class="accordion-header text-white" id="headingFour">
                  <button
                    class="accordion-button text-white collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    Where can I watch?
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    You can learn on Afrilearn via your smartphone, tablet,
                    Smart TV, laptop, or streaming device. Learn as much as you
                    want, whenever you want without a single commercial – all
                    for one low monthly price.
                  </div>
                </div>
              </div>
              <div class="card">
                <h2 class="accordion-header text-white" id="headingFive">
                  <button
                    class="accordion-button text-white collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="false"
                    aria-controls="collapseFive"
                  >
                    How do I cancel?
                  </button>
                </h2>
                <div
                  id="collapseFive"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingFive"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    Our focus is to transform users into ambassadors through the
                    best learning experience possible. You can easily cancel
                    your subscription in two clicks. If you have more questions,
                    please click{" "}
                    <Link to="/contact">
                      <b>contact us</b>
                    </Link>
                    . We’re super happy to help!
                  </div>
                </div>
              </div>
              <div class="card">
                <h2 class="accordion-header text-white" id="headingSix">
                  <button
                    class="accordion-button text-white collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseSix"
                    aria-expanded="false"
                    aria-controls="collapseSix"
                  >
                    Got more questions?
                  </button>
                </h2>
                <div
                  id="collapseSix"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingSix"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    We’ve got you! Simply{" "}
                    <Link to="/faq">
                      <u>CLICK HERE</u>
                    </Link>{" "}
                    to visit our{" "}
                    <Link to="/faq">
                      <u>COMPLETE FAQ PAGE</u>
                    </Link>
                    , which regularly gets updated based on new data and insights
                    from our awesome users.
                  </div>
                </div>
              </div>
            </div>
            
            <h6 className="center push88">
              Ready to learn? Simply enter your email!
            </h6>
            <div className="row">
              <div className="col-2"></div>
              <div className="col-5 paddingRightOff">
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={handleChange1}
                />
              </div>
              <div className="col-3 paddingLeftOff">
                <Link to="/register">
                  <input
                    type="submit"
                    value="Start Learning"
                    className="lastbee"
                  />
                </Link>
              </div>
              <div className="col-2"></div>
            </div>     
           </div>
          <div className="col-md-2"> </div>
        </div>
        <div className="row supporter">
          <h1 className="hOne">Key Supporters</h1>
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <SupportersSlide/>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
      <Footer/>
    </span>
  );
};

Homepage.propTypes = {
  inputChange: PropTypes.func.isRequired,
  getRoles: PropTypes.func.isRequired,
  populateAfrilearnTopTenVideos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  classes: state.auth.classes,
  classLabel: state.auth.classLabel,
  email: state.auth.email,
  numberOfClassNote: state.auth.numberOfClassNote,
  numberOfQuizQuestions: state.auth.numberOfQuizQuestions,
  students: state.auth.students,
  teachers: state.auth.teachers,
  allUsers: state.auth.allUsers,
  afrilearnTopTenVideoLoader: state.course.afrilearnTopTenVideoLoader,
  afrilearnTopTenVideos: state.course.afrilearnTopTenVideos,
  rolesLoader: state.auth.rolesLoader,
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { inputChange, getRoles, populateAfrilearnTopTenVideos })(Homepage);
