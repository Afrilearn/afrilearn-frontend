import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./css/style.css";
import AppreciationBox from "../../includes/appreciationSlick.component";
import SupportersSlide from "../../includes/supportersSlide.component";
import Footer from "../../includes/footer/footer.component";
import Particles from "react-tsparticles";
import { connect } from "react-redux";
import { inputChange, getRoles } from "./../../../redux/actions/authActions";
import PropTypes from "prop-types";
import PaticleOption from "../../../assets/js/particles";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap_white.css";
import slugify from "react-slugify";

const Homepage = (props) => {
  const {
    classLabel,
    classes,
    email,
    numberOfClassNote,
    numberOfQuizQuestions,
    students,
    teachers,
    allUsers
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
        props.getRoles();
      }    
     
    } else {
      // do componentDidUpdate logic
      
    }
  });
  
  const classSet = () => {
    if (classes.length) {

      let list = [];

      for(let i = 0; i<classes.length; i++){
          if(classes[i].categoryId === '605b218f8636bc00158b4ad7'){
              list.push(classes[i])
          }
      }

      for(let j = 0; j<classes.length; j++){
        if(classes[j].categoryId === '605b21868636bc00158b4ad6'){
            list.push(classes[j])
        }
      }
          
      return list.map((item) => {
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

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    props.inputChange(name, value);
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
   
 
  return (
    <span id="homepage" oncontextmenu="return false"  onkeydown="return false;" onmousedown="return false;">
      <div className="container-fluid bannerSection">
        <div className="row">
          <div className="col-md-3"> </div>
          <div className="col-md-6 box">
            <h1>Get Ahead with Afrilearn!</h1>
            <h4>
              We provide every Secondary School Student freedom to
              learn curriculum-relevant subjects and topics anytime, anywhere.
            </h4>
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
                      <input type="submit" value="JOIN FOR FREE" />
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
                <img
                  src={require("../../../assets/img/Group 68.png")}
                  className="myIcon"
                  alt="Genius Content"
                />
              </div>
              <div className="col-10 paddingLeftOff">
                <h5>Genius Content</h5>
                <p>
                  Enjoy unlimited video lessons, class notes, practice quizzes
                  created by top tutors for high-flying students.
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
                  NECO, GCE, UTME, SAT and more.
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
                  School or Teacher? Access ready video lessons and class notes
                  to accelerate your students’ learning.
                </p>
              </div>
            </div>
          </div>
        </div>{" "}
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
        <div className="row students relative">
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
                      src={require("../../../assets/img/5 - Presentation.png")}
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
                    Afrilearn is an education streaming service that provides
                    West African Secondary School Students (JSS1-SS3) freedom to learn curriculum-relevant
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
                      <b><u>CLICK HERE</u></b>
                    </Link>{" "}
                    to visit our{" "}
                    <Link to="/faq">
                      <b><u>COMPLETE FAQ PAGE</u></b>
                    </Link>
                    , which regularly gets updated based on new data insights
                    from our awesome users.
                  </div>
                </div>
              </div>
            </div>
            {/* New  */}

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
                  onChange={handleChange}
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
});
export default connect(mapStateToProps, { inputChange, getRoles })(Homepage);
