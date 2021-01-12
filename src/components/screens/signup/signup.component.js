import React, { useEffect, useRef } from "react";
import './css/style.css';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { inputChange, getRoles, registerUser } from './../../../redux/actions/authActions';
import { clearErrors } from './../../../redux/actions/errorActions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faEye } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import 'animate.css';

const Signup = props => {  
    const {
        role, 
        activeClass, 
        fullName, 
        email, 
        password,    
        referralCode,  
        roles,
        classes,
        redirect,
        location,
        passwordMode,
        error
    } = props;

    const mounted = useRef(); 
    useEffect(()=>{
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
            window.scrollTo(0, 0);  
            props.inputChange('redirect', false)    
            props.getRoles();      
        } else {
                
                if(error.id === 'REGISTER_FAILURE'){           
                    const message = typeof(error.msg) === 'object' ? error.msg.join('<br/>'): error.msg   
                    Swal.fire({
                        html: message,
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        },
                        timer: 3500,
                        position: 'top-end',
                    })                      
                    props.clearErrors();
                }       
            } 	       
    }) 
    
    const handleChange = (e)=> {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        props.inputChange(name, value);
    }

    const handlePasswordMode = () =>{
        if(passwordMode){
            props.inputChange('passwordMode', false);
        }else{
            props.inputChange('passwordMode', true); 
        }
    }

    const handleSubmit = () => {
        let message;
        if (!role) {
            message='Please select a role';             
        } else if (!activeClass) {
            message='Please select a class';   
        } else if (!fullName) {
            message='Please enter full name';   
        } else if (!email) {
            message='Please enter email';  
        } else if (!password) {
            message='Please enter password';  
        } 

        if(!role || !activeClass || !fullName || !email || !password){               
            Swal.fire({
                title: message,
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                },
                timer: 1500,
                position: 'top-end',
            })
        }else{          
            const user = {
                role,
                activeClass,
                fullName,
                email,
                password,
                confirmPassword: password,               
            };         
            props.registerUser(user);
        }
    }

    const roleSet = () => {
        if (roles.length) {         
          return roles.map((item) => {
            return <option value={item._id}>{item.name}</option>;
          });
        }
    };

    const classSet = () => {
        if (classes.length) {         
          return classes.map((item) => {
            return <option value={item._id}>{item.name}</option>;
          });
        }
    };
	return (        
		<span id="signup">  
            {redirect ? <Redirect to={location} /> : null} 
            <div id="signupFirstSection" className="container-fluid relative">                         
                <div className="row fly">
                     <div className="overlay overlayAuth"></div>                   
                        <div className="col-md-12">
                            <h3>Register</h3>
                        </div>
                        <div className="col-md-12">
                            <select className="general" name="role" value={role} onChange={handleChange}>
                                <option>Select a role</option>
                                {roleSet()}                      
                            </select>
                        </div>
                        <div className="col-md-12">
                            <select className="general" name="activeClass" value={activeClass} onChange={handleChange}>
                                <option>Select class</option>
                                {classSet()}                         
                            </select>
                        </div>
                        <div className="col-md-12">
                           <input type="text" placeholder="Full Name" className="general" name="fullName" value={fullName} onChange={handleChange}/>
                        </div>
                        <div className="col-md-12">
                           <input type="email" placeholder="Email" className="general" name="email" value={email} onChange={handleChange}/>
                        </div>
                        <div className="col-md-12 relative">
                           <input type={passwordMode? 'password':'text'} placeholder="Password" className="general" name="password" value={password} onChange={handleChange}/>
                           <Link onClick={handlePasswordMode}><FontAwesomeIcon icon={faEye} /></Link>
                        </div>
                        <div className="col-md-12 relative">
                           <input type="text" placeholder="Referral Code" className="general" name="referralCode" value={referralCode} onChange={handleChange}/>
                           <p className="optional"><i>Optional</i></p>
                        </div>
                        <div className="col-md-12">
                           <input type="submit" value="Register" className="general" onClick={handleSubmit}/>
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
                            Already have an account? <b className="white">&nbsp; <Link to="/login">Log in</Link></b>
                        </div> 
                  
                </div>
            </div>
        </span>
	);
};

Signup.propTypes = {
    inputChange: PropTypes.func.isRequired,
    getRoles: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
    redirect: state.auth.redirect,   
    location: state.auth.location, 
    role: state.auth.role, 
    activeClass: state.auth.activeClass, 
    fullName: state.auth.fullName, 
    email: state.auth.email, 
    password: state.auth.password, 
    confirmPassword: state.auth.confirmPassword, 
    referralCode: state.auth.referralCode,  
    roles: state.auth.roles,  
    classes: state.auth.classes, 
    passwordMode: state.auth.passwordMode, 
    error: state.error
});
export default connect(mapStateToProps, {inputChange, getRoles, registerUser, clearErrors})(Signup);