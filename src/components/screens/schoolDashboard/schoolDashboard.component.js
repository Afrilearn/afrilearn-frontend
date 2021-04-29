import React, { useState, useRef, useEffect } from 'react'
import { ReactComponent as Chevron } from '../../../assets/img/Chevron.svg'
import Box from './../../includes/subjectBadgeForSlick/subjectBox.component'
import PastQuestionsBox from '../../includes/pastQuestions/box.component'
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

const dashboardData = {
  enrolledCourse: {
    courseId: {
      _id: 'uniqueId',
      name: 'JSS ONE',
      relatedSubjects: [
        {
          mainSubjectId: {
            name: 'Mathematics',
            imageUrl:
              'https://afrilearn-media.s3.eu-west-3.amazonaws.com/subject-images/maths.png'
          }
        },
        {
          mainSubjectId: {
            name: 'English',
            imageUrl:
              'https://afrilearn-media.s3.eu-west-3.amazonaws.com/subject-images/english.png'
          }
        },
        {
          mainSubjectId: {
            name: 'Physics',
            imageUrl:
              'https://afrilearn-media.s3.eu-west-3.amazonaws.com/subject-images/Physics.png'
          }
        },
        {
          mainSubjectId: {
            name: 'Chemistry',
            imageUrl:
              'https://afrilearn-media.s3.eu-west-3.amazonaws.com/subject-images/chemistry.png'
          }
        },
        {
          mainSubjectId: {
            name: 'Biology',
            imageUrl:
              'https://afrilearn-media.s3.eu-west-3.amazonaws.com/subject-images/biology.png'
          }
        },
        {
          mainSubjectId: {
            name: 'Economics',
            imageUrl:
              'https://afrilearn-media.s3.eu-west-3.amazonaws.com/subject-images/economics.png'
          }
        }
      ],
      relatedPastQuestions: [
        { pastQuestionTypes: [{ name: 'WASSCE', categoryId: '1' }] },
        { pastQuestionTypes: [{ name: 'NECO', categoryId: '2' }] },
        { pastQuestionTypes: [{ name: 'JAMB', categoryId: '3' }] }
      ]
    }
  },
  relatedCourses: [
    { name: 'Primary One', teachers: 1 },
    { name: 'Primary Two', teachers: 2 },
    { name: 'Primary Three', teachers: 2 },
    { name: 'Primary Four', teachers: 3 },
    { name: 'Primary Five', teachers: 2 },
    { name: 'Primary Six', teachers: 4 }
  ]
}

const ParentDashboard = props => {
  const {
    children,
    currentCourse,
    error,
    courseSubjects,
    subject,
    user
  } = props
  const [childId, setChildId] = useState('')
  const [selectedSubjectId, setSelectedSubjectId] = useState('')
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
      //   props.getChildren()
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
    // setCourses(courses_)
  }, [children])

  useEffect(() => {
    if (!initializedCourse.current && courses.length) {
      //   setLessonsCourseId(courses[0]._id)
      initializedCourse.current = true
    }
  }, [courses])

  useEffect(() => {
    if (!initializedSubject.current && courseSubjects.length) {
      //   setSelectedSubjectId(courseSubjects[0]._id)
      initializedSubject.current = true
    }
  })

  useEffect(() => {
    if (lessonsCourseId) {
      //   props.getCurrentCourseSubjects(lessonsCourseId)
      initializedSubject.current = false
    }
  }, [lessonsCourseId])

  useEffect(() => {
    if (selectedSubjectId) {
      //   props.getSubjectAndRelatedLessons(lessonsCourseId, selectedSubjectId)
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

  const subjectList = () => {
    if (
      Object.keys(dashboardData).length &&
      dashboardData.enrolledCourse &&
      Object.keys(dashboardData.enrolledCourse).length
    ) {
      let subjects = dashboardData.enrolledCourse.courseId.relatedSubjects
      return subjects.map(item => {
        return (
          <Box
            image={item.mainSubjectId.imageUrl}
            singleClass={true}
            dashboard={true}
            compiledNotes={3000}
            registeredUsers={50000}
            subjectName={item.mainSubjectId.name}
            courseId={dashboardData.enrolledCourse.courseId._id}
            introText={item.mainSubjectId.introText || 'This is the intro text'}
            courseName={dashboardData.enrolledCourse.courseId.name}
            subjectId={item._id}
          />
        )
      })
    } else {
      return <h6>No Subject list yet</h6>
    }
  }

  const pastQuestionsList = () => {
    if (
      Object.keys(dashboardData).length &&
      dashboardData.enrolledCourse &&
      Object.keys(dashboardData.enrolledCourse.courseId.relatedPastQuestions)
        .length
    ) {
      let pastQuestions =
        dashboardData.enrolledCourse.courseId.relatedPastQuestions
      return pastQuestions.map((item, index) => {
        return (
          <PastQuestionsBox
            title={item.pastQuestionTypes[0].name}
            other={index % 2 === 0 ? true : false}
            categoryId={item.pastQuestionTypes[0].categoryId}
            categoryName={item.pastQuestionTypes[0].name}
          />
        )
      })
    } else {
      return <h6>No past questions yet</h6>
    }
  }

  return (
    <div id='school-dashboard' className='negative-top dashboard'>
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
              src={
                user.profilePhotoUrl ||
                require('../../../assets/img/dummyman.png')
              }
              alt='Profile pic'
              style={{
                width: '150px',
                objectFit: 'cover',
                height: '150px',
                borderRadius: '50%',
                position: 'relative',
                zIndex: 1
              }}
            />
            <div className='stat-display'>
              <div>
                <div style={{ minHeight: '2em' }}>Teachers</div>
                <div style={{ fontSize: '1.4em', color: 'rgba(0,0,0,.49)' }}>
                  {padWithZero(children.length)}
                </div>
              </div>
              <div>
                <div style={{ minHeight: '2em' }}>Students</div>
                <div style={{ fontSize: '1.4em', color: 'rgba(0,0,0,.49)' }}>
                  {padWithZero(courses.length)}
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: '-40px' }} className='d-flex justify-content-around w-100'>
                <Link
                  to='/add-teacher-to-class'
                  className='underlined'
                  style={{
                    fontSize: '.9em',
                    color: 'rgba(38, 170, 118, 1)'
                  }}
                >
                  +Add New Teacher
                </Link>
                <Link
                  to='/add-student'
                  className='underlined'
                  style={{
                    fontSize: '.9em',
                    color: 'rgba(38, 170, 118, 1)'
                  }}
                >
                  +Add New Student
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-center mt-5'>
          <div className='w-100' style={{ maxWidth: '100%' }}>
            <div className='container-fluid relative mt-3 mt-md-0'>
              <div className='d-flex mb-3 align-items-center'>
                <h4 className='font2 mr-4 my-0'>Subjects</h4>
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
              <div className='row'>{subjectList()}</div>

              <div className='mt-5'>
                <h4 className='font2'>Past Questions</h4>
                <div className='row jj'>{pastQuestionsList()}</div>
              </div>

              <div className='mt-5 p-3 pb-4 gradient-bg'>
                <div className='row mx-0'>
                  <div className='col-sm-6'>
                    <h4>Classes</h4>
                  </div>
                  <div
                    className='col-sm-3 d-none d-sm-block'
                    style={{ overflow: 'visible' }}
                  >
                    <h4 className='nowrap'>Number of Teachers</h4>
                  </div>
                </div>
                {dashboardData.relatedCourses.map((course, index) => (
                  <div
                    className='row py-3 mx-0'
                    style={{ borderTop: '1px solid rgba(79, 79, 79, 1)' }}
                  >
                    <div className='col-sm-6'>{course.name}</div>
                    <div className='col-sm-3 text-sm-center'>
                      <span
                        style={{ color: 'rgba(255,255,255,.7)' }}
                        className='d-sm-none'
                      >
                        No of teachers:{' '}
                      </span>
                      {padWithZero(course.teachers)}
                    </div>
                    <div className='col-sm-3'>
                      <Link
                        to='/add-teacher-to-class'
                        className='underlined'
                        style={{
                          fontSize: '.9em',
                          color: 'rgba(38, 170, 118, 1)'
                        }}
                      >
                        +Add New Teacher
                      </Link>
                    </div>
                  </div>
                ))}
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
  user: state.auth.user,
  error: state.error
})

export default connect(mapStateToProps, {
  clearErrors,
  getChildren,
  getCurrentCourseSubjects,
  getSubjectAndRelatedLessons
})(ParentDashboard)
