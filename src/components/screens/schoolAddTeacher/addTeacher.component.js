import React, { useEffect, useRef } from 'react'
import './css/style.css'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  inputChange,
  getRoles,
  registerNewChild,
  loginUser
} from '../../../redux/actions/authActions'
import { clearErrors } from '../../../redux/actions/errorActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import Swal from 'sweetalert2'
import 'animate.css'
import queryString from 'query-string'

const SchoolAddTeacherToClass = props => {
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
    parent,
    error
  } = props
  const history = useHistory()
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
      if (error.id === 'REGISTER_NEW_CHILD_FAILURE') {
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
      if (error.id === 'REGISTER_NEW_CHILD_SUCCESS') {
        Swal.fire({
          html: `<div>${error.msg}</div>`,
          icon: 'success',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
          confirmButtonText: 'Okay',
          didClose: () => {
            history.push('/children')
          }
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
    //   const user = {
    //     role: '5fd08fba50964811309722d5',
    //     courseId,
    //     fullName,
    //     email,
    //     password,
    //     confirmPassword,
    //     className,
    //     parentId: parent._id
    //   }
    //   props.registerNewChild(user, true)
    Swal.fire({
        html: `<div>Invite to ${fullName} sent successfully</div>`,
        icon: 'success',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        confirmButtonText: 'Okay',
      })
    
    }
  }

  const roleSet = () => {
    if (roles.length) {
      return roles.map(item => {
        return (
          <option value={item._id} key={item._id}>
            {item.name}
          </option>
        )
      })
    }
  }

  const classSet = () => {
    if (classes.length) {
      return classes.map(item => {
        return (
          <option value={item._id} key={item._id}>
            {item.name}
          </option>
        )
      })
    }
  }
  return (
    <span id='school-add-teacher'>
      {/* {redirect ? <Redirect to={authlocation} /> : null} */}
      <div id='school-add-teacher-first-section'></div>
      <div id='school-add-teacher-second-section' className='container-fluid'>
        <div className='d-flex justify-content-center'>
          <div className='form-field'>
            <div className='row'>
              <form onSubmit={handleSubmit}>
                <div className='col-md-12'>
                  <h3>Add New Teacher</h3>
                  <div
                    style={{ fontSize: '.8em', color: 'rgba(255,255,255,.7)' }}
                  >
                    Send invite to your teachers for them to access the virtual
                    classroom
                  </div>
                </div>
                <div className='col-md-12'>
                  <select
                    className='general no-appearance'
                    name='role'
                    value='602f3ce39b146b3201c2dc1d'
                    disabled
                  >
                    <option disabled value='602f3ce39b146b3201c2dc1d'>
                      Teacher
                    </option>
                  </select>
                </div>
                <div className='col-md-12'>
                  <select
                    className={`general ${
                      parsed.courseId ? 'no-appearance' : ''
                    }`}
                    name='formCourseId'
                    value={parsed.courseId || courseId}
                    onChange={handleChange}
                    disabled={parsed.courseId}
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
                    name='formFullName'
                    value={fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className='col-md-12'>
                  <input
                    type='email'
                    placeholder='Email'
                    className='general'
                    name='formEmail'
                    value={email}
                    onChange={handleChange}
                  />
                </div>
                <div className='col-md-12 mt-3'>
                  <input
                    type='submit'
                    value='Send Invite'
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

SchoolAddTeacherToClass.propTypes = {
  inputChange: PropTypes.func.isRequired,
  getRoles: PropTypes.func.isRequired,
  registerNewChild: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  parent: state.auth.user,
  redirect: state.auth.redirect,
  authlocation: state.auth.location,
  role: state.auth.role,
  courseId: state.auth.formCourseId,
  fullName: state.auth.formFullName,
  email: state.auth.formEmail,
  password: state.auth.formPassword,
  confirmPassword: state.auth.formConfirmPassword,
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
  registerNewChild,
  clearErrors,
  loginUser
})(SchoolAddTeacherToClass)
