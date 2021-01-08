import React  from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Box = props => { 
	return (		
        <>
        <div className="row push3">
            <div className="col-md-12">
                <span className={`subjectbadge ${props.performance>70?'excellent' : props.performance<40? 'average':'belowAverage'}`}>{props.subject}</span>
            </div>
        </div>
        <div className="row subjectPerformance bottomBorder">
            <div className="col-md-4 relative">
                <CircularProgressbar 
                    value={props.performance}
                    text={props.performance+'%'}
                    strokeWidth={10}
                    styles={{
                        path: {
                        // Path color
                        stroke: `${props.performance>70?'rgba(38, 170, 118, 0.6)' : props.performance<40? 'rgba(255, 91, 91, 0.41)':'rgba(253, 173, 81, 0.5)'}`,
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'butt'     
                        },   
                        // Customize the text
                        text: {
                        // Text color
                        fill: '#DEE6EA',
                        // Text size
                        fontSize: '16px',
                        }   
                    }}
                />
                <p className="title">{props.performance>70?'EXCELLENT' : props.performance<40? 'BELOW AVERAGE':'AVERAGE'} <br/>PERFORMANCE</p>
            </div>
            <div className="col-md-4">
                <div className="row push4">
                    <div className="col-md-12">
                        <h6>QUESTIONS CORRECT</h6>
                        <span className="myIcon"><img src={require('../../../assets/img/correct.png')} alt="correct answers"/> &nbsp; {props.correctAnswers}</span>
                    </div>
                </div>
                <div className="row push4">
                    <div className="col-md-12">
                        <h6>AVG. TIME/TEST</h6>
                        <span className="myIcon"><img src={require('../../../assets/img/time.png')} alt="average time per question"/> &nbsp;{props.time}</span>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="row push4">
                    <div className="col-md-12">
                        <h6>TEST ATTEMPTED</h6>
                        <span className="myIcon"><img src={require('../../../assets/img/info.png')} alt="attempted tests"/> &nbsp;{props.textAttempted}</span>
                    </div>
                </div>
                <div className="row push4">
                    <div className="col-md-12">
                        <h6>REMARK</h6>
                        <span className="myIcon">{props.performance>70?'Excelling' : props.performance<40? 'Below Average':'Average'}</span>
                    </div>
                </div>
            </div>
        </div>
        </>
	);
};

export default Box;