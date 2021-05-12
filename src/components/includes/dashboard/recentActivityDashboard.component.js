import React  from "react";
import PastQuestions from '../../../assets/img/past-questions.png';
import Lessons from '../../../assets/img/play.png';
import ReactTimeAgo from 'react-time-ago'

const Box = props => { 
    String.prototype.toProperCase = function () {
        return this.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };
	return (		
        <div className="row push10 bottomBorder subjectList">
            <div className="col-md-2">              
                <img src={props.category === 'lesson'? Lessons : PastQuestions}alt="icon" className="recommendImg"/>
            </div>
            <div className="col-md-3">
                <p className="green">{props.category?.toProperCase()}</p>
                <p>{props.title?.toProperCase()}</p>          
            </div>
            <div className="col-md-3">
                <span className={`${props.excel ? 'excel' : 'average'}`}>
                    {props.subject?.toProperCase()}
                </span>    
            </div>
            <div className="col-md-4 center">
                <p>
                    <ReactTimeAgo date={props.time} locale='en-US' timeStyle='round' />
                </p>
            </div>
        </div>
	);
};

export default Box;