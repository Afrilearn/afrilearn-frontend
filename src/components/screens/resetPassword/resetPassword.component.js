import React, { useEffect, useRef } from "react";
import './css/style.css';
import { Link } from "react-router-dom";

const ResetPassword = props => {  
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
		<span>   
            <div id="resetPassword" className="container-fluid relative">                         
                <div className="row fly">
                     <div className="overlay overlayAuth"></div>                   
                        <div className="col-md-12">
                            <h3>Forgot Password</h3>
                            <p>Enter email address to get change password link</p>
                        </div>                       
                        <div className="col-md-12">
                           <input type="email" placeholder="Email" className="general"/>
                        </div>                                        
                        <div className="col-md-12">
                           <input type="submit" value="Reset" className="general"/>
                        </div> 
                        <div className="col-md-12 push center">
                          <b className="white">&nbsp; <Link to="/login">Log in</Link></b>
                        </div>                   
                </div>
            </div>
        </span>
	);
};

export default ResetPassword;