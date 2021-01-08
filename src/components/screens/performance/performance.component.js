import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { PieChart } from 'react-minimal-pie-chart';
import './css/style.css';
import Chart from "r-chart";
import { connect } from 'react-redux';
import { inputChange } from './../../../redux/actions/authActions';
import PropTypes from 'prop-types';
import SubjectBox from './../../includes/performance/subjectBox.component';
import PastQuestionBox from './../../includes/performance/pastQuestions.component';

const Performance = props => {  
   const mounted = useRef(); 
   useEffect(()=>{
      if (!mounted.current) {
         // do componentDidMount logic
         mounted.current = true;
         window.scrollTo(0, 0);            
      } else {
         // do componentDidUpdate logic          
         } 	       
   }) 
   const handleNavigation = (section, e) => {
      e.preventDefault();
      props.inputChange('chartSection', section);
   };  
   
   const {chartSection} = props;
   
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
                           <h3>Alaka Feyikemi</h3>
                           <p>feyikemi199@gmail.com</p>
                           <span className="myBadge">JSS1</span>
                           <span className="location"><img src={require('../../../assets/img/location.png')} alt="location"/>&nbsp;&nbsp; Lagos State, Nigeria </span>
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
                           {/* <p className="barChart">&nbsp;&nbsp;&nbsp;90%</p><span>am here</span>
                           <p className="barChart">&nbsp;&nbsp;&nbsp;90%</p> */}
                           <Chart
                              data={[
                                 {
                                 type:'bar',
                                 title:'Subject Progress',
                                 color:'#26AA76',
                                 points:[
                                    {key:'Mathematics',value:10},
                                    {key:'Agricultural Sci',value:15},
                                    {key:'Computer Sci',value:25},
                                    {key:'C.R.K',value:30},
                                    {key:'Civil Education',value:40},
                                    {key:'Health Edu.',value:35},
                                    {key:'Business Stud.',value:40},
                                    {key:'P.H.E',value:60},
                                    {key:'Social Studies',value:60},
                                    {key:'Basic Tech',value:75},
                                    {key:'Home Econs',value:80},
                                    {key:'Basic Science',value:100}
                                 ],

                                 }     
                              ]}
                              keys={[
                                 'Mathematics','Agricultural Sci','Computer Sci','C.R.K','Civil Education','Health Edu.','Business Stud.','P.H.E','Social Studies','Basic Tech','Home Econs','Basic Science'
                              ]}
                           />
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
                                 { title: 'One', value: 20, color: '#50E55A'},
                                 { title: 'Two', value: 15, color: '#FDAD51' },
                                 { title: 'Three', value: 5, color: '#FF5B5B' }                              
                              ]}
                              lineWidth={40}
                           />
                        </div>
                        <div className="col-md-5">
                           <div className="row push2">
                              <div className="col-md-12 push1">
                                 <span className="legend commitment"></span>&nbsp;&nbsp; Commitment: 30%
                              </div>
                              <div className="col-md-12 push1">
                                 <span className="legend speed"></span>&nbsp;&nbsp; Speed: 20%
                              </div>
                              <div className="col-md-12 push1">
                                 <span className="legend comprehension"></span>&nbsp;&nbsp; Comprehension: 50%
                              </div>
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
                     <SubjectBox subject='Mathematics' performance={75} correctAnswers={'45/80'} textAttempted={'19/50'} time={67}/>
                     <SubjectBox subject='Business Studies' performance={40} correctAnswers={'20/70'} textAttempted={'29/50'} time={67}/>
                     <SubjectBox subject='French' performance={50} correctAnswers={'26/60'} textAttempted={'9/50'} time={67}/>
                     <SubjectBox subject='Basic Tech' performance={25} correctAnswers={'15/80'} textAttempted={'29/50'} time={67}/>
                     <SubjectBox subject='Computer Sci' performance={80} correctAnswers={'66/90'} textAttempted={'19/50'} time={67}/>
                     <SubjectBox subject='Social Studies' performance={55} correctAnswers={'60/80'} textAttempted={'19/50'} time={67}/>                   
                     </> : chartSection === 'pastQuestions'? 
                            <>
                              <PastQuestionBox subject='Mathematics' performance={75} subjectAttempted={'45/80'} time={67}/>
                              <PastQuestionBox subject='Business Studies' performance={40} subjectAttempted={'20/70'} time={67}/>
                              <PastQuestionBox subject='French' performance={50} subjectAttempted={'26/60'} time={67}/>
                              <PastQuestionBox subject='Basic Tech' performance={25} subjectAttempted={'15/80'} time={67}/>
                              <PastQuestionBox subject='Computer Sci' performance={80} subjectAttempted={'66/90'} time={67}/>
                              <PastQuestionBox subject='Social Studies' performance={55} subjectAttempted={'60/80'} time={67}/>                   
                            </>: null}
                 </span>                
               </div>
            </div>
         </div>
      </span>
	);
};

Performance.propTypes = {
   inputChange: PropTypes.func.isRequired 
};
const mapStateToProps = (state) => ({
   chartSection: state.auth.chartSection
});
export default connect(mapStateToProps, {inputChange})(Performance);