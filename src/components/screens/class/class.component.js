import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faBookReader,
  faMicrophone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import './css/style.css';
import Box from './../../includes/subjectBadgeForSlick/subjectBox.component'

const ClassDisplay = props => {  
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
   
	return (        
		<span id="classes">   
        <div id="classFirstSection" className="container-fluid relative">                         
            <div className="row">
               <div className="col-md-12">
                  <h1>JSS - ONE</h1>
               </div>
            </div>
            <div className="row push2">
               <div className="col-md-3">
                  <span className="box3"><FontAwesomeIcon icon={faPlay} color="black"/></span>&nbsp;&nbsp; 116 Video Lessons
               </div>
               <div className="col-md-3">
                  <span className="box3"><FontAwesomeIcon icon={faMicrophone} color="black"/></span>&nbsp;&nbsp; 93 Audio Lessons
               </div>
            </div>
            <div className="row push2">
               <div className="col-md-3">
                  <span className="box3 box4"><FontAwesomeIcon icon={faBookReader} color="white"/></span>&nbsp;&nbsp; 14 Subjects
               </div>
               <div className="col-md-3">
                  <span className="box3 box4"><FontAwesomeIcon icon={faUser} color="white"/></span>&nbsp;&nbsp; 13,000 Registered Students
               </div>
            </div>
            <div className="row push2 push3">
               <div className="col-md-3 font2">
                 <h5>JSS One Subjects</h5>
               </div>              
            </div>
        </div>
        <div id="classSecondSection" className="container-fluid relative">
          <div className="row">                      
            <Box image={require('../../../assets/img/maths.png')} singleClass={true}/>
            <Box image={require('../../../assets/img/english.png')} singleClass={true}/>
            <Box image={require('../../../assets/img/health.png')} singleClass={true}/>
            <Box image={require('../../../assets/img/science.png')} singleClass={true}/>
            <Box image={require('../../../assets/img/Civic.png')} singleClass={true}/>    
            <Box image={require('../../../assets/img/science.png')} singleClass={true}/>      
            <Box image={require('../../../assets/img/health_two.png')} singleClass={true}/>
            <Box image={require('../../../assets/img/english_two.png')} singleClass={true}/>  
            <Box image={require('../../../assets/img/health.png')} singleClass={true}/>
            <Box image={require('../../../assets/img/Civic.png')} singleClass={true}/>    
            <Box image={require('../../../assets/img/social.png')} singleClass={true}/>
            <Box image={require('../../../assets/img/social.png')} singleClass={true}/>
            <Box image={require('../../../assets/img/health_two.png')} singleClass={true}/>       
          </div>
        </div>
    </span>
	);
};

export default ClassDisplay;