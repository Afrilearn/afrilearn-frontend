import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faBookReader,
  faMicrophone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import './css/style.css';
import Box from './../../includes/subjectBadgeForSlick/subjectBox.component';
import { connect } from 'react-redux';
import { getCourse } from './../../../redux/actions/courseActions';
import PropTypes from 'prop-types';

const ClassDisplay = props => {  
   const {
      course,
      lessonCount,
      subjectCount
   } = props; 
   
   const mounted = useRef(); 
   useEffect(()=>{
      if (!mounted.current) {
         // do componentDidMount logic
         mounted.current = true;
         window.scrollTo(0, 0); 
         const { match: { params } } = props; 
         props.getCourse(params.classId); 
      } else {
         // do componentDidUpdate logic          
         } 	       
   })    
   
   const numberWithCommas = x => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   }

   const subjectList = () => {
      if (course && course.relatedSubjects) {    
         let subjects =  course.relatedSubjects;    
         return subjects.map((item) => {
            return    <Box image={item.mainSubjectId.imageUrl} singleClass={true} compiledNotes={item.relatedLessons.length} registeredUsers={50000} subjectName={item.mainSubjectId.name} introText={item.mainSubjectId.introText} courseName={course.alias}/>
         });
      }
   };

	return (         
		<span id="classes">   
        <div id="classFirstSection" className="container-fluid relative">                         
            <div className="row">
               <div className="col-md-12">
                  <h1>{course.name? course.name : 'Hi'}</h1>
               </div>
            </div>
            <div className="row push2">
               <div className="col-md-3">
                  <span className="box3"><FontAwesomeIcon icon={faPlay} color="black"/></span>&nbsp;&nbsp; {numberWithCommas(lessonCount)} Video Lessons
               </div>
               <div className="col-md-3">
                  <span className="box3"><FontAwesomeIcon icon={faMicrophone} color="black"/></span>&nbsp;&nbsp; {numberWithCommas(lessonCount)} Audio Lessons
               </div>
            </div>
            <div className="row push2">
               <div className="col-md-3">
                  <span className="box3 box4"><FontAwesomeIcon icon={faBookReader} color="white"/></span>&nbsp;&nbsp; {numberWithCommas(subjectCount)} Subjects
               </div>
               <div className="col-md-3">
                  <span className="box3 box4"><FontAwesomeIcon icon={faUser} color="white"/></span>&nbsp;&nbsp; 13,000 Registered Students
               </div>
            </div>
            <div className="row push2 push3">
               <div className="col-md-3 font2">
                 <h5>{course.name} Subjects</h5>
               </div>              
            </div>
        </div>
        <div id="classSecondSection" className="container-fluid relative">
          <div className="row">                      
           {subjectList()}
          </div>
        </div>
    </span>
	);
};

ClassDisplay.propTypes = {
   getCourse: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
   course: state.course.course,
   lessonCount: state.course.lessonCount,
   subjectCount: state.course.subjectCount
});

export default connect(mapStateToProps, { getCourse })(ClassDisplay);