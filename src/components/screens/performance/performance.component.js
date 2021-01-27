import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { PieChart } from 'react-minimal-pie-chart';
import './css/style.css';
import Chart from "r-chart";
import { connect } from 'react-redux';
import { inputChange } from './../../../redux/actions/authActions';
import { getPerformance } from './../../../redux/actions/courseActions';
import PropTypes from 'prop-types';
import SubjectBox from './../../includes/performance/subjectBox.component';
import PastQuestionBox from './../../includes/performance/pastQuestions.component';

const Performance = props => {   

   const {
      chartSection,
      activeCourseId,
      fullName,
      email,
      activeCourseName,
      address,
      barChart,
      barChartTitles,
      performance,
      overallPerformance,
      overallProgress
   } = props;

   const mounted = useRef(); 
   useEffect(()=>{
      if (!mounted.current) {
         // do componentDidMount logic
         mounted.current = true;
         window.scrollTo(0, 0);    
         props.getPerformance(activeCourseId? activeCourseId: '5fff5bab3fd2d54b08047c82')
      } else {
         // do componentDidUpdate logic          
         } 	       
   }) 

   const handleNavigation = (section, e) => {
      e.preventDefault();
      props.inputChange('chartSection', section);
   };

   const subjectList = () => {
      if (performance.subjectsList && performance.subjectsList.length) {
        let subjects = performance.subjectsList;
        return subjects.map((item) => {
          return (
            <SubjectBox subject={item.subject} performance={item.performance} correctAnswers={`${item.totalQuestionsCorrect}/${item.totalQuestions}`} textAttempted={`${item.numberOfTests}/${item.totalTests}`} time={item.averageTimePerTest ===null?'No Rating':item.averageTimePerTest}/>     
          );
        });
      } else {
        return <h6>Performance loading...</h6>;
      }
   };

   const pastQuestionsList = () => {
      if (performance.examsList && performance.examsList.length) {
        let exam = performance.examsList;
        return exam.map((item) => {
          return (
            <PastQuestionBox subject={item.name} performance={item.performance} subjectAttempted={`${item.subjectsAttempted}/${item.totalSubjectsCount}`} time={item.averageTimePerSubject ===null?'No Rating':item.averageTimePerSubject} subjects={item.perSubjectResults}/>
          );
        });
      } else {
        return <h6>Performance loading...</h6>;
      }
   };
   
	return (        
		<span id="performance">   
         <div id="performanceFirstSection" className="container-fluid relative">                         
           
         </div>
         <div id="performanceSecondSection" className="container-fluid">
            <div className="row">
               <div className="col-md-5">
                  <div className="row">
                     <div className="col-md-12">
                        <img className="ring" src={require('../../../assets/img/Ellipse.png')} alt="profilePix"/> 
                        <img className="ring ring1" src={require('../../../assets/img/woman.png')} alt="profilePix"/> 
                     </div>                    
                  </div>
                  <span className="box">
                     <div className="row">
                        <div className="col-md-12">
                           <h3>{fullName}</h3>
                           <p>{email}</p>
                           <span className="myBadge">{activeCourseName}</span>
                           <span className="location"><img src={require('../../../assets/img/location.png')} alt="location"/>&nbsp;&nbsp; {address} </span>
                           <small className="underline invite"><Link>Invite Your Friend</Link></small>
                        </div>
                     </div>
                  </span>
                  <span className="box box1">
                     <div className="row">
                        <div className="col-md-12">
                           <h3>Progress</h3>
                           <p><span className="orange">☢</span> Progress level per  subject</p>                          
                        </div>
                     </div>
                     <div className="row">
                        <div className="col-md-12">
                         {barChart && barChart.length? 
                         <Chart
                           data={[
                              {
                              type:'bar',
                              title:'Subject Progress',
                              color:'#26AA76',
                              points:barChart

                              }     
                           ]}
                           keys={barChartTitles}
                        />
                         :'Loading Chart...'}
                           
                        </div>
                     </div>
                  </span>
               </div>
               <div className="col-md-7">
                  <div className="row">
                     <div className="col-md-12">
                        <h3>Performance Analysis</h3>
                     </div>
                  </div>
                  <span className="box box1 box2">
                     <div className="row">
                        <div className="col-md-12">
                           Overrall
                        </div>
                     </div>
                     <div className="row bottomBorder">
                        <div className="col-md-7">
                           <PieChart
                              data={[
                                 { title: 'One', value: overallProgress, color: '#50E55A'},
                                 // { title: 'Two', value: 15, color: '#FDAD51' },
                                 { title: 'Three', value: overallPerformance, color: '#FF5B5B' }                              
                              ]}
                              lineWidth={40}
                           />
                        </div>
                        <div className="col-md-5">
                           <div className="row push2">
                              <div className="col-md-12 push1">
                                 <span className="legend commitment"></span>&nbsp;&nbsp; Progress: {overallProgress.toFixed(2)}%
                              </div>
                              <div className="col-md-12 push1">
                                 <span className="legend speed"></span>&nbsp;&nbsp; Performance: {overallPerformance.toFixed(2)}%
                              </div>
                              {/* <div className="col-md-12 push1">
                                 <span className="legend comprehension"></span>&nbsp;&nbsp; Comprehension: 50%
                              </div> */}
                           </div>
                        </div>                      
                     </div>
                     <div className="row">
                        <div className="col-md-12">
                           <ul>
                              <li className={chartSection === 'subject' ? 'active' : null}><Link onClick={handleNavigation.bind(null,'subject')}>Subject</Link> {chartSection === 'subject' ? <span><br /><hr /></span>: null}</li>                              
                              <li className={chartSection === 'pastQuestions' ? 'active' : null}><Link onClick={handleNavigation.bind(null,'pastQuestions')}>Past Questions</Link>{chartSection === 'pastQuestions' ? <span><br /><hr /></span>: null}</li>  
                           </ul> 
                        </div>
                     </div>
                     { chartSection === 'subject' ? 
                     <>
                        {subjectList()}
                     </> : chartSection === 'pastQuestions'? 
                            <>
                             {pastQuestionsList()}
                            </>: null}
                 </span>                
               </div>
            </div>
         </div>
      </span>
	);
};

Performance.propTypes = {
   inputChange: PropTypes.func.isRequired,
   getPerformance : PropTypes.func.isRequired,
   
};
const mapStateToProps = (state) => ({
   chartSection: state.auth.chartSection,
   activeCourseId: state.auth.activeCourseId,
   fullName: state.auth.fullName,
   email: state.auth.email,
   activeCourseName: state.auth.activeCourseName,
   address: state.auth.address,
   barChart: state.course.barChart,
   barChartTitles: state.course.barChartTitles,
   performance: state.course.performance,
   overallPerformance:state.course.overallPerformance,
   overallProgress:state.course.overallProgress
});
export default connect(mapStateToProps, {inputChange, getPerformance})(Performance);