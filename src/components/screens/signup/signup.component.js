import React, { useEffect, useRef } from "react";
import './css/style.css';
import { Link } from "react-router-dom";


const Signup = props => {  
    const mounted = useRef(); 
    useEffect(()=>{
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
            window.scrollTo(0, 0);            
        } else {
            // do componentDidUpdate logic          
          } 	       
    })       
   
	return (        
		<span id="signup">   
            <div id="signupFirstSection" className="container-fluid relative">                         
                <div className="row fly">
                     <div className="overlay overlayAuth"></div>                   
                        <div className="col-md-12">
                            <h3>Register</h3>
                        </div>
                        <div className="col-md-12">
                            <select className="general">
                                <option>Select a role</option>
                                <option>Student</option>
                                <option>Teacher</option>                         
                            </select>
                        </div>
                        <div className="col-md-12">
                            <select className="general">
                                <option>Select class</option>
                                <option>Primary One</option>
                                <option>Primary Two</option>                         
                            </select>
                        </div>
                        <div className="col-md-12">
                           <input type="text" placeholder="Full Name" className="general"/>
                        </div>
                        <div className="col-md-12">
                           <input type="email" placeholder="Email" className="general"/>
                        </div>
                        <div className="col-md-12">
                           <input type="password" placeholder="Password" className="general"/>
                        </div>
                        <div className="col-md-12 relative">
                           <input type="text" placeholder="Referral Code" className="general"/>
                           <p className="optional"><i>Optional</i></p>
                        </div>
                        <div className="col-md-12">
                           <input type="submit" value="Register" className="general"/>
                        </div>
                        <div className="col-md-12">
                           <div className="row push">
                                <div className="col-md-6">
                                    <Link><span className="socialText"><img className="social" src={require('../../../assets/img/google.png')} alt="google"/> Register with Google</span></Link>
                                </div>
                                <div className="col-md-6 push7">
                                    <Link><span className="socialText"><img className="social" src={require('../../../assets/img/facebook.png')} alt="facebook"/> Register with Facebook</span></Link>
                                </div>
                           </div>
                        </div>
                        <div className="col-md-12 socialText push">
                            Already have an account? <b className="white">&nbsp; <Link>Login</Link></b>
                        </div> 
                  
                </div>
            </div>
        </span>
	);
};

export default Signup;