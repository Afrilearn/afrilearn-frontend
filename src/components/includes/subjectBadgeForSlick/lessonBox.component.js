import React  from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  
    faPlay   
  } from "@fortawesome/free-solid-svg-icons"; 


const Box = props => { 
	return (		
        <div className="row bottomBorder">
            <div className="col-md-3 padOff">
                <img src={require('../../../assets/img/firstterm.png')} alt="lesson" className="fullWidth thumbnail"/>
            </div>
            <div className="col-md-9">
                <div className="row">
                    <div className="col-md-12 title3">
                        Geometrical Construction Lines
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 paddingRightOff">
                        <Link to="/content/56464"><span className="borderAll lessonBox"><FontAwesomeIcon icon={faPlay} /> &nbsp;Lesson 1</span></Link>
                    </div>   
                    <div className="col-md-3 paddingRightOff">
                        <Link to="/content/56464"><span className="borderAll lessonBox"><FontAwesomeIcon icon={faPlay} /> &nbsp;Lesson 2</span></Link>
                    </div>   
                    <div className="col-md-3 paddingRightOff">
                        <Link to="/content/56464"><span className="borderAll lessonBox"><FontAwesomeIcon icon={faPlay} /> &nbsp;Lesson 3</span></Link>
                    </div>   
                    <div className="col-md-3 paddingRightOff">
                        <Link to="/instructions"><span className="borderAll lessonBox">&nbsp;&nbsp;Quiz&nbsp;&nbsp;</span></Link>
                    </div>                                   
                </div>
            </div>
        </div>
   
	);
};


export default Box;