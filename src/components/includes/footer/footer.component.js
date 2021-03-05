import React from "react";
import { Link } from "react-router-dom";
import "./css/style.css";
import { connect } from "react-redux";

const Footer = (props) => {
  const { students, numberOfClassNote, numberOfQuizQuestions } = props;

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <span id="footer">
      <div className="container-fluid">
        <div className="row r1">
          <div className="col-md-4">
            <h6>Why Afrilearn?</h6>
            <p className="p1">
              Afrilearn actively leverages genius tutors,
              animators, and developers to provide affordable, world-class
              education for Africans, anywhere.
            </p>
          </div>
          <div className="col-md-2 partTwo">
            <h6>About</h6>
            <ul>
              {/* <li><Link>Blog</Link></li> */}
              <li>
                <a href="/contact#career">Media</a>
              </li>
              <li>
                <a href="/contact#career">Careers</a>
              </li>
              <li>
                <a href="/about#team">Our Team</a>
              </li>
              <li>
                <Link to="/partnership">Partnership</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3 partThree">
            <h6>Contact</h6>
            <ul>
              <li className="hh">
                <img
                  className="logo1"
                  src={require("../../../assets/img/Email.svg")}
                  alt="Logo"
                />{" "}
                &nbsp;&nbsp;hello@myafrilearn.com
              </li>
              <li className="num">
                <img
                  className="logo2"
                  src={require("../../../assets/img/Phone_Call.png")}
                  alt="Logo"
                />
                + 234 802 785 5262
                <br />{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+234 805 154 4949
              </li>
              <li>
                <img
                  className="logo1"
                  src={require("../../../assets/img/Location PIN.svg")}
                  alt="Logo"
                />{" "}
                &nbsp;&nbsp;6 Gbemisola Street,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Allen Avenue, Ikeja,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lagos, Nigeria.
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h6>Key Stats</h6>
            <p>Registered Students</p>
            <p className="p2"> {students ? numberWithCommas(students) : ""}+</p>
            <p>Rich & Ready Class Notes</p>
            <p className="p2">  
              {numberOfClassNote && numberOfClassNote > 0
                  ? numberWithCommas(numberOfClassNote)
                  : 0}
              +
            </p> 
            <p>Practice Questions</p>
            <p className="p2">  
              {numberOfQuizQuestions && numberOfQuizQuestions > 0
                ? numberWithCommas(18147 + numberOfQuizQuestions)
                : 0}
              +
            </p>                         
          </div>
        </div>
        <div className="row r2">
            <div className="col-md-4">
              <Link to="/"> <img className="logo" src={require('../../../assets/img/logo1.png')} alt='Logo'/></Link>
            </div>
            <div className="col-md-5 listP">
                <ul>
                    <li><Link to="/privacy_policy">Privacy Policy</Link></li>
                    <li><Link to="/privacy_policy">Copyright</Link></li>   
                    <li><Link to="/privacy_policy">Terms of Service</Link></li>                      
                </ul>
            </div>
            <div className="col-md-3 listP1 floatRight right">
                <ul>
                    <li><a href="https://www.instagram.com/afrilearn/" target="_blank"  rel="noopener noreferrer"><img className="logo5" src={require('../../../assets/img/Instagram.svg')} alt='Instagram'/></a></li>       
                    <li><a href="https://web.facebook.com/myAfrilearn" target="_blank"  rel="noopener noreferrer"><img className="logo5" src={require('../../../assets/img/Facebook1.svg')} alt='Facebook'/></a></li>
                    <li><a href="https://twitter.com/Afrilearn" target="_blank"  rel="noopener noreferrer"><img className="logo5" src={require('../../../assets/img/Twitter.svg')} alt='Twitter'/></a></li>  
                    <li><a href="https://www.linkedin.com/company/afrilearn/" target="_blank"  rel="noopener noreferrer"><img className="logo5" src={require('../../../assets/img/linkedin-icon(1).png')} alt='linkedin'/></a></li>                                                                     
                    <li><a href="https://www.youtube.com/channel/UC_BnnokJom1DWipMl0oSxWA" target="_blank"  rel="noopener noreferrer"><img className="logo5" src={require('../../../assets/img/Youtube.svg')} alt='Youtube'/></a></li>  
                </ul>
            </div>
        </div>
    </div>  
</span>       
	);
};

const mapStateToProps = (state) => ({
  students: state.auth.students,
  numberOfClassNote: state.auth.numberOfClassNote,
  numberOfQuizQuestions: state.auth.numberOfQuizQuestions,
});
export default connect(mapStateToProps, null)(Footer);
