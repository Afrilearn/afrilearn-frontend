import React, { useState, useRef, useEffect } from 'react'
import { ReactComponent as Filter } from '../../../assets/img/Filter.svg'
import { ReactComponent as Chevron } from '../../../assets/img/Chevron.svg'
import LessonItem from '../../includes/parentLessonItem/parentLessonItem.component'
import {
  getChildren,
  getCurrentCourseSubjects
} from '../../../redux/actions/parentActions'
import { getSubjectAndRelatedLessons } from '../../../redux/actions/subjectActions'
import { clearErrors } from '../../../redux/actions/errorActions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

import './css/style.css'

const terms = [
  { name: 'First Term', _id: '5fc8d1b20fae0a06bc22db5c' },
  { name: 'Second Term', _id: '600047f67cabf80f88f61735' },
  { name: 'Third Term', _id: '600048197cabf80f88f61736' }
]
const durations = [
  { name: 'Today', value: 1 },
  { name: 'Yesterday', value: 2 },
  { name: 'Last 7 days', value: 7 },
  { name: 'Last One month', value: 30 },
  { name: 'Overall', value: 100 }
]
const padWithZero = num => (num > 9 ? num : '0' + num)

const ParentDashboard = props => {
  const { children, currentCourse, error, courseSubjects, subject } = props
  const [childId, setChildId] = useState('')
  const [selectedSubjectId, setSelectedSubjectId] = useState('')
  const [selectedTermId, setSelectedTermId] = useState('')
  const [courses, setCourses] = useState([])
  const [performanceCourseId, setPerformanceCourseId] = useState('')
  const [lessonsCourseId, setLessonsCourseId] = useState('')
  const [performanceDuration, setPerformanceDuration] = useState(100)

  const getCourse = id => {
    return courses.find(c => c._id === id)
  }
  const getFromArr = (arr, id) => {
    return arr.find(c => c._id === id)
  }

  const mounted = useRef(false)
  const initializedCourse = useRef(false)
  const initializedSubject = useRef(false)

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      props.getChildren()
    }
  })

  const courseIsEnrolled = courseId => {
    let enrolledCourses = []
    children.forEach(child => {
      enrolledCourses = [...enrolledCourses, ...child.enrolledCourses]
    })
    for (let i = 0; i < enrolledCourses.length; i++) {
      if (
        enrolledCourses[i].courseId._id === courseId &&
        enrolledCourses[i].paymentIsActive
      )
        return true
    }
    return false
  }

  const performanceLink = () => {
    if (performanceDuration === 100) {
      return `/child-performance/?courseId=${performanceCourseId}&childId=${childId}`
    } else {
      return `/child-timed-performance/?childId=${childId}&duration=${performanceDuration}&courseId=${performanceCourseId}`
    }
  }

  useEffect(() => {
    let courses_ = []
    children.map(child => {
      let arr = child.enrolledCourses.map(c => c.courseId)
      courses_ = courses_.concat(arr)
    })
    courses_ = courses_.filter((course, index) => {
      return courses_.findIndex(c => c._id === course._id) === index
    })
    setCourses(courses_)
  }, [children])

  useEffect(() => {
    if (!initializedCourse.current && courses.length) {
      setLessonsCourseId(courses[0]._id)
      initializedCourse.current = true
    }
  }, [courses])

  useEffect(() => {
    if (!initializedSubject.current && courseSubjects.length) {
      setSelectedSubjectId(courseSubjects[0]._id)
      initializedSubject.current = true
    }
  })

  useEffect(() => {
    if (lessonsCourseId) {
      props.getCurrentCourseSubjects(lessonsCourseId)
      initializedSubject.current = false
    }
  }, [lessonsCourseId])

  useEffect(() => {
    if (selectedSubjectId) {
      props.getSubjectAndRelatedLessons(lessonsCourseId, selectedSubjectId)
    }
  }, [selectedSubjectId])

  useEffect(() => {
    if (childId) {
      let child = getFromArr(children, childId)
      setPerformanceCourseId(
        child.enrolledCourses[child.enrolledCourses.length - 1].courseId._id
      )
    }
  }, [childId])

  const validateForm = e => {
    let message = ''
    if (!childId) message = 'Please select a child'
    else if (!performanceCourseId) message = 'Please select a course'

    if (message) {
      e.preventDefault()
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
    }
  }

  return (
    <div id='parent-dashboard' className='negative-top'>
      <div className='top-display'></div>
      <div className='px-3 px-sm-4 px-md-5'>
        <div className='d-flex justify-content-center mx-auto'>
          <div
            className='d-flex flex-column flex-md-row align-items-center'
            style={{
              maxWidth: 650,
              width: '100%',
              marginTop: '-80px',
              position: 'relative'
            }}
          >
            <img
              src={require('../../../assets/img/dummyman.png')}
              alt='Profile pic'
              style={{
                width: '150px',
                objectFit: 'cover',
                height: '150px'
              }}
            />
            <div className='stat-display'>
              <div>
                <div style={{ minHeight: '2em' }}>Number of Children</div>
                <div style={{ fontSize: '1.4em', color: 'rgba(0,0,0,.49)' }}>
                  {padWithZero(children.length)}
                </div>
              </div>
              <div>
                <div style={{ minHeight: '2em' }}>
                  Number of Classes Registered
                </div>
                <div style={{ fontSize: '1.4em', color: 'rgba(0,0,0,.49)' }}>
                  {padWithZero(courses.length)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-center mt-5'>
          <div className='w-100' style={{ maxWidth: 800 }}>
            <div
              style={{
                width: '100%'
              }}
              className='d-flex justify-content-center gradient-bg rad-10 px-3 px-md-4 py-5'
            >
              <div style={{ maxWidth: 450, width: '100%' }}>
                <h4 className='font2 white mb-3'>My Child(ren)</h4>
                <div style={{ color: 'rgba(255,255,255,.6)' }}>
                  Select child(ren)'s name to view their performance
                </div>
                <div className='w-100 mb-1'>
                  <select
                    className='general pl-3'
                    value={childId}
                    onInput={e => {
                      setChildId(e.target.value)
                    }}
                  >
                    <option disabled value=''>
                      Select Child
                    </option>
                    {children.map(child => (
                      <option key={child._id} value={child._id}>
                        {child.fullName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='w-100 mb-1'>
                  <select
                    className='general pl-3'
                    value={performanceCourseId}
                    onInput={e => {
                      setPerformanceCourseId(e.target.value)
                    }}
                  >
                    <option disabled value=''>
                      Select class
                    </option>
                    {childId &&
                      courses
                        .filter(c =>
                          getFromArr(children, childId).enrolledCourses.find(
                            ec => ec.courseId._id === c._id
                          )
                        )
                        .map(course => (
                          <option value={course._id} key={course._id}>
                            {course.name}
                          </option>
                        ))}
                  </select>
                </div>
                <div className='w-100 mb-4'>
                  <select
                    value={performanceDuration}
                    onInput={e => {
                      setPerformanceDuration(e.target.value)
                    }}
                    className='general pl-3'
                    name='courseId'
                  >
                    {durations.map(dur => (
                      <option value={dur.value} key={dur.name}>
                        {dur.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='center'>
                  <Link to={performanceLink()} onClick={validateForm}>
                    <button
                      style={{
                        backgroundColor: 'rgba(38, 170, 118, 0.54)',
                        padding: '3px 10px',
                        border: 'none',
                        borderRadius: '2px',
                        color: 'white'
                      }}
                    >
                      Generate Performance
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 50 }}>
              <h4 className='font2 white'>Class Content(s)</h4>
              <div className='d-flex align-items-center flex-wrap'>
                <Filter style={{ width: 16 }} className='mr-2' />
                <span className='white no-wrap mr-2 mr-sm-5'>
                  Filter by class
                </span>

                <select
                  className='general mt-0 py-2 pl-3 pr-2'
                  style={{
                    maxWidth: '160px',
                    backgroundColor: 'rgba(38, 170, 118, 0.28)',
                    color: 'rgba(38, 170, 118, 1)',
                    borderRadius: 7
                  }}
                  value={lessonsCourseId}
                  onInput={e => {
                    setLessonsCourseId(e.target.value)
                  }}
                >
                  <option disabled value=''>
                    Select Class
                  </option>
                  {courses.map(course => (
                    <option value={course._id} key={course._id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>

              <hr className='white' />
              <div className='px-3'>
                {children.length > 0 && lessonsCourseId ? (
                  <div className='row'>
                    <div className='col-12 col-md-3 px-0'>
                      <div className='d-md-none w-100 mb-4'>
                        <select
                          className='general'
                          onInput={e => {
                            setSelectedSubjectId(e.target.value)
                          }}
                          value={selectedSubjectId}
                        >
                          <option disabled value=''>
                            Select Subject
                          </option>
                          {courseSubjects.map(subject => (
                            <option key={subject._id} value={subject._id}>
                              {subject.mainSubjectId.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className='d-none d-md-block'>
                        {courseSubjects.map((subject, id) => (
                          <div
                            className={`pr-1 class-name pointer ${
                              selectedSubjectId === subject._id
                                ? 'selected'
                                : ''
                            }`}
                            key={id}
                            onClick={() => {
                              setSelectedSubjectId(subject._id)
                            }}
                          >
                            {subject.mainSubjectId.name}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div
                      className='col-12 col-md-9 gradient-bg px-4 pt-4 rad-10'
                      style={{ paddingBottom: 90 }}
                    >
                      <h4 className='font2' style={{ color: '#26aa76' }}>
                        {selectedSubjectId &&
                          currentCourse.relatedSubjects &&
                          currentCourse.relatedSubjects.find(
                            sub => sub._id === selectedSubjectId
                          ).mainSubjectId.name}
                      </h4>
                      {selectedSubjectId && subject._id
                        ? terms.map((term, id) => (
                            <div
                              className={`mt-3 term ${
                                selectedTermId === term._id ? 'selected' : ''
                              }`}
                              key={id}
                            >
                              <div
                                style={{
                                  backgroundColor: '#333232',
                                  borderRadius: '3px',
                                  padding: '8px 16px'
                                }}
                                className='d-flex align-items-center justify-content-between pointer'
                                onClick={() => {
                                  let val = ''
                                  if (term._id !== selectedTermId)
                                    val = term._id
                                  setSelectedTermId(val)
                                }}
                              >
                                <span className='font2 text-capitalize'>
                                  {term.name}
                                </span>
                                <Chevron
                                  className='chevron'
                                  style={{ width: '13px' }}
                                />
                              </div>
                              <div className='mt-3 term-lessons'>
                                <div className='pl-3'>
                                  {subject.relatedLessons
                                    .filter(t => t.termId === term._id)
                                    .map((lesson, index) => (
                                      <LessonItem
                                        key={lesson._id}
                                        lesson={lesson}
                                        unlocked={index === 0}
                                        subjectName={subject.mainSubjectId.name}
                                        courseName={
                                          getCourse(lessonsCourseId).name
                                        }
                                        activeCoursePaidStatus={courseIsEnrolled(
                                          lessonsCourseId
                                        )}
                                      />
                                    ))}
                                </div>
                              </div>
                            </div>
                          ))
                        : courseSubjects && (
                            <div
                              className='center'
                              style={{ color: 'rgba(255,255,255,.7)' }}
                            >
                              Please select a subject
                            </div>
                          )}
                    </div>
                  </div>
                ) : (
                  <div
                    style={{ color: 'rgba(255,255,255,.7)', paddingTop: 80 }}
                    className='center'
                  >
                    {children.length < 1 ? (
                      <div>
                        <div>No linked student account yet</div>
                        <div>
                          Link your child to your parent account to see class
                          contents
                        </div>
                      </div>
                    ) : (
                      'Select a class to view contents'
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  children: state.parent.children,
  currentCourse: state.parent.currentCourse,
  courseSubjects: state.parent.courseSubjects,
  subject: state.subject.subject,
  error: state.error
})

export default connect(mapStateToProps, {
  clearErrors,
  getChildren,
  getCurrentCourseSubjects,
  getSubjectAndRelatedLessons
})(ParentDashboard)
