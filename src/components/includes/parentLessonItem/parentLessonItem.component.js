import React from 'react'
import { ReactComponent as Paper } from '../../../assets/img/Paper.svg'
import { ReactComponent as Play } from '../../../assets/img/LessonPlay.svg'
import { ReactComponent as Activity } from '../../../assets/img/Activity.svg'
import { ReactComponent as Bullet } from '../../../assets/img/ListBulletCheck.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

const LessonItem = props => {
  return (
    <div>
      <div className='d-flex align-items-center justify-content-between pr-3 mb-2'>
        <div className='d-flex align-items-center'>
          <Bullet style={{width: 12}} className='mr-3'/>
          Mathematics for Beginners
        </div>
        <div className='relative'>
          <div class='btn-group'>
            <FontAwesomeIcon
              icon={faEllipsisV}
              style={{ fontSize: '13px' }}
              className='dropdown-toggle pointer'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            />
            <div
              class='dropdown-menu dropdown-menu-right menu-container'
              style={{ backgroundColor: 'white' }}
            >
              <button class='dropdown-item' type='button'>
                <div className='icon'>
                  <Play />
                </div>{' '}
                Lesson 1
              </button>
              <button class='dropdown-item' type='button'>
                <div className='icon'>
                  <Paper />
                </div>{' '}
                Classnotes
              </button>
              <button class='dropdown-item' type='button'>
                <div className='icon'>
                  <Activity />
                </div>{' '}
                Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonItem