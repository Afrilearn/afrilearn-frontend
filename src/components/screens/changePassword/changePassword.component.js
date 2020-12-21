import React, { useEffect, useRef } from "react";
import './css/style.css';
import { Link } from "react-router-dom";

const ChangePassword = props => {  
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
            <div id="changePassword" className="container-fluid relative">                         
                <div className="row fly">
                     <div className="overlay overlayAuth"></div>                   
                        <div className="col-md-12">
                            <h3>Change Password</h3>
                            <p>Enter your new password</p>
                        </div>                       
                        <div className="col-md-12">
                           <input type="password" placeholder="Password" className="general"/>
                        </div>  
                        <div className="col-md-12">
                           <input type="password" placeholder="Confirm Password" className="general"/>
                        </div>                                        
                        <div className="col-md-12">
                           <input type="submit" value="Change" className="general"/>
                        </div> 
                        <div className="col-md-12 push center">
                          <b className="white">&nbsp; <Link to="/login">Log in</Link></b>
                        </div>                   
                </div>
            </div>
        </span>
	);
};

export default ChangePassword;