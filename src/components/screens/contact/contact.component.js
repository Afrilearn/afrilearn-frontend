import React, { useEffect, useRef } from "react";
import './css/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faLocationArrow, faMailBulk} from '@fortawesome/free-solid-svg-icons';
import PressBox from './../../includes/pressBoxSlick.component';
import Footer from "../../includes/footer/footer.component";
import { getRoles } from "./../../../redux/actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Contact = props => {  
    const mounted = useRef();
    const {   
        classes     
    } = props; 
    useEffect(()=>{
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
            window.scrollTo(0, 0); 
            if(!classes.length){
                props.getRoles();
            }            
        } else {
            // do componentDidUpdate logic          
          } 	       
    })       
   
	return (        
		<span id="contact">   
            <div id="contactFirstSection" className="container-fluid relative">
                <div className="overlay"></div>
                <div className="row">                   
                    <div className="col-md-5">               
                        <h1 className="bold">We'd absolutely love to hear from you!</h1>
                        <hr/><br/>
                        <h3>Please fill the form below and we will get back to you as soon as possible.</h3>                    
                    </div>  
                    <div className="col-md-7"> 
                       
                     </div>          
                </div>        
            </div>
            <div  id="contactSecondSection" className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <span>
                            <div className="row">
                                <div className="col-md-12">
                                    <h2 className="boldFont">Contact details</h2>
                                    <p className="p1">Kindly get in touch</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2">
                                    <FontAwesomeIcon icon={faLocationArrow} />  
                                </div>
                                <div className="col-10">
                                    <h5>Corporate Address</h5>
                                    <p>6 Gbemisola Street, opposite Kalakuta Museum, First Bank Bus stop, Allen Avenue, Ikeja Lagos</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2">
                                    <FontAwesomeIcon icon={faPhoneAlt} />  
                                </div>
                                <div className="col-10">
                                    <h5>Telephone</h5>
                                    <p>[+234]  802 785 5262, [+234] 805 154  4949</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2">
                                    <FontAwesomeIcon icon={faMailBulk} />  
                                </div>
                                <div className="col-10">
                                    <h5>Email</h5>
                                    <p>hello@myafrilearn.com</p>
                                </div>
                            </div>
                        </span>
                    </div>
                    <div className="col-md-8 formPart">
                        <div className="row">
                            <div className="col-md-12">
                                <h2 className="boldFont">Send a message</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <input type="email" placeholder="Email"/>
                            </div>
                            <div className="col-md-6">
                                <input type="text" placeholder="Phone"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <textarea rows="8">

                                </textarea>
                            </div>                         
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                               <input type="submit" value="Send message"/>
                            </div>                         
                        </div>
                    </div>
                </div>
            </div>
            <a href="/" name="career">&nbsp;</a>
            <div id="contactThirdSection" className="container-fluid">
                <div className="row">
                    <div className="col-md-6 partOne">
                        <span>
                            <div className="row">
                                <div className="col-md-12">
                                    <h2 className="boldFont">Careers</h2>
                                    <h5>Inspire Africa to love learning!</h5>
                                    <p>We're learners first, and we’re passionate about making learning fun. Join us and grow your career at Afrilearn.<br/><br/>Please follow our <a href="https://www.linkedin.com/company/afrilearn/" target="_blank" rel="noopener noreferrer">LinkedIn page</a> for fresh openings.</p>
                                </div>
                            </div>
                        </span>
                    </div>
                    <div className="col-md-6 partOne">
                        <span>
                            <div className="row">
                                <div className="col-md-12">
                                    <h2 className="boldFont">Press</h2>                                 
                                </div>
                            </div> 
                            <div className="row">
                                <div className="col-md-12">
                                   <PressBox/>
                                </div>                                
                            </div> 
                        </span>
                    </div>
                </div>
            </div>
            <Footer/>
      </span>
	);
};

Contact.propTypes = {   
    getRoles: PropTypes.func.isRequired,
};
  
const mapStateToProps = (state) => ({
    classes: state.auth.classes   
});
export default connect(mapStateToProps, { getRoles })(Contact);