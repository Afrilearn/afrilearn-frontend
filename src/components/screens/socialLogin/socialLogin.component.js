import React, { useEffect, useRef } from "react";
import './css/style.css';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { inputChange, getRoles, socialLoginUpdate, courseEnrolment } from './../../../redux/actions/authActions';
import { clearErrors } from './../../../redux/actions/errorActions';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import 'animate.css';

const SocialSignup = props => {  
    const {
        role, 
        activeEnrolledCourseId,       
        error,
        roles,
        classes,
        userId,
        redirect,
        location
    } = props;

    const mounted = useRef(); 
    useEffect(()=>{
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
            window.scrollTo(0, 0);  
            props.inputChange('redirect', false)             
            if(!roles.length) {
                props.getRoles();  
            }  
        } else {                
                if(error.id === 'SOCIAL_LOGIN_FAILURE'){           
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

    const handleSubmit = () => {
        let message;
        if (!role) {
            message='Please select a role';             
        } else if (!activeEnrolledCourseId) {
            message='Please select a class';   
        } 

        if(!role || !activeEnrolledCourseId){               
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
                role                          
            };   
            const course = {
                userId,
                courseId:activeEnrolledCourseId                          
            };           
            props.socialLoginUpdate(user);        
            props.courseEnrolment(course)   
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
            <div id="socialSignupFirstSection" className="container-fluid relative">                         
                <div className="row fly">
                     <div className="overlay overlayAuth"></div>                   
                        <div className="col-md-12">
                            <h3>Social Signup</h3>
                        </div>
                        <div className="col-md-12">
                            <select className="general" name="role" value={role} onChange={handleChange}>
                                <option>Select a role</option>
                                {roleSet()}                      
                            </select>
                        </div>
                        <div className="col-md-12">
                            <select className="general" name="activeEnrolledCourseId" value={activeEnrolledCourseId} onChange={handleChange}>
                                <option>Select class</option>
                                {classSet()}                         
                            </select>
                        </div>                       
                        <div className="col-md-12">
                           <input type="submit" value="Update" className="general" onClick={handleSubmit}/>
                        </div>
                </div>
            </div>
        </span>
	);
};

SocialSignup.propTypes = {
    inputChange: PropTypes.func.isRequired,
    getRoles: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired  
};

const mapStateToProps = (state) => ({
    redirect: state.auth.redirect,   
    location: state.auth.location, 
    role: state.auth.role, 
    activeEnrolledCourseId: state.auth.activeEnrolledCourseId,  
    roles: state.auth.roles,  
    classes: state.auth.classes,    
    error: state.error,
    userId: state.auth.userId
});
export default connect(mapStateToProps, {inputChange, getRoles, clearErrors, socialLoginUpdate, courseEnrolment})(SocialSignup);