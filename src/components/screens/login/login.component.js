import React, { useEffect, useRef } from "react";
import './css/style.css';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { inputChange, loginUser } from './../../../redux/actions/authActions';
import { clearErrors } from './../../../redux/actions/errorActions';
import PropTypes from 'prop-types';
import { CustomInput } from 'reactstrap';
import Swal from 'sweetalert2';
import 'animate.css';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';


const Login = props => { 
     
    const {
        email, 
        password,    
        redirect,
        location,    
        error
    } = props; 

    const mounted = useRef(); 
    useEffect(()=>{
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
            window.scrollTo(0, 0);  
            props.inputChange('redirect', false)          
        } else {
            if(error.id === 'LOGIN_FAILURE'){           
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
                    // // position: 'top-end',,
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
        e.preventDefault()
        let message;
        if (!email) {
            message='Please enter email';  
        } else if (!password) {
            message='Please enter password';  
        } 

        if(!email || !password){               
            Swal.fire({
                title: message,
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                },
                timer: 1500,
                // position: 'top-end',
            })
        }else{          
            const user = {              
                email,
                password                           
            };         
            props.loginUser(user);
        }
    }

    const onFailure = (error) => { 
        console.log(error);
    }; 

    const googleLoginResponse = (googleUser) => {
        let token = googleUser.tokenId; 
       
        const data ={
			token,		
		}	
		props.loginUser(data, true);
    };

    const facebookLoginResponse = (response) => {
        let token = response.accessToken;
      
        const data ={
            token                     
        }    
        props.loginUser(data, false, true);
    };
     
	return (        
		<span id="login">  
            {redirect ? <Redirect to={location} /> : null}  
            <div id="loginFirstSection" className="container-fluid relative">                         
                <div className="row fly">
                     <div className="overlay overlayAuth"></div> 
                        <form onSubmit={handleSubmit} method="post">                 
                            <div className="col-md-12">
                                <h3>Log in</h3>
                            </div>                       
                            <div className="col-md-12">
                            <input type="email" placeholder="Email" className="general" name="email" value={email} onChange={handleChange}/>
                            </div>
                            <div className="col-md-12 relative">
                            <input type="password" placeholder="Password" className="general" name="password" value={password} onChange={handleChange}/>
                            {/* <p className="optional"><Link to="/reset_password"><i>Forgot Password?</i></Link></p> */}
                            </div>                       
                            <div className="col-md-12">
                            <input type="submit" value="Login" className="general authSubmit"/>
                            </div>
                        </form>
                        <div className="col-md-12 socialText">
                           <div className="row push">
                                <div className="col-6">
                                    <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Remember me" />                          
                                </div>
                                <div className="col-6">
                                    <Link className="floatRight" to="/reset_password"><u>Forgot Password?</u></Link>
                                </div>
                           </div>
                        </div>
                        <div className="col-md-12">
                           <div className="row push">
                                <div className="col-md-6 social google">
                                    <GoogleLogin
                                        clientId="910724713990-2ucr6telcqf9h2hnor2afd8vinmkldl5.apps.googleusercontent.com"
                                        render={renderProps => (
                                        <button onClick={renderProps.onClick} disabled={renderProps.disabled}><span className="socialText"><img className="social" src={require('../../../assets/img/google.png')} alt="google"/> Log in with Google</span></button>
                                        )}
                                        buttonText="Login"
                                        onSuccess={googleLoginResponse}
                                        onFailure={onFailure}
                                        cookiePolicy={'single_host_origin'}
                                    />  
                                </div>
                                <div className="col-md-6 push7 social facebook">
                                    <FacebookLogin
                                        appId='264373944539555'
                                        autoLoad={false}
                                        fields="name,email,picture"
                                        isMobile={false}
                                        redirectUri ='https://www.exambly.com/'
                                        callback={facebookLoginResponse} 
                                        render={renderProps => (
                                            <button onClick={renderProps.onClick}><span className="socialText"><img className="social" src={require('../../../assets/img/facebook.png')} alt="facebook"/> Log in with Facebook</span></button>
                                        )}
                                    />
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
    inputChange: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
    redirect: state.auth.redirect,   
    location: state.auth.location, 
    email: state.auth.email, 
    password: state.auth.password, 
    error: state.error
});
export default connect(mapStateToProps, {inputChange, clearErrors, loginUser})(Login);