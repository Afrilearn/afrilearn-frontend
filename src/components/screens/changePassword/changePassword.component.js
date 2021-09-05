import React, { useEffect, useRef } from "react";
import './css/style.css';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { inputChange, changePassword } from './../../../redux/actions/authActions';
import { clearErrors } from './../../../redux/actions/errorActions';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import 'animate.css';
import queryString from "query-string";
import {Helmet} from "react-helmet";
 

const ChangePassword = props => { 
    const {
        password,
        confirmPassword,       
        error        
    } = props; 

    const mounted = useRef(); 
    useEffect(()=>{
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
            window.scrollTo(0, 0);            
        } else {
            if(error.id === 'PASSWORD_CHANGE_SUCCESS' || error.id === 'PASSWORD_CHANGE_FAILURE'){           
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
    
    const handleSubmit = (e) => {
        e.preventDefault();
        let message;
        if (!password) {
            message='Please enter password';  
        } else if (!confirmPassword) {
            message='Please enter password confirmation';  
        } else if(password !== confirmPassword){
            message='Confirm password does not match'; 
        } 

        if(!password || !confirmPassword || password !==confirmPassword){               
            Swal.fire({
                title: message,
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
           
            let code = null;
            let email = null;
            const parsed = queryString.parse(props.location.search);

            if(Object.keys(parsed).length){
                code = parsed.token;
                email = parsed.email; 
            }

            const user = { 
                email,
                password,
                code                           
            };         
            props.changePassword(user);
       
        }
    }
   
	return (        
		<span>  
            <Helmet>
                <meta charSet="utf-8" />
                <title>Change Password | Myafrilearn.com</title>
                <meta name="description" content="Change Password" />
            </Helmet>       
            <div id="changePassword" className="container-fluid relative">                         
                <div className="row fly">
                     <div className="overlay overlayAuth"></div> 
                        <form onSubmit={handleSubmit}>                                        
                            <div className="col-md-12">
                                <h3>Change Password</h3>
                                <p>Enter your new password</p>
                            </div>                       
                            <div className="col-md-12">
                            <input type="password" placeholder="Password" className="general" name="password" value={password} onChange={handleChange}/>
                            </div>  
                            <div className="col-md-12">
                            <input type="password" placeholder="Confirm Password" className="general" name="confirmPassword" value={confirmPassword} onChange={handleChange}/>
                            </div>                                        
                            <div className="col-md-12">
                            <input type="submit" value="Change" className="general authSubmit"/>
                            </div> 
                        </form>  
                        <div className="col-md-12 push center">
                          <b className="white">&nbsp; <Link to="/login">Log in</Link></b>
                        </div>                   
                </div>
            </div>
        </span>
	);
};


ChangePassword.propTypes = {
    inputChange: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
    password: state.auth.password,
    confirmPassword: state.auth.confirmPassword,  
    error: state.error
});
export default connect(mapStateToProps, {inputChange, clearErrors, changePassword})(ChangePassword);