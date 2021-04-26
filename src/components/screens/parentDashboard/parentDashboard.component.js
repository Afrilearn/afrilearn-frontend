import React, { useState } from 'react'
import { ReactComponent as Filter } from '../../../assets/img/Filter.svg'
import { ReactComponent as Chevron } from '../../../assets/img/Chevron.svg'
import LessonItem from '../../includes/parentLessonItem/parentLessonItem.component'

import './css/style.css'

const ParentDashboard = props => {
  const subjects = [
    'Mathematics',
    'English',
    'Physics',
    'Chemistry',
    'Geography',
    'Biology',
    'Literature'
  ]
  const [selectedSubject, setSelectedSubject] = useState(subjects[0])
  const terms = ['first', 'second', 'third']
  const [selectedTerm, setSelectedTerm] = useState('')

  return (
    <div id='parent-dashboard' className='negative-top'>
      <div class='top-display'></div>
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
              src={require('../../../assets/img/inner img.png')}
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
                <div style={{ fontSize: '1.4em', color: 'rgba(0,0,0,.49)' }}>00</div>
              </div>
              <div>
                <div style={{ minHeight: '2em' }}>
                  Number of Classes Registered
                </div>
                <div style={{ fontSize: '1.4em', color: 'rgba(0,0,0,.49)' }}>00</div>
              </div>
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-center mt-5'>
          <div className='w-100' style={{ maxWidth: 800 }}>
            <div
              style={{
                width: '100%',
                padding: '35px 40px'
              }}
              className='d-flex justify-content-center gradient-bg rad-10'
            >
              <div style={{ maxWidth: 450, width: '100%' }}>
                <h4 className='font2 white mb-3'>My Child(ren)</h4>
                <div style={{ color: 'rgba(255,255,255,.6)' }}>
                  Select child(ren)'s name to view their performance
                </div>
                <div className='w-100 mb-1'>
                  <select className='general pl-3' name='courseId'>
                    <option>Select Child</option>
                    <option>Select class</option>
                    <option>Select class</option>
                  </select>
                </div>
                <div className='w-100 mb-1'>
                  <select className='general pl-3' name='courseId'>
                    <option>Select class</option>
                    <option>Select class</option>
                    <option>Select class</option>
                  </select>
                </div>
                <div className='w-100 mb-4'>
                  <select className='general pl-3' name='courseId'>
                    <option>Select duration</option>
                    <option>Select class</option>
                    <option>Select class</option>
                  </select>
                </div>
                <div className='center'>
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
                </div>
              </div>
            </div>

            <div style={{marginTop: 50}}>
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
                >
                  <option>Select Class</option>
                  <option>Primary One</option>
                  <option>Primary Two</option>
                </select>
              </div>

              <hr className='white' />
              <div className='px-3'>
                <div className='row'>
                  <div className='col-12 col-md-3 px-0'>
                    <div className='d-md-none w-100 mb-4'>
                      <select
                        className='general'
                        onInput={e => {
                          setSelectedSubject(e.target.value)
                        }}
                        value={selectedSubject}
                      >
                        <option>Select Subject</option>
                        {subjects.map((sub,index) => (
                          <option key={index}>{sub}</option>
                        ))}
                      </select>
                    </div>
                    <div className='d-none d-md-block'>
                      {subjects.map((subject, id) => (
                        <div
                          className={`class-name ${
                            selectedSubject === subject ? 'selected' : ''
                          }`}
                          key={id}
                          onClick={() => {
                            setSelectedSubject(subject)
                          }}
                        >
                          {subject}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='col-12 col-md-9 gradient-bg px-4 pt-4 rad-10' style={{paddingBottom: 90}}>
                    <h4
                      className='font2'
                      style={{ color: 'rgba(38, 170, 118, 0.54)' }}
                    >
                      {selectedSubject}
                    </h4>
                    {terms.map((term, id) => (
                      <div
                        className={`mt-3 term ${
                          selectedTerm === term ? 'selected' : ''
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
                            if (term !== selectedTerm) val = term
                            setSelectedTerm(val)
                          }}
                        >
                          <span className='font2 text-capitalize'>
                            {term} Term
                          </span>
                          <Chevron
                            className='chevron'
                            style={{ width: '13px' }}
                          />
                        </div>
                        <div className='mt-3 term-lessons'>
                          <div className='pl-3'>
                            {Array(6)
                              .fill('a')
                              .map((_, id) => (
                                <LessonItem key={id} />
                              ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParentDashboard
