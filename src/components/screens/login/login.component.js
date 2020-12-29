import React, { useEffect, useRef } from "react";
import './css/style.css';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { inputChange } from './../../../redux/actions/authActions';
import PropTypes from 'prop-types';
import { CustomInput } from 'reactstrap';


const Login = props => {  
    const mounted = useRef(); 
    useEffect(()=>{
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
            window.scrollTo(0, 0);  
            props.inputChange('redirect', false)          
        } else {
            props.inputChange('redirect', false)  
            // do componentDidUpdate logic          
          } 	       
    }) 
    
    const handleSubmit = () =>{
        props.inputChange('location', '/classes/87687/9000')
        props.inputChange('redirect', true)
    }
    const { redirect, location } = props;
   
	return (        
		<span id="login">  
            {redirect ? <Redirect to={location} /> : null}  
            <div id="loginFirstSection" className="container-fluid relative">                         
                <div className="row fly">
                     <div className="overlay overlayAuth"></div>                   
                        <div className="col-md-12">
                            <h3>Log in</h3>
                        </div>                       
                        <div className="col-md-12">
                           <input type="email" placeholder="Email" className="general"/>
                        </div>
                        <div className="col-md-12 relative">
                           <input type="password" placeholder="Password" className="general"/>
                           <p className="optional"><Link to="/reset_password"><i>Forgot Password?</i></Link></p>
                        </div>                       
                        <div className="col-md-12">
                           <input type="submit" value="Login" className="general" onClick={handleSubmit}/>
                        </div>
                        <div className="col-md-12 socialText">
                           <div className="row push">
                                <div className="col-6">
                                    <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Remember me" />                          
                                </div>
                                <div className="col-6">
                                    <Link className="floatRight"><u>Need help?</u></Link>
                                </div>
                           </div>
                        </div>
                        <div className="col-md-12">
                           <div className="row push">
                                <div className="col-md-6">
                                    <Link><span className="socialText"><img className="social" src={require('../../../assets/img/google.png')} alt="google"/> Log in with Google</span></Link>
                                </div>
                                <div className="col-md-6 push7">
                                    <Link className="floatRight"><span className="socialText"><img className="social" src={require('../../../assets/img/facebook.png')} alt="facebook"/> Log in with Facebook</span></Link>
                                </div>
                           </div>
                        </div>
                        <div className="col-md-12 socialText push">
                            New to Afrilearn? <b className="white">&nbsp; <Link to="/register">Register</Link></b>
                        </div>                   
                </div>
            </div>
        </span>
	);
};

Login.propTypes = {
    inputChange: PropTypes.func.isRequired 
};
const mapStateToProps = (state) => ({
    redirect: state.auth.redirect,   
    location: state.auth.location, 
});
export default connect(mapStateToProps, {inputChange})(Login);