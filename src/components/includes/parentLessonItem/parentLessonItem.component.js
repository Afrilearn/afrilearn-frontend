import React from 'react'
import { ReactComponent as Paper } from '../../../assets/img/Paper.svg'
import { ReactComponent as Play } from '../../../assets/img/LessonPlay.svg'
import { ReactComponent as Activity } from '../../../assets/img/Activity.svg'
import { ReactComponent as Bullet } from '../../../assets/img/ListBulletCheck.svg'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import slugify from 'react-slugify'

const selected = (arr, value, field = '_id') => {
  return arr.find(a => a[field] === value)
}

const LessonItem = props => {
  const { lesson, activeCoursePaidStatus, inClass, clazz, unlocked } = props

  const linkToLesson = (lesson, item) => {
    return activeCoursePaidStatus || unlocked
      ? `/content/${slugify(props.courseName)}/${slugify(
          props.subjectName
        )}/${slugify(lesson.title)}/${item._id}?courseId=${
          lesson.courseId
        }&subjectId=${lesson.subjectId}&lessonId=${lesson._id}&videoId=${
          item._id
        }`
      : inClass && clazz.enrolledCourse && !clazz.enrolledCourse.paymentIsActive
      ? `/select-pay?courseId=${clazz.enrolledCourse &&
          clazz.enrolledCourse.courseId}`
      : '/select-pay'
  }
  const linkToClassNote = lesson => {
    return activeCoursePaidStatus || unlocked
      ? `/classnote/${slugify(props.courseName)}/${slugify(
          props.subjectName
        )}/${slugify(lesson.title)}?courseId=${lesson.courseId}&subjectId=${
          lesson.subjectId
        }&lessonId=${lesson._id}&termId=${lesson.termId}`
      : inClass && clazz.enrolledCourse && !clazz.enrolledCourse.paymentIsActive
      ? `/select-pay?courseId=${clazz.enrolledCourse &&
          clazz.enrolledCourse.courseId}`
      : '/select-pay'
  }
  const linkToQuiz = () => {
    return activeCoursePaidStatus || unlocked
      ? '/lesson/quiz/instructions'
      : inClass && clazz.enrolledCourse && !clazz.enrolledCourse.paymentIsActive
      ? `/select-pay?courseId=${clazz.enrolledCourse &&
          clazz.enrolledCourse.courseId}`
      : '/select-pay'
  }

  return (
    <div>
      <div className='d-flex align-items-center justify-content-between pr-3 mb-2'>
        <div className='d-flex align-items-center pr-3'>
          <Bullet style={{ width: 12, minWidth: 12 }} className='mr-3' />
          {props.lesson.title}
        </div>
        <div className='relative'>
          <div className='btn-group'>
            <FontAwesomeIcon
              icon={faEllipsisV}
              style={{ fontSize: '13px' }}
              className='dropdown-toggle pointer'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            />
            <div
              className='dropdown-menu dropdown-menu-right menu-container'
              style={{ backgroundColor: 'white' }}
            >
              {lesson.videoUrls.map((url, index) => (
                <Link
                  to={linkToLesson(lesson, url)}
                  style={{ display: 'block' }}
                  key={index}
                  className='dropdown-item d-flex'
                  onClick={e => {
                    inClass &&
                      !unlocked &&
                      !activeCoursePaidStatus &&
                      e.preventDefault()
                  }}
                >
                  <div className='icon'>
                    <Play />
                  </div>
                  Lesson {index + 1}
                </Link>
              ))}
              <Link
                to={linkToClassNote(lesson)}
                style={{ display: 'block' }}
                className='dropdown-item d-flex'
                onClick={e => {
                  inClass &&
                    !unlocked &&
                    !activeCoursePaidStatus &&
                    e.preventDefault()
                }}
              >
                <div className='icon'>
                  <Paper />
                </div>
                Classnotes
              </Link>
              {lesson.questions && lesson.questions.length > 0 &&
              <Link
                to={linkToQuiz(lesson)}
                style={{ display: 'block' }}
                className='dropdown-item d-flex'
                onClick={e => {
                  inClass &&
                    !unlocked &&
                    !activeCoursePaidStatus &&
                    e.preventDefault()
                }}
              >
                <div className='icon'>
                  <Activity />
                </div>
                Quiz
              </Link>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  clazz: state.class.class,
  inClass: state.auth.inClass
})

export default connect(mapStateToProps)(LessonItem)
