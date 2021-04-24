import React, { useEffect, useRef } from 'react'
import './css/style.css'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  inputChange,
  getRoles,
  registerUser,
  loginUser
} from './../../../redux/actions/authActions'
import { clearErrors } from './../../../redux/actions/errorActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import Swal from 'sweetalert2'
import 'animate.css'
import { GoogleLogin } from 'react-google-login'
import queryString from 'query-string'

const ParentChildRegistration = props => {
  const {
    role,
    courseId,
    fullName,
    email,
    password,
    confirmPassword,
    roles,
    classes,
    redirect,
    authlocation,
    passwordMode,
    confirmPasswordMode,
    className,
    error
  } = props

  const parsed = queryString.parse(props.location.search)
  const mounted = useRef()
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true
      window.scrollTo(0, 0)
      props.inputChange('redirect', false)
      if (!roles.length) {
        props.getRoles()
      }
    } else {
      if (error.id === 'REGISTER_FAILURE') {
        const message =
          typeof error.msg === 'object' ? error.msg.join('<br/>') : error.msg
        Swal.fire({
          html: message,
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
          timer: 3500
          // position: 'top-end',,
        })
        props.clearErrors()
      }
      if (error.id === 'REGISTER_SUCCESS') {
        Swal.fire({
          html: `<div>${error.msg}</div>`,
          icon: 'success',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
          confirmButtonText: 'Okay'
        })
        props.clearErrors()
      }
    }
  })

  const handleChange = e => {
    const target = e.target
    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value
    props.inputChange(name, value)
  }

  const handlePasswordMode = () => {
    if (passwordMode) {
      props.inputChange('passwordMode', false)
    } else {
      props.inputChange('passwordMode', true)
    }
  }
  const handleConfirmPasswordMode = () => {
    if (confirmPasswordMode) {
      props.inputChange('confirmPasswordMode', false)
    } else {
      props.inputChange('confirmPasswordMode', true)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    let message = ''
    if (!courseId) {
      message = 'Please select a class'
    } else if (!fullName) {
      message = 'Please enter full name'
    } else if (!email) {
      message = 'Please enter email'
    } else if (!password) {
      message = 'Please enter password'
    } else if (!confirmPassword) {
      message = 'Please confirm your password'
    } else if (password !== confirmPassword) {
      message = 'Passwords dont match'
    }

    if (message) {
      Swal.fire({
        title: message,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        timer: 1500
        // position: 'top-end',,
      })
    } else {
      const user = {
        role: '5fd08fba50964811309722d5',
        courseId,
        fullName,
        email,
        password,
        confirmPassword,
        className
      }
      props.registerUser(user, true)
    }
  }

  const roleSet = () => {
    if (roles.length) {
      return roles.map(item => {
        return <option value={item._id}>{item.name}</option>
      })
    }
  }

  const classSet = () => {
    if (classes.length) {
      return classes.map(item => {
        return <option value={item._id}>{item.name}</option>
      })
    }
  }

  const onFailure = error => {
    console.log(error)
  }

  const googleLoginResponse = googleUser => {
    let token = googleUser.tokenId
    const data = {
      token
    }
    props.loginUser(data, true)
  }

  const facebookLoginResponse = response => {
    let token = response.accessToken

    const data = {
      token
    }
    props.loginUser(data, false, true)
  }
  return (
    <span id='parent-child-reg'>
      {/* {redirect ? <Redirect to={authlocation} /> : null} */}
      <div id='parent-child-reg-first-section'></div>
      <div id='parent-child-reg-second-section' className='container-fluid'>
        <div className='d-flex justify-content-center'>
          <div className='form-field'>
            <div className='row'>
              <form onSubmit={handleSubmit}>
                <div className='col-md-12'>
                  <h3 className='center'>Register</h3>
                  <div
                    className='center'
                    style={{ fontSize: '.8em', color: 'rgba(255,255,255,.7)' }}
                  >
                    Register your child as a student on Afrilearn to start
                    enjoying unlimited access to curriculum relevant classnotes
                    and video lessons
                  </div>
                </div>
                <div className='col-md-12'>
                  <select
                    className='general no-appearance'
                    name='role'
                    value='5fd08fba50964811309722d5'
                    disabled
                  >
                    <option disabled value='5fd08fba50964811309722d5'>
                      Student
                    </option>
                  </select>
                </div>
                <div className='col-md-12'>
                  <select
                    className='general'
                    name='courseId'
                    value={courseId}
                    onChange={handleChange}
                  >
                    <option>Select class</option>
                    {classSet()}
                  </select>
                </div>
                {role === '602f3ce39b146b3201c2dc1d' ? (
                  <div className='col-md-12'>
                    <input
                      type='text'
                      placeholder='Class Name'
                      className='general'
                      name='className'
                      value={className}
                      onChange={handleChange}
                    />
                  </div>
                ) : (
                  ''
                )}
                <div className='col-md-12'>
                  <input
                    type='text'
                    placeholder='Full Name'
                    className='general'
                    name='fullName'
                    value={fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className='col-md-12'>
                  <input
                    type='email'
                    placeholder='Email'
                    className='general'
                    name='email'
                    value={email}
                    onChange={handleChange}
                  />
                </div>
                <div className='col-md-12 relative d-flex align-items-center'>
                  <input
                    type={passwordMode ? 'password' : 'text'}
                    placeholder='Password'
                    className='general'
                    name='password'
                    value={password}
                    onChange={handleChange}
                  />
                  <Link className='password-eye' onClick={handlePasswordMode}>
                    <FontAwesomeIcon
                      icon={faEye}
                      color='rgba(255,255,255,0.8)'
                    />
                  </Link>
                </div>
                <div className='col-md-12 relative d-flex align-items-center'>
                  <input
                    type={confirmPasswordMode ? 'password' : 'text'}
                    placeholder='Confirm Password'
                    className='general'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleChange}
                  />
                  <Link
                    className='password-eye'
                    onClick={handleConfirmPasswordMode}
                  >
                    <FontAwesomeIcon
                      icon={faEye}
                      color='rgba(255,255,255,0.8)'
                    />
                  </Link>
                </div>
                <div className='col-md-12'>
                  <input
                    type='submit'
                    value='Register'
                    className='general authSubmit'
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </span>
  )
}

ParentChildRegistration.propTypes = {
  inputChange: PropTypes.func.isRequired,
  getRoles: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  redirect: state.auth.redirect,
  authlocation: state.auth.location,
  role: state.auth.role,
  courseId: state.auth.courseId,
  fullName: state.auth.fullName,
  email: state.auth.email,
  password: state.auth.password,
  confirmPassword: state.auth.confirmPassword,
  referralCode: state.auth.referralCode,
  roles: state.auth.roles,
  classes: state.auth.classes,
  className: state.auth.className,
  passwordMode: state.auth.passwordMode,
  confirmPasswordMode: state.auth.confirmPasswordMode,
  error: state.error
})
export default connect(mapStateToProps, {
  inputChange,
  getRoles,
  registerUser,
  clearErrors,
  loginUser
})(ParentChildRegistration)
