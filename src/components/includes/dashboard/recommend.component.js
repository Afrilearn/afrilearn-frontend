import React  from "react";
import { Link } from "react-router-dom";
import PastQuestions from '../../../assets/img/past-questions.png';
import Lessons from '../../../assets/img/play.png';

const Box = props => { 
	return (		
        <div className="row push10 bottomBorder">
            <div className="col-md-2">
                <span className="recommend">
                    <img src={props.pastQuestions? PastQuestions: Lessons}alt="icon" className="recommendImg"/>
                </span>
            </div>
            <div className="col-md-6">
                <p>Because you {props.pastQuestions? 'practiced': 'watched'} "{props.title}"</p>
                <p className="recommendT">Recommended:</p>
                <Link className="underline" to={props.pastQuestions? '/instructions': '/content/56464'}>"{props.recommend}"</Link>
            </div>
        </div>
	);
};

export default Box;