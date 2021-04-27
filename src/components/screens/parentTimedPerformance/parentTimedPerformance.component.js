import React, { useEffect, useRef } from 'react'
import RecentActivitesBox from '../../includes/dashboard/recentActivities.component'
import norecent from '../../../assets/img/norecent.png'
import { fetchChildRecentActivities } from '../../../redux/actions/parentActions'
import { connect } from 'react-redux'
import queryString from 'query-string'
import moment from 'moment'
import './css/style.css'

const ParentTimedPerformance = props => {
  const { recentActivities, children } = props

  const params = queryString.parse(props.location.search)
  const { childId: userId, duration, courseId } = params
  const endDate = new Date()
  const startDate = moment(endDate).subtract(duration, 'days')
  const mounted = useRef(false)
  const targetUser = children.find(c => c._id === userId)
  const activeCourseName = targetUser.enrolledCourses.find(
    ec => ec.courseId._id === courseId
  ).courseId.name

  useEffect(() => {
    if (!mounted.current) {
      props.fetchChildRecentActivities({ userId, startDate, endDate })
      mounted.current = true
    }
  })
  const recentActivitiesList = () => {
    if (recentActivities.length) {
      // eslint-disable-next-line array-callback-return
      return recentActivities.map((item, index) => {
        if (index < 3) {
          return (
            <RecentActivitesBox
              category={item.type}
              title={item.lessonId && item.lessonId.title}
              subject={
                item.lessonId && item.lessonId.subjectId.mainSubjectId.name
              }
              excel={index % 2 === 0 ? true : false}
              quizResult={item.quizResults[item.quizResults.length - 1]}
              time={item.createdAt}
              isParent
              key={item._id}
            />
          )
        }
      })
    } else {
      return (
        <div className='empty-class-state-2'>
          <img src={norecent} /> <p>No Recent Activities</p>
        </div>
      )
    }
  }

  return (
    <div id='parent-timed-performance'>
      <div className='first-section'></div>
      <div
        style={{ backgroundColor: 'black' }}
        className='d-flex justify-content-center'
      >
        <div style={{ maxWidth: 500, width: '100%' }}>
          <div className='row'>
            <div className='col-md-12'>
              <img
                className='ring'
                src={require('../../../assets/img/Ellipse.png')}
                alt='profilePix'
              />
              <img
                className='ring ring1'
                src={require('../../../assets/img/woman.png')}
                alt='profilePix'
              />
            </div>
          </div>
          <span className='box'>
            <div className='row'>
              <div className='col-md-12'>
                <h3>{targetUser.fullName.toUpperCase()}</h3>
                <p>{targetUser.email}</p>
                <span className='myBadge'>{activeCourseName}</span>
                {/* <span className='location'>
                <img
                  src={require('../../../assets/img/location.png')}
                  alt='location'
                />
                &nbsp;&nbsp;{targetUser.state}
              </span> */}
              </div>
            </div>
          </span>
        </div>
      </div>
      <div className='second-section'>{recentActivitiesList()}</div>
    </div>
  )
}

const mapStateToProps = state => ({
  recentActivities: state.parent.childRecentActivities,
  children: state.parent.children
})

export default connect(mapStateToProps, { fetchChildRecentActivities })(
  ParentTimedPerformance
)
