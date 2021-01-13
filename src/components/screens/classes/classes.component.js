import React, { useEffect, useRef } from "react";
import './css/style.css';
import SubjectBoxSlide from '../../includes/subjectBadgeForSlick/subjectBadgeForSlick.component';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getCourses } from './../../../redux/actions/courseActions';
import PropTypes from 'prop-types';

const Classes = props => {  
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
        <div id="classes" className="classes1 container-fluid relative"> 
            <div className="row firstSection">
                <div className="col-md-2 paddingRightOff">
                   <h3>Classes</h3>
                </div>
                <div className="col-md-6 partTwo desktopOnly">
                   <div className="row myclasses">
                      <div className="col-2 borderLeftOff"><Link to="/classes/9u09xunr90">Primary 1</Link></div>
                      <div className="col-2"><Link to="/classes/9u09xunr90">Primary 2</Link></div>
                      <div className="col-2"><Link to="/classes/9u09xunr90"> Primary 3</Link></div>
                      <div className="col-2"><Link to="/classes/9u09xunr90"> Primary 4</Link></div>
                      <div className="col-2"><Link to="/classes/9u09xunr90"> Primary 5</Link></div>
                      <div className="col-2"><Link to="/classes/9u09xunr90"> Primary 6 </Link></div>
                      <div className="col-2 borderLeftOff"><Link to="/classes/9u09xunr90"> JSS 1</Link></div>
                      <div className="col-2"><Link to="/classes/9u09xunr90"> JSS 2</Link></div>
                      <div className="col-2"><Link to="/classes/9u09xunr90"> JSS 3</Link></div>
                      <div className="col-2"><Link to="/classes/9u09xunr90"> SSS 1</Link></div>
                      <div className="col-2"><Link to="/classes/9u09xunr90"> SSS 2</Link></div>
                      <div className="col-2"><Link to="/classes/9u09xunr90"> SSS 3</Link></div>
                   </div>
                 
                </div>
                <div className="col-md-2">
                   
                </div>
            </div>     
            <div className="row secondSection">
              <div className="col-md-12 heading">
                <h6>Primary One</h6>
              </div>           
              <div className="col-md-12">
                <div className="row">
                 <SubjectBoxSlide/>
                </div>                
              </div>
            </div>
            <div className="row secondSection">
              <div className="col-md-12 heading">
                <h6>Primary Two </h6>
              </div>           
              <div className="col-md-12">
                <div className="row">
                 <SubjectBoxSlide/>
                </div>                
              </div>
            </div>
            <div className="row secondSection">
              <div className="col-md-12 heading">
                <h6>Primary Three</h6>
              </div>           
              <div className="col-md-12">
                <div className="row">
                 <SubjectBoxSlide/>
                </div>                
              </div>
            </div>
            <div className="row secondSection">
              <div className="col-md-12 heading">
                <h6>Primary Four</h6>
              </div>           
              <div className="col-md-12">
                <div className="row">
                 <SubjectBoxSlide/>
                </div>                
              </div>
            </div>
            <div className="row secondSection">
              <div className="col-md-12 heading">
                <h6>Primary Five</h6>
              </div>           
              <div className="col-md-12">
                <div className="row">
                 <SubjectBoxSlide/>
                </div>                
              </div>
            </div>
            <div className="row secondSection">
              <div className="col-md-12 heading">
                <h6>Primary Six</h6>
              </div>           
              <div className="col-md-12">
                <div className="row">
                 <SubjectBoxSlide/>
                </div>                
              </div>
            </div>
            <div className="row secondSection">
              <div className="col-md-12 heading">
                <h6>JSS One</h6>
              </div>           
              <div className="col-md-12">
                <div className="row">
                 <SubjectBoxSlide/>
                </div>                
              </div>
            </div>
            <div className="row secondSection">
              <div className="col-md-12 heading">
                <h6>JSS Two</h6>
              </div>           
              <div className="col-md-12">
                <div className="row">
                 <SubjectBoxSlide/>
                </div>                
              </div>
            </div>
            <div className="row secondSection">
              <div className="col-md-12 heading">
                <h6>JSS Three</h6>
              </div>           
              <div className="col-md-12">
                <div className="row">
                 <SubjectBoxSlide/>
                </div>                
              </div>
            </div>
            <div className="row secondSection">
              <div className="col-md-12 heading">
                <h6>SSS One</h6>
              </div>           
              <div className="col-md-12">
                <div className="row">
                 <SubjectBoxSlide/>
                </div>                
              </div>
            </div>
            <div className="row secondSection">
              <div className="col-md-12 heading">
                <h6>SSS Two</h6>
              </div>           
              <div className="col-md-12">
                <div className="row">
                 <SubjectBoxSlide/>
                </div>                
              </div>
            </div>
            <div className="row secondSection">
              <div className="col-md-12 heading">
                <h6>SSS Three</h6>
              </div>           
              <div className="col-md-12">
                <div className="row">
                 <SubjectBoxSlide/>
                </div>                
              </div>
            </div>
        </div>
	);
};

export default Classes;