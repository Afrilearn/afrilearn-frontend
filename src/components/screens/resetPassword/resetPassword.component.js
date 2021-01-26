import React, { useEffect, useRef } from "react";
import './css/style.css';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { inputChange, resetPassword  } from './../../../redux/actions/authActions';
import { clearErrors } from './../../../redux/actions/errorActions';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import 'animate.css';

const ResetPassword = props => {     
    const {
        email,     
        error
    } = props; 

    const mounted = useRef(); 
    useEffect(()=>{
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
            window.scrollTo(0, 0);            
        } else {
            if(error.id === 'RESET_PASSWORD_FAILURE' || error.id === 'RESET_PASSWORD_SUCCESS'){           
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
                    // position: 'top-end',,
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
        if (!email) {
            Swal.fire({
                title: 'Please enter email',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                },
                timer: 1500,
                // position: 'top-end',,
            })
        }else{  
            props.resetPassword(email);
        }
    }

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
                           <input type="email" placeholder="Email" className="general" name="email" value={email} onChange={handleChange}/>
                        </div>                                        
                        <div className="col-md-12">
                           <input type="submit" value="Reset" className="general" onClick={handleSubmit}/>
                        </div> 
                        <div className="col-md-12 push center">
                          <b className="white">&nbsp; <Link to="/login">Log in</Link></b>
                        </div>                   
                </div>
            </div>
        </span>
	);
};

ResetPassword.propTypes = {
    inputChange: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
    email: state.auth.email,   
    error: state.error
});
export default connect(mapStateToProps, {inputChange, clearErrors, resetPassword})(ResetPassword);